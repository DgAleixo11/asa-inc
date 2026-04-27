import { NextResponse } from "next/server";
import { getMyOrders } from "@/lib/data/orders";

export async function GET() {
  try {
    const orders = await getMyOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar pedidos do usuário" },
      { status: 500 }
    );
  }
}