"use client";

import { useEffect, useState } from "react";
import ResponsiveShell from "@/components/layout/ResponsiveShell";

type AdminMentor = {
  id: string;
  name: string;
  email: string;
  institution: string | null;
  course: string | null;
  approved: boolean;
  pricePerHour: number;
  averageRating: number;
  totalReviews: number;
  subjects: string[];
};

type AdminOrder = {
  id: string;
  studentName: string;
  mentorName: string;
  subject: string;
  status: string;
  scheduledAt: string;
};

export default function AdminPage() {
  const [mentors, setMentors] = useState<AdminMentor[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  async function loadData() {
    setLoading(true);
    setUnauthorized(false);

    try {
      const [mentorsRes, ordersRes] = await Promise.all([
        fetch("/api/admin/mentors"),
        fetch("/api/admin/orders"),
      ]);

      if (mentorsRes.status === 401 || ordersRes.status === 401) {
        setUnauthorized(true);
        return;
      }

      if (mentorsRes.ok) {
        const mentorsData = await mentorsRes.json();
        setMentors(mentorsData);
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData);
      }
    } finally {
      setLoading(false);
    }
  }

  async function approveMentor(mentorId: string) {
    const res = await fetch(`/api/admin/mentors/${mentorId}/approve`, {
      method: "PATCH",
    });

    if (res.ok) {
      await loadData();
    }
  }

  async function updateOrderStatus(orderId: string, status: string) {
    const res = await fetch(`/api/admin/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      await loadData();
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (unauthorized) {
    return (
      <ResponsiveShell mobileActive="profile">
        <section className="px-5 py-8 md:px-8 md:py-10">
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">
              Acesso negado
            </h1>
            <p className="mt-2 text-slate-600">
              Seu usuário não tem permissão para acessar o painel admin.
            </p>
          </div>
        </section>
      </ResponsiveShell>
    );
  }

  return (
    <ResponsiveShell mobileActive="profile">
      <section className="bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-5 pb-10 pt-8 text-white md:px-8 md:pb-12 md:pt-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium tracking-wide text-cyan-200">
            ASA Inc.
          </p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">
            Painel administrativo
          </h1>
          <p className="mt-3 max-w-2xl text-slate-200">
            Acompanhe mentores, pedidos e aprovações da plataforma.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Mentores</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {mentors.length}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Pendentes</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {mentors.filter((mentor) => !mentor.approved).length}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Pedidos</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {orders.length}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Mentores</h2>

            {loading ? (
              <p className="mt-4 text-sm text-slate-500">Carregando...</p>
            ) : (
              <div className="mt-5 space-y-4">
                {mentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {mentor.name}
                        </p>
                        <p className="text-sm text-slate-500">{mentor.email}</p>
                        <p className="mt-2 text-sm text-slate-600">
                          {mentor.course || "Curso não informado"}
                        </p>
                        <p className="text-sm text-slate-600">
                          {mentor.institution || "Instituição não informada"}
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                          {mentor.subjects.join(", ")}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">
                          R$ {mentor.pricePerHour.toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-500">
                          Nota {mentor.averageRating.toFixed(1)}
                        </p>

                        {mentor.approved ? (
                          <span className="mt-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            Aprovado
                          </span>
                        ) : (
                          <button
                            onClick={() => approveMentor(mentor.id)}
                            className="mt-3 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                          >
                            Aprovar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Pedidos</h2>

            {loading ? (
              <p className="mt-4 text-sm text-slate-500">Carregando...</p>
            ) : (
              <div className="mt-5 space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <p className="font-semibold text-slate-900">
                      {order.subject}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Aluno: {order.studentName}
                    </p>
                    <p className="text-sm text-slate-600">
                      Mentor: {order.mentorName}
                    </p>
                    <p className="text-sm text-slate-600">
                      Data: {new Date(order.scheduledAt).toLocaleString("pt-BR")}
                    </p>
                    <span className="mt-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {order.status}
                    </span>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => updateOrderStatus(order.id, "ACCEPTED")}
                        className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-900"
                      >
                        Confirmar
                      </button>

                      <button
                        onClick={() => updateOrderStatus(order.id, "COMPLETED")}
                        className="rounded-xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Concluir
                      </button>

                      <button
                        onClick={() => updateOrderStatus(order.id, "CANCELLED")}
                        className="rounded-xl bg-rose-500 px-3 py-2 text-xs font-semibold text-white"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </ResponsiveShell>
  );
}