import Link from "next/link";
import ResponsiveShell from "@/components/layout/ResponsiveShell";
import OrderCard from "@/components/cards/OrderCard";
import { getMyOrders } from "@/lib/data/orders";

export default async function PedidosPage() {
  const orders = await getMyOrders();

  return (
    <ResponsiveShell mobileActive="profile">
      <section className="bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-6 pb-12 pt-10 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium tracking-wide text-cyan-200">
            ASA Inc.
          </p>
          <h1 className="mt-2 text-4xl font-bold">Meus pedidos</h1>
          <p className="mt-2 max-w-2xl text-slate-200">
            Acompanhe seus atendimentos, horários e conversas com mentores.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Histórico</p>
            <h2 className="text-3xl font-bold text-slate-900">
              {orders.length} pedidos encontrados
            </h2>
          </div>

          <Link
            href="/mentores"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white"
          >
            Novo pedido
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            <p className="text-slate-600">
              Você ainda não tem pedidos cadastrados.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div key={order.id} className="space-y-3">
                <OrderCard order={order} />

                {order.status === "Concluído" ? (
                  <div className="flex justify-end">
                    <Link
                      href={`/avaliacoes/nova?orderId=${order.id}&mentorId=${order.mentorId}`}
                      className="rounded-2xl bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
                    >
                      Avaliar atendimento
                    </Link>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </section>
    </ResponsiveShell>
  );
}