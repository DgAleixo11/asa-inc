import { NextResponse } from "next/server";
import { mercadoPagoPayment } from "@/lib/mercadopago";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const type = body?.type;
    const dataId = body?.data?.id;

    if (type !== "payment" || !dataId) {
      return NextResponse.json({ ok: true });
    }

    const payment = await mercadoPagoPayment.get({ id: String(dataId) });

    const paymentId = payment.id ? String(payment.id) : null;
    const externalReference = payment.external_reference ?? null;

    if (!paymentId && !externalReference) {
      return NextResponse.json({ ok: true });
    }

    const transaction = await prisma.paymentTransaction.findFirst({
      where: {
        OR: [
          ...(paymentId ? [{ mercadoPagoPaymentId: paymentId }] : []),
          ...(externalReference ? [{ externalReference }] : []),
        ],
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: "Transação não encontrada" },
        { status: 404 }
      );
    }

    if (transaction.status === "APPROVED") {
      return NextResponse.json({ ok: true, message: "Já processado" });
    }

    if (payment.status === "approved") {
      await prisma.paymentTransaction.update({
        where: { id: transaction.id },
        data: {
          status: "APPROVED",
          receivedAt: new Date(),
          rawPayload: payment as unknown as object,
          mercadoPagoPaymentId: paymentId,
        },
      });

      await prisma.order.update({
        where: { id: transaction.orderId },
        data: {
          paymentStatus: "APPROVED",
          paidAt: new Date(),
        },
      });
    }

    if (payment.status === "rejected") {
      await prisma.paymentTransaction.update({
        where: { id: transaction.id },
        data: {
          status: "REJECTED",
          rawPayload: payment as unknown as object,
          mercadoPagoPaymentId: paymentId,
        },
      });

      await prisma.order.update({
        where: { id: transaction.orderId },
        data: {
          paymentStatus: "REJECTED",
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro no webhook" }, { status: 500 });
  }
}