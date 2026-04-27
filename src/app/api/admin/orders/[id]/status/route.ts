import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";

const statusSchema = z.object({
  status: z.enum(["PENDING", "ACCEPTED", "COMPLETED", "CANCELLED"]),
});

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(req: Request, { params }: RouteProps) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const parsed = statusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Status inválido" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: {
        status: parsed.data.status,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao atualizar pedido" },
      { status: 500 }
    );
  }
}