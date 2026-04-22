import { auth } from "@/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
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
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-6 pb-10 pt-10 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium tracking-wide text-cyan-200">
                ASA Inc.
              </p>
              <h1 className="mt-2 text-4xl font-bold">
                Olá, {session.user.name}
              </h1>
              <p className="mt-2 max-w-2xl text-slate-200">
                Acompanhe seus pedidos, conversas, aulas e toda sua experiência
                dentro da plataforma.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
              <p className="text-sm text-slate-200">Perfil atual</p>
              <p className="text-lg font-bold">{session.user.role}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Pedidos ativos</p>
            <p className="mt-2 text-4xl font-bold text-slate-900">2</p>
            <p className="mt-2 text-sm text-slate-500">
              Acompanhe o andamento dos seus atendimentos.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Conversas abertas</p>
            <p className="mt-2 text-4xl font-bold text-slate-900">3</p>
            <p className="mt-2 text-sm text-slate-500">
              Continue suas mensagens com tutores e alunos.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Avaliações</p>
            <p className="mt-2 text-4xl font-bold text-slate-900">4.9</p>
            <p className="mt-2 text-sm text-slate-500">
              Sua reputação dentro da plataforma.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Próximos atendimentos
              </h2>
              <button className="text-sm font-medium text-sky-900">
                Ver todos
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Aula de Cálculo I
                    </p>
                    <p className="text-sm text-slate-500">
                      Com Marina Costa • Hoje às 19h
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Confirmado
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Redação ENEM
                    </p>
                    <p className="text-sm text-slate-500">
                      Com Pedro Alves • Amanhã às 14h
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    Pendente
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Ações rápidas</h2>

            <div className="mt-5 space-y-3">
              <Link
                href="/mentores"
                className="block rounded-2xl bg-slate-900 px-5 py-4 font-semibold text-white transition hover:bg-slate-800"
              >
                Buscar tutores
              </Link>

              <Link
                href="/chat/123"
                className="block rounded-2xl border border-slate-300 px-5 py-4 font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Abrir chat
              </Link>

              <button className="w-full rounded-2xl border border-slate-300 px-5 py-4 text-left font-semibold text-slate-900 transition hover:bg-slate-50">
                Ver pedidos
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-cyan-50 p-4">
              <p className="text-sm font-semibold text-sky-900">
                Dica da ASA
              </p>
              <p className="mt-2 text-sm leading-relaxed text-sky-800">
                Use sua dashboard para acompanhar tudo em um só lugar e não
                perder horários, mensagens e avaliações.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}