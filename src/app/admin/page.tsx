"use client";

import { useEffect, useMemo, useState } from "react";
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
  rawStatus?: string;
  scheduledAt: string;
};

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "MENTOR";
  institution: string | null;
  course: string | null;
  period: string | null;
  isActive: boolean;
};

export default function AdminPage() {
  const [mentors, setMentors] = useState<AdminMentor[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  const [userQuery, setUserQuery] = useState("");
  const [userRole, setUserRole] = useState("ALL");

  const [mentorQuery, setMentorQuery] = useState("");
  const [mentorApproval, setMentorApproval] = useState("ALL");

  const [orderQuery, setOrderQuery] = useState("");
  const [orderStatus, setOrderStatus] = useState("ALL");

  async function loadMentors() {
    const params = new URLSearchParams();
    if (mentorQuery.trim()) params.set("q", mentorQuery.trim());
    if (mentorApproval !== "ALL") params.set("approval", mentorApproval);

    const res = await fetch(`/api/admin/mentors?${params.toString()}`);

    if (res.status === 401) {
      setUnauthorized(true);
      return;
    }

    if (res.ok) {
      setMentors(await res.json());
    }
  }

  async function loadOrders() {
    const params = new URLSearchParams();
    if (orderQuery.trim()) params.set("q", orderQuery.trim());
    if (orderStatus !== "ALL") params.set("status", orderStatus);

    const res = await fetch(`/api/admin/orders?${params.toString()}`);

    if (res.status === 401) {
      setUnauthorized(true);
      return;
    }

    if (res.ok) {
      setOrders(await res.json());
    }
  }

  async function loadUsers() {
    const params = new URLSearchParams();

    if (userQuery.trim()) params.set("q", userQuery.trim());
    if (userRole !== "ALL") params.set("role", userRole);

    const res = await fetch(`/api/admin/users?${params.toString()}`);

    if (res.status === 401) {
      setUnauthorized(true);
      return;
    }

    if (res.ok) {
      setUsers(await res.json());
    }
  }

  async function loadData() {
    setLoading(true);
    setUnauthorized(false);

    try {
      await Promise.all([loadMentors(), loadOrders(), loadUsers()]);
    } finally {
      setLoading(false);
    }
  }

  async function approveMentor(mentorId: string) {
    const res = await fetch(`/api/admin/mentors/${mentorId}/approve`, {
      method: "PATCH",
    });

    if (res.ok) await loadMentors();
  }

  async function deleteMentor(mentorId: string) {
    const res = await fetch(`/api/admin/mentors/${mentorId}/delete`, {
      method: "DELETE",
    });

    if (res.ok) await loadMentors();
  }

  async function toggleUserStatus(userId: string) {
    const res = await fetch(`/api/admin/users/${userId}/toggle-status`, {
      method: "PATCH",
    });

    if (res.ok) await loadUsers();
  }

  async function updateOrderStatus(orderId: string, status: string) {
    const res = await fetch(`/api/admin/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) await loadOrders();
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadUsers();
  }, [userQuery, userRole]);

  useEffect(() => {
    loadMentors();
  }, [mentorQuery, mentorApproval]);

  useEffect(() => {
    loadOrders();
  }, [orderQuery, orderStatus]);

  const studentsCount = useMemo(
    () => users.filter((user) => user.role === "STUDENT").length,
    [users]
  );

  if (unauthorized) {
    return (
      <ResponsiveShell mobileActive="profile">
        <section className="px-5 py-8 md:px-8 md:py-10">
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">Acesso negado</h1>
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
            Acompanhe usuários, mentores, pedidos e aprovações da plataforma.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <div className="grid gap-4 md:grid-cols-5 md:gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Mentores</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{mentors.length}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Pendentes</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {mentors.filter((mentor) => !mentor.approved).length}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Pedidos</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{orders.length}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Alunos</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{studentsCount}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Usuários</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{users.length}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Mentores</h2>

            <div className="mt-5 space-y-4">
              <input
                type="text"
                placeholder="Buscar mentor"
                value={mentorQuery}
                onChange={(e) => setMentorQuery(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-sky-700"
              />

              <select
                value={mentorApproval}
                onChange={(e) => setMentorApproval(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-700"
              >
                <option value="ALL">Todos</option>
                <option value="APPROVED">Aprovados</option>
                <option value="PENDING">Pendentes</option>
              </select>
            </div>

            {loading ? (
              <p className="mt-4 text-sm text-slate-500">Carregando...</p>
            ) : (
              <div className="mt-5 space-y-4">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">{mentor.name}</p>
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

                        <div className="mt-3 flex flex-col gap-2">
                          {mentor.approved ? (
                            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                              Aprovado
                            </span>
                          ) : (
                            <button
                              onClick={() => approveMentor(mentor.id)}
                              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                            >
                              Aprovar
                            </button>
                          )}

                          <button
                            onClick={() => deleteMentor(mentor.id)}
                            className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {mentors.length === 0 ? (
                  <p className="text-sm text-slate-500">Nenhum mentor encontrado.</p>
                ) : null}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Pedidos</h2>

            <div className="mt-5 space-y-4">
              <input
                type="text"
                placeholder="Buscar pedido"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-sky-700"
              />

              <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-700"
              >
                <option value="ALL">Todos</option>
                <option value="PENDING">Pendente</option>
                <option value="ACCEPTED">Confirmado</option>
                <option value="COMPLETED">Concluído</option>
                <option value="CANCELLED">Cancelado</option>
              </select>
            </div>

            {loading ? (
              <p className="mt-4 text-sm text-slate-500">Carregando...</p>
            ) : (
              <div className="mt-5 space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-2xl border border-slate-200 p-4">
                    <p className="font-semibold text-slate-900">{order.subject}</p>
                    <p className="mt-1 text-sm text-slate-600">Aluno: {order.studentName}</p>
                    <p className="text-sm text-slate-600">Mentor: {order.mentorName}</p>
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

                {orders.length === 0 ? (
                  <p className="text-sm text-slate-500">Nenhum pedido encontrado.</p>
                ) : null}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Usuários</h2>

            <div className="mt-5 space-y-4">
              <input
                type="text"
                placeholder="Buscar por nome ou e-mail"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-sky-700"
              />

              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-700"
              >
                <option value="ALL">Todos</option>
                <option value="STUDENT">Alunos</option>
                <option value="MENTOR">Mentores</option>
              </select>
            </div>

            <div className="mt-5 space-y-4">
              {users.map((user) => (
                <div key={user.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{user.name}</p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                      <p className="mt-2 text-sm text-slate-600">
                        {user.course || "Curso não informado"}
                      </p>
                      <p className="text-sm text-slate-600">
                        {user.institution || "Instituição não informada"}
                      </p>
                      <p className="text-sm text-slate-600">
                        {user.period || "Período não informado"}
                      </p>

                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`mt-3 rounded-xl px-4 py-2 text-xs font-semibold text-white ${
                          user.isActive ? "bg-rose-500" : "bg-emerald-500"
                        }`}
                      >
                        {user.isActive ? "Desativar" : "Reativar"}
                      </button>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "MENTOR"
                            ? "bg-cyan-100 text-cyan-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {user.role === "MENTOR" ? "Mentor" : "Aluno"}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.isActive
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {user.isActive ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {users.length === 0 ? (
                <p className="text-sm text-slate-500">Nenhum usuário encontrado.</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </ResponsiveShell>
  );
}