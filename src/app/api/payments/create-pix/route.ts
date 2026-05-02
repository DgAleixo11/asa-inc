import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getMercadoPagoPaymentClient } from "@/lib/mercadopago";

export const runtime = "nodejs";

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

function getAppUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000"
  );
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    const sessionUser = session?.user as
      | {
          id?: string;
          role?: string;
          email?: string | null;
          name?: string | null;
        }
      | undefined;

    if (!sessionUser?.id) {
      return NextResponse.json(
        { error: "Você precisa estar logado para gerar o Pix." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const orderId = body?.orderId;

    if (!orderId || typeof orderId !== "string") {
      return NextResponse.json(
        { error: "O campo orderId é obrigatório." },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        student: true,
        mentor: true,
        subject: true,
        payments: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Pedido não encontrado." },
        { status: 404 }
      );
    }

    const isStudentOwner = order.studentId === sessionUser.id;
    const isAdmin = sessionUser.role === "ADMIN";

    if (!isStudentOwner && !isAdmin) {
      return NextResponse.json(
        { error: "Você não tem permissão para gerar Pix para este pedido." },
        { status: 403 }
      );
    }

    if (order.paymentStatus === "APPROVED") {
      return NextResponse.json(
        { error: "Este pedido já está pago." },
        { status: 400 }
      );
    }

    const lastPayment = order.payments[0];

    if (
      lastPayment &&
      lastPayment.status === "PENDING" &&
      lastPayment.qrCode
    ) {
      return NextResponse.json({
        message: "Já existe uma cobrança Pix pendente para este pedido.",
        payment: {
          id: lastPayment.id,
          mercadoPagoPaymentId: lastPayment.mercadoPagoPaymentId,
          externalReference: lastPayment.externalReference,
          amount: lastPayment.amount,
          status: lastPayment.status,
          qrCode: lastPayment.qrCode,
          qrCodeBase64: lastPayment.qrCodeBase64,
        },
      });
    }

    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: {
        userId: order.mentorId,
      },
    });

    if (!mentorProfile) {
      return NextResponse.json(
        {
          error:
            "Perfil do mentor não encontrado. Não foi possível calcular o valor da aula.",
        },
        { status: 404 }
      );
    }

    const calculatedTotal = roundMoney(
      mentorProfile.pricePerHour * (order.durationMinutes / 60)
    );

    const valueTotal = roundMoney(order.totalPrice || calculatedTotal);
    const asaCommission = roundMoney(valueTotal * 0.15);
    const mentorValue = roundMoney(valueTotal - asaCommission);

    const externalReference = order.mercadoPagoRef || `ASA-ORDER-${order.id}`;
    const idempotencyKey = crypto.randomUUID();

    const notificationUrl = `${getAppUrl()}/api/webhooks/mercadopago`;

    const mercadoPagoPayment = getMercadoPagoPaymentClient();

    const paymentResponse = await mercadoPagoPayment.create({
      body: {
        transaction_amount: valueTotal,
        description: `ASA Inc. - ${order.subject.name}`,
        payment_method_id: "pix",
        external_reference: externalReference,
        notification_url: notificationUrl,
        payer: {
          email: order.student.email,
          first_name: order.student.name,
        },
        metadata: {
          orderId: order.id,
          studentId: order.studentId,
          mentorId: order.mentorId,
          asaCommission,
          mentorValue,
        },
      },
      requestOptions: {
        idempotencyKey,
      },
    });

    const mpPayment = paymentResponse as any;

    const qrCode =
      mpPayment?.point_of_interaction?.transaction_data?.qr_code || null;

    const qrCodeBase64 =
      mpPayment?.point_of_interaction?.transaction_data?.qr_code_base64 || null;

    const mercadoPagoPaymentId = mpPayment?.id ? String(mpPayment.id) : null;

    const transaction = await prisma.paymentTransaction.create({
      data: {
        orderId: order.id,
        mercadoPagoPaymentId,
        externalReference,
        amount: valueTotal,
        method: "PIX",
        status: "PENDING",
        qrCode,
        qrCodeBase64,
        rawPayload: mpPayment,
      },
    });

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        valueTotal,
        asaCommission,
        mentorValue,
        paymentMethod: "PIX",
        paymentStatus: "PENDING",
        mercadoPagoRef: externalReference,
      },
    });

    return NextResponse.json({
      message: "Cobrança Pix criada com sucesso.",
      payment: {
        id: transaction.id,
        mercadoPagoPaymentId,
        externalReference,
        amount: valueTotal,
        asaCommission,
        mentorValue,
        status: "PENDING",
        qrCode,
        qrCodeBase64,
      },
    });
  } catch (error) {
    console.error("Erro ao criar cobrança Pix:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro interno ao criar cobrança Pix.",
      },
      { status: 500 }
    );
  }
}