import Link from "next/link";
import ResponsiveShell from "@/components/layout/ResponsiveShell";
import MetricCard from "@/components/cards/MetricCard";
import OrderCard from "@/components/cards/OrderCard";
import { getDashboardSummary } from "@/lib/data/dashboard";
import { getMyProfile } from "@/lib/data/profile";

export default async function DashboardPage() {
  const profile = await getMyProfile();
  const summary = await getDashboardSummary();

  if (!profile) {
    return (
      <ResponsiveShell mobileActive="profile">
        <section className="px-6 py-10 md:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
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
      <section className="bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-6 pb-12 pt-10 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium tracking-wide text-cyan-200">
                ASA Inc.
              </p>
              <h1 className="mt-2 text-5xl font-bold">Olá, {profile.name}</h1>
              <p className="mt-3 max-w-3xl text-slate-200">
                Acompanhe seus pedidos, conversas, aulas e toda sua experiência
                dentro da plataforma.
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 px-6 py-5 backdrop-blur">
              <p className="text-sm text-slate-200">Perfil atual</p>
              <p className="text-xl font-bold">{profile.role}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <MetricCard
            label="Pedidos"
            value={String(summary.ordersCount)}
            description="Total de pedidos registrados na sua conta."
          />
          <MetricCard
            label="Chats abertos"
            value={String(summary.openChats)}
            description="Pedidos com mensagens registradas."
          />
          <MetricCard
            label="Avaliação média"
            value={summary.reviewsAverage.toFixed(1)}
            description="Resumo de reputação atual."
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                Pedidos recentes
              </h2>
              <Link href="/pedidos" className="text-sm font-medium text-sky-900">
                Ver todos
              </Link>
            </div>

            {summary.recentOrders.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-600">
                  Você ainda não tem pedidos registrados.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {summary.recentOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
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
                  href="/perfil"
                  className="block rounded-2xl border border-slate-300 px-5 py-4 font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Abrir perfil
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-100 bg-cyan-50 p-6">
              <h2 className="text-lg font-bold text-sky-900">Resumo</h2>
              <p className="mt-2 text-sm leading-relaxed text-sky-800">
                Sua dashboard agora já está usando dados reais do banco para
                mostrar o andamento da sua conta.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ResponsiveShell>
  );
}