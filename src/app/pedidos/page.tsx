import ResponsiveShell from "@/components/layout/ResponsiveShell";
import OrderCard from "@/components/cards/OrderCard";
import { mockOrders } from "@/lib/mock-orders";

export default function PedidosPage() {
  return (
    <ResponsiveShell mobileActive="profile">
      <section className="bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-6 pb-10 pt-10 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium tracking-wide text-cyan-200">
            ASA Inc.
          </p>
          <h1 className="mt-2 text-4xl font-bold">Meus pedidos</h1>
          <p className="mt-2 max-w-2xl text-slate-200">
            Acompanhe seus atendimentos, horários e conversas com mentores.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Histórico</p>
            <h2 className="text-2xl font-bold text-slate-900">
              {mockOrders.length} pedidos encontrados
            </h2>
          </div>

          <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white">
            Ordenar
          </button>
        </div>

        <div className="space-y-4">
          {mockOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </section>
    </ResponsiveShell>
  );
}