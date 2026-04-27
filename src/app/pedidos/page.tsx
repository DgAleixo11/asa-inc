"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ResponsiveShell from "@/components/layout/ResponsiveShell";
import OrderCard from "@/components/cards/OrderCard";

type OrderItem = {
  id: string;
  mentorId: string;
  title: string;
  mentorName: string;
  subject: string;
  date: string;
  status: "Confirmado" | "Pendente" | "Agendado" | "Concluído" | "Cancelado";
};

export default function PedidosPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    setLoading(true);
    try {
      const res = await fetch("/api/my-orders");
      if (!res.ok) throw new Error("Erro ao buscar pedidos");
      const data = await res.json();
      setOrders(data);
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(orderId: string, status: string) {
    const res = await fetch(`/api/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      await loadOrders();
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <ResponsiveShell mobileActive="profile">
      <section className="bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-5 pb-10 pt-8 text-white md:px-8 md:pb-12 md:pt-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium tracking-wide text-cyan-200">
            ASA Inc.
          </p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">Meus pedidos</h1>
          <p className="mt-3 max-w-2xl text-slate-200">
            Acompanhe seus atendimentos, horários e conversas com mentores.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Histórico</p>
            <h2 className="text-3xl font-bold text-slate-900">
              {loading ? "Carregando..." : `${orders.length} pedidos encontrados`}
            </h2>
          </div>

          <Link
            href="/mentores"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white"
          >
            Novo pedido
          </Link>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <p className="text-slate-600">Buscando pedidos...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <p className="text-slate-600">
              Você ainda não tem pedidos cadastrados.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div key={order.id} className="space-y-3">
                <OrderCard order={order} />

                <div className="flex flex-wrap justify-end gap-2">
                  <button
                    onClick={() => updateOrderStatus(order.id, "ACCEPTED")}
                    className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900"
                  >
                    Confirmar
                  </button>

                  <button
                    onClick={() => updateOrderStatus(order.id, "COMPLETED")}
                    className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Concluir
                  </button>

                  <button
                    onClick={() => updateOrderStatus(order.id, "CANCELLED")}
                    className="rounded-2xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Cancelar
                  </button>
                </div>

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