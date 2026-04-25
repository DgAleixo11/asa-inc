"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import ResponsiveShell from "@/components/layout/ResponsiveShell";
import MetricCard from "@/components/cards/MetricCard";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const userName = session?.user?.name || "Usuário";
  const userRole = session?.user?.role || "STUDENT";

  if (status === "loading") {
    return (
      <ResponsiveShell mobileActive="profile">
        <section className="px-6 py-10">
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-slate-600">Carregando sua dashboard...</p>
          </div>
        </section>
      </ResponsiveShell>
    );
  }

  if (!session?.user) {
    return (
      <ResponsiveShell mobileActive="profile">
        <section className="px-6 py-10">
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">
              Você precisa entrar
            </h1>
            <p className="mt-2 text-slate-600">
              Faça login para acessar sua dashboard.
            </p>

            <Link
              href="/login"
              className="mt-6 inline-flex rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white"
            >
              Ir para login
            </Link>
          </div>
        </section>
      </ResponsiveShell>
    );
  }

  return (
    <ResponsiveShell mobileActive="profile">
      <section className="bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-6 pb-10 pt-10 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium tracking-wide text-cyan-200">
                ASA Inc.
              </p>
              <h1 className="mt-2 text-4xl font-bold">Olá, {userName}</h1>
              <p className="mt-2 max-w-2xl text-slate-200">
                Acompanhe seus pedidos, conversas, aulas e toda sua experiência
                dentro da plataforma.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
              <p className="text-sm text-slate-200">Perfil atual</p>
              <p className="text-lg font-bold">{userRole}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <MetricCard
            label="Sessão"
            value="Ativa"
            description="Seu login está funcionando normalmente."
          />
          <MetricCard
            label="Pedidos"
            value="Real"
            description="Seus pedidos agora são salvos no banco."
          />
          <MetricCard
            label="Perfil"
            value={userRole}
            description="Seu tipo de perfil atual."
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Próximos passos
              </h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">
                  Criar seu primeiro pedido
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Escolha um mentor e registre um atendimento real no banco.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">
                  Testar listagem real
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Depois de criar um pedido, confira em “Meus pedidos”.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Ações rápidas
              </h2>

              <div className="mt-5 space-y-3">
                <Link
                  href="/mentores"
                  className="block rounded-2xl bg-slate-900 px-5 py-4 font-semibold text-white transition hover:bg-slate-800"
                >
                  Buscar tutores
                </Link>

                <Link
                  href="/pedidos"
                  className="block rounded-2xl border border-slate-300 px-5 py-4 font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Ver meus pedidos
                </Link>

                <Link
                  href="/chat/123"
                  className="block rounded-2xl border border-slate-300 px-5 py-4 font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Abrir chat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ResponsiveShell>
  );
}