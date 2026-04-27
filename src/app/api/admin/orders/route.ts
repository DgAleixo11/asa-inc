import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";
import { mapOrderStatus } from "@/lib/mappers/order-status";

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      include: {
        student: true,
        mentor: true,
        subject: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      orders.map((order) => ({
        id: order.id,
        studentName: order.student.name,
        mentorName: order.mentor.name,
        subject: order.subject.name,
        status: mapOrderStatus(order.status),
        scheduledAt: order.scheduledAt,
      }))
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar pedidos" },
      { status: 500 }
    );
  }
}