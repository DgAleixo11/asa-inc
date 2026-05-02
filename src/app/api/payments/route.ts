import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin";

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const payments = await prisma.paymentTransaction.findMany({
      include: {
        order: {
          include: {
            student: true,
            mentor: true,
            subject: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      payments.map((payment) => ({
        id: payment.id,
        orderId: payment.orderId,
        amount: payment.amount,
        method: payment.method,
        status: payment.status,
        studentName: payment.order.student.name,
        mentorName: payment.order.mentor.name,
        subject: payment.order.subject.name,
        createdAt: payment.createdAt,
      }))
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar pagamentos" },
      { status: 500 }
    );
  }
}