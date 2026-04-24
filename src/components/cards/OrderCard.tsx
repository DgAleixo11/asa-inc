import Link from "next/link";
import type { MockOrder } from "@/lib/mock-orders";

interface OrderCardProps {
  order: MockOrder;
}

function statusClasses(status: MockOrder["status"]) {
  if (status === "Confirmado") return "bg-emerald-100 text-emerald-700";
  if (status === "Pendente") return "bg-amber-100 text-amber-700";
  if (status === "Agendado") return "bg-sky-100 text-sky-700";
  if (status === "Concluído") return "bg-violet-100 text-violet-700";
  return "bg-rose-100 text-rose-700";
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-900">{order.title}</p>
          <p className="mt-1 text-sm text-slate-500">
            {order.mentorName} • {order.subject}
          </p>
          <p className="mt-2 text-sm text-slate-600">{order.date}</p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses(
              order.status
            )}`}
          >
            {order.status}
          </span>

          <div className="flex gap-2">
            <Link
              href={`/chat/${order.id}`}
              className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Abrir chat
            </Link>

            <Link
              href="/mentores"
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Ver mentor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}