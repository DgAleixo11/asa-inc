import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { mapOrderStatus } from "@/lib/mappers/order-status";

export async function getMyOrders() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return [];
  }

  const orders = await prisma.order.findMany({
    where: {
      studentId: session.user.id,
    },
    include: {
      mentor: true,
      subject: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders.map((order) => ({
    id: order.id,
    mentorId: order.mentorId,
    title: order.subject.name,
    mentorName: order.mentor.name,
    subject: order.subject.name,
    date: new Date(order.scheduledAt).toLocaleString("pt-BR"),
    status: mapOrderStatus(order.status),
  }));
}