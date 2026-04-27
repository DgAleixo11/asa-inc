import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";

export async function GET(req: Request) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() ?? "";
    const approval = searchParams.get("approval")?.trim() ?? "ALL";

    const mentors = await prisma.mentorProfile.findMany({
      where: {
        ...(approval === "APPROVED"
          ? { approved: true }
          : approval === "PENDING"
          ? { approved: false }
          : {}),
      },
      orderBy: {
        averageRating: "desc",
      },
    });

    const formatted = await Promise.all(
      mentors.map(async (mentor) => {
        const user = await prisma.user.findUnique({
          where: { id: mentor.userId },
        });

        const mentorSubjects = await prisma.mentorSubject.findMany({
          where: { mentorId: mentor.id },
          include: {
            subject: true,
          },
        });

        return {
          id: mentor.id,
          userId: mentor.userId,
          name: user?.name ?? "Sem nome",
          email: user?.email ?? "Sem e-mail",
          institution: user?.institution ?? null,
          course: user?.course ?? null,
          approved: mentor.approved,
          pricePerHour: mentor.pricePerHour,
          averageRating: mentor.averageRating,
          totalReviews: mentor.totalReviews,
          subjects: mentorSubjects.map((item) => item.subject.name),
        };
      })
    );

    const filtered = q
      ? formatted.filter((mentor) => {
          const query = q.toLowerCase();
          return (
            mentor.name.toLowerCase().includes(query) ||
            mentor.email.toLowerCase().includes(query) ||
            (mentor.course ?? "").toLowerCase().includes(query) ||
            mentor.subjects.some((subject) =>
              subject.toLowerCase().includes(query)
            )
          );
        })
      : formatted;

    return NextResponse.json(filtered);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar mentores" },
      { status: 500 }
    );
  }
}