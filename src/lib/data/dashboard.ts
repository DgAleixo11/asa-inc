import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getDashboardSummary() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      ordersCount: 0,
      openChats: 0,
      reviewsAverage: 0,
      recentOrders: [],
    };
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
    take: 3,
  });

  return {
    ordersCount: orders.length,
    openChats: orders.length,
    reviewsAverage: 4.9,
    recentOrders: orders.map((order) => ({
      id: order.id,
      title: order.subject.name,
      mentorName: order.mentor.name,
      subject: order.subject.name,
      date: new Date(order.scheduledAt).toLocaleString("pt-BR"),
      status:
        order.status === "PENDING"
          ? "Pendente"
          : order.status === "ACCEPTED"
          ? "Confirmado"
          : order.status === "COMPLETED"
          ? "Concluído"
          : order.status === "CANCELLED"
          ? "Cancelado"
          : "Agendado",
    })) as {
      id: string;
      title: string;
      mentorName: string;
      subject: string;
      date: string;
      status: "Confirmado" | "Pendente" | "Agendado" | "Concluído" | "Cancelado";
    }[],
  };
}