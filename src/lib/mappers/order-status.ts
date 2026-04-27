import type { OrderStatusLabel } from "@/types/ui";

export function mapOrderStatus(status: string): OrderStatusLabel {
  if (status === "PENDING") return "Pendente";
  if (status === "ACCEPTED") return "Confirmado";
  if (status === "COMPLETED") return "Concluído";
  if (status === "CANCELLED") return "Cancelado";
  return "Agendado";
}