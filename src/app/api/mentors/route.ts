import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject");
    const maxPrice = searchParams.get("maxPrice");

    const mentors = await prisma.mentorProfile.findMany({
      where: {
        approved: true,
        ...(maxPrice ? { pricePerHour: { lte: Number(maxPrice) } } : {}),
        ...(subject
          ? {
              subjects: {
                some: {
                  subject: {
                    name: {
                      contains: subject,
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

    return NextResponse.json(mentors);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar mentores" }, { status: 500 });
  }
}