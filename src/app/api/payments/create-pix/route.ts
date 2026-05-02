import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  mercadoPagoPayment,
  ASA_COMMISSION_RATE,
  getAppUrl,
} from "@/lib/mercadopago";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await req.json();
    const { orderId } = body as { orderId?: string };

    if (!orderId) {
      return NextResponse.json(
        { error: "orderId é obrigatório" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        mentor: true,
        subject: true,
        student: true,
        payments: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Pedido não encontrado" },
        { status: 404 }
      );
    }

    if (order.studentId !== session.user.id) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: { userId: order.mentorId },
    });

    if (!mentorProfile) {
      return NextResponse.json(
        { error: "Perfil do mentor não encontrado" },
        { status: 404 }
      );
    }

    const existingApprovedPayment = order.payments.find(
      (payment) => payment.status === "APPROVED"
    );

    if (existingApprovedPayment) {
      return NextResponse.json(
        { error: "Esse pedido já foi pago" },
        { status: 400 }
      );
    }

    const valueTotal =
      order.valueTotal ??
      order.totalPrice ??
      Number(mentorProfile.pricePerHour);

    const asaCommission = Number(
      (Number(valueTotal) * ASA_COMMISSION_RATE).toFixed(2)
    );
    const mentorValue = Number((Number(valueTotal) - asaCommission).toFixed(2));
    const externalReference = `order_${order.id}_${Date.now()}`;

    const payment = await mercadoPagoPayment.create({
      body: {
        transaction_amount: Number(valueTotal),
        description: `Aula de ${order.subject.name} com ${order.mentor.name}`,
        payment_method_id: "pix",
        payer: {
          email: order.student.email,
          first_name: order.student.name.split(" ")[0],
        },
        external_reference: externalReference,
        notification_url: `${getAppUrl()}/api/webhooks/mercadopago`,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: {
        valueTotal: Number(valueTotal),
        asaCommission,
        mentorValue,
        paymentStatus: "PENDING",
        paymentMethod: "PIX",
        mercadoPagoRef: externalReference,
      },
    });

    const qrData = payment.point_of_interaction?.transaction_data;

    await prisma.paymentTransaction.create({
      data: {
        orderId: order.id,
        mercadoPagoPaymentId: payment.id ? String(payment.id) : null,
        externalReference,
        amount: Number(valueTotal),
        method: "PIX",
        status: "PENDING",
        qrCode: qrData?.qr_code ?? null,
        qrCodeBase64: qrData?.qr_code_base64 ?? null,
        rawPayload: payment as unknown as object,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: Number(valueTotal),
      qrCode: qrData?.qr_code ?? null,
      qrCodeBase64: qrData?.qr_code_base64 ?? null,
      paymentId: payment.id ?? null,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar pagamento Pix" },
      { status: 500 }
    );
  }
}