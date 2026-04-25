import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createOrderSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      mentorId,
      subjectId,
      description,
      scheduledAt,
      durationMinutes,
      totalPrice,
    } = parsed.data;

    const order = await prisma.order.create({
      data: {
        studentId: session.user.id,
        mentorId,
        subjectId,
        description,
        scheduledAt: new Date(scheduledAt),
        durationMinutes,
        totalPrice,
      },
      include: {
        student: true,
        mentor: true,
        subject: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar pedido" },
      { status: 500 }
    );
  }
}