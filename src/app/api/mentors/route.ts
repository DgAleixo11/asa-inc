import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q")?.trim() ?? "";
    const subject = searchParams.get("subject")?.trim() ?? "";
    const maxPrice = Number(searchParams.get("maxPrice") ?? "0");

    const mentors = await prisma.mentorProfile.findMany({
      where: {
        approved: true,
        ...(maxPrice > 0
          ? {
              pricePerHour: {
                lte: maxPrice,
              },
            }
          : {}),
        ...(q
          ? {
              OR: [
                {
                  user: {
                    name: {
                      contains: q,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  bio: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  subjects: {
                    some: {
                      subject: {
                        name: {
                          contains: q,
                          mode: "insensitive",
                        },
                      },
                    },
                  },
                },
              ],
            }
          : {}),
        ...(subject && subject !== "Todos"
          ? {
              subjects: {
                some: {
                  subject: {
                    name: {
                      equals: subject,
                      mode: "insensitive",
                    },
                  },
                },
              },
            }
          : {}),
      },
      include: {
        user: true,
        subjects: {
          include: {
            subject: true,
          },
        },
      },
      orderBy: {
        averageRating: "desc",
      },
    });

    const formatted = mentors.map((mentor) => ({
      id: mentor.id,
      user: {
        name: mentor.user.name,
        course: `${mentor.user.course ?? "Curso"}${
          mentor.user.period ? ` · ${mentor.user.period}` : ""
        }`,
        institution: mentor.user.institution ?? "Instituição não informada",
      },
      bio: mentor.bio,
      pricePerHour: mentor.pricePerHour,
      averageRating: mentor.averageRating,
      totalReviews: mentor.totalReviews,
      online: true,
      nextSlot: "Hoje, 19h",
      badges: ["Tutor verificado"],
      subjects: mentor.subjects.map((item) => ({
        id: item.id,
        subject: {
          name: item.subject.name,
        },
      })),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar mentores" },
      { status: 500 }
    );
  }
}