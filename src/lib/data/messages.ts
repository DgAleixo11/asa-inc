import { prisma } from "@/lib/prisma";

export async function getMessagesByOrderId(orderId: string) {
  const messages = await prisma.message.findMany({
    where: { orderId },
    include: {
      sender: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return messages.map((message) => ({
    id: message.id,
    from: message.sender.role === "MENTOR" ? "mentor" : "student",
    text: message.content,
    time: new Date(message.createdAt).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    senderName: message.sender.name,
  }));
}