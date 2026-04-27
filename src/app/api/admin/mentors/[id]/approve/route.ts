import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(_: Request, { params }: RouteProps) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;

    const mentor = await prisma.mentorProfile.update({
      where: { id },
      data: {
        approved: true,
      },
    });

    return NextResponse.json(mentor);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao aprovar mentor" },
      { status: 500 }
    );
  }
}