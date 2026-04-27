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

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const updated = await prisma.user.update({
      where: { id },
      data: {
        isActive: !user.isActive,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao alterar status do usuário" },
      { status: 500 }
    );
  }
}