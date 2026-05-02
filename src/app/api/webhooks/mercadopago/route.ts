import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createMercadoPagoPaymentClient } from "@/lib/mercadopago";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function mapMercadoPagoStatus(status: string | undefined) {
  switch (status) {
    case "approved":
      return "APPROVED";
    case "rejected":
    case "cancelled":
      return "REJECTED";
    case "refunded":
      return "REFUNDED";
    default:
      return "PENDING";
  }
}

function extractPaymentId(body: any, req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const fromBodyData = body?.data?.id;
  const fromBodyId = body?.id;
  const fromQueryId = searchParams.get("id");

  if (fromBodyData) return String(fromBodyData);
  if (fromBodyId) return String(fromBodyId);
  if (fromQueryId) return String(fromQueryId);

  if (typeof body?.resource === "string") {
    const parts = body.resource.split("/");
    return parts[parts.length - 1];
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const eventType =
      body?.type ||
      body?.topic ||
      req.nextUrl.searchParams.get("type") ||
      req.nextUrl.searchParams.get("topic");

    if (eventType && eventType !== "payment") {
      return NextResponse.json({
        received: true,
        ignored: true,
        reason: "Evento ignorado porque não é payment.",
      });
    }

    const paymentId = extractPaymentId(body, req);

    if (!paymentId) {
      return NextResponse.json(
        {
          received: true,
          ignored: true,
          reason: "ID do pagamento não encontrado no webhook.",
        },
        { status: 200 }
      );
    }

    const mercadoPagoPayment = createMercadoPagoPaymentClient();

    const mercadoPagoPaymentData = await mercadoPagoPayment.get({
      id: paymentId as any,
    });

    const mpPayment = mercadoPagoPaymentData as any;

    const mercadoPagoPaymentId = mpPayment?.id ? String(mpPayment.id) : null;

    const externalReference = mpPayment?.external_reference
      ? String(mpPayment.external_reference)
      : null;

    const mappedStatus = mapMercadoPagoStatus(mpPayment?.status);

    if (!mercadoPagoPaymentId && !externalReference) {
      return NextResponse.json({
        received: true,
        ignored: true,
        reason: "Pagamento sem ID e sem external_reference.",
      });
    }

    const transaction = await prisma.paymentTransaction.findFirst({
      where: {
        OR: [
          mercadoPagoPaymentId
            ? {
                mercadoPagoPaymentId,
              }
            : undefined,
          externalReference
            ? {
                externalReference,
              }
            : undefined,
        ].filter(Boolean) as any,
      },
      include: {
        order: true,
      },
    });

    if (!transaction) {
      console.warn("Transação não encontrada para o webhook:", {
        mercadoPagoPaymentId,
        externalReference,
      });

      return NextResponse.json({
        received: true,
        ignored: true,
        reason: "Transação ainda não existe no banco.",
      });
    }

    await prisma.paymentTransaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        mercadoPagoPaymentId,
        status: mappedStatus as any,
        rawPayload: mpPayment,
        receivedAt: new Date(),
      },
    });

    if (mappedStatus === "APPROVED") {
      await prisma.order.update({
        where: {
          id: transaction.orderId,
        },
        data: {
          paymentStatus: "APPROVED",
          paymentMethod: "PIX",
          paidAt: new Date(),
        },
      });
    }

    if (mappedStatus === "REJECTED") {
      await prisma.order.update({
        where: {
          id: transaction.orderId,
        },
        data: {
          paymentStatus: "REJECTED",
          paymentMethod: "PIX",
        },
      });
    }

    if (mappedStatus === "REFUNDED") {
      await prisma.order.update({
        where: {
          id: transaction.orderId,
        },
        data: {
          paymentStatus: "REFUNDED",
          paymentMethod: "PIX",
        },
      });
    }

    return NextResponse.json({
      received: true,
      paymentId: mercadoPagoPaymentId,
      externalReference,
      status: mappedStatus,
    });
  } catch (error) {
    console.error("Erro no webhook do Mercado Pago:", error);

    return NextResponse.json(
      {
        received: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro interno ao processar webhook.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Webhook Mercado Pago ativo.",
  });
}