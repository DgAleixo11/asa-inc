import { NextResponse } from "next/server";
import { getMessagesByOrderId } from "@/lib/data/messages";

interface RouteProps {
  params: Promise<{
    orderId: string;
  }>;
}

export async function GET(_: Request, { params }: RouteProps) {
  try {
    const { orderId } = await params;
    const messages = await getMessagesByOrderId(orderId);
    return NextResponse.json(messages);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar mensagens" },
      { status: 500 }
    );
  }
}