import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createMessageSchema } from "@/lib/validations";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createMessageSchema.safeParse({
      ...body,
      senderId: session.user.id,
    });

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { orderId, senderId, content } = parsed.data;

    const message = await prisma.message.create({
      data: {
        orderId,
        senderId,
        content,
      },
      include: {
        sender: true,
        order: true,
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao enviar mensagem" }, { status: 500 });
  }
}