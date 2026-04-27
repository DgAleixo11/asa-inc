import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const mentors = await prisma.mentorProfile.findMany();

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

    return NextResponse.json(formatted);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar mentores" },
      { status: 500 }
    );
  }
}