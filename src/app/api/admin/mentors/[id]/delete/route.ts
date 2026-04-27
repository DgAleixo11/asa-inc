import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(_: Request, { params }: RouteProps) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.mentorSubject.deleteMany({
      where: { mentorId: id },
    });

    await prisma.mentorProfile.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao remover mentor" },
      { status: 500 }
    );
  }
}