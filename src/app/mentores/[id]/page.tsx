import Link from "next/link";
import { mockMentors } from "@/lib/mock-data";

interface MentorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MentorDetailsPage({ params }: MentorPageProps) {
  const { id } = await params;
  const mentor = mockMentors.find((item) => item.id === id);

  if (!mentor) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Mentor não encontrado
          </h1>
          <p className="mt-2 text-slate-600">
            Não foi possível localizar esse perfil.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-sky-900 via-sky-800 to-cyan-700 px-6 pb-10 pt-8 text-white">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/mentores"
            className="mb-6 inline-block text-sm font-medium text-slate-200 hover:text-white"
          >
            ← Voltar para mentores
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white/15 text-3xl font-bold text-white backdrop-blur">
                {mentor.user.name.charAt(0)}
                {mentor.online ? (
                  <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white bg-emerald-400" />
                ) : null}
              </div>

              <div>
                <h1 className="text-3xl font-bold">{mentor.user.name}</h1>
                <p className="mt-1 text-slate-200">{mentor.user.course}</p>
                <p className="text-sm text-slate-300">{mentor.user.institution}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-sm text-slate-200">Próximo horário</p>
              <p className="text-lg font-bold">{mentor.nextSlot}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Preço por hora</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              R$ {mentor.pricePerHour.toFixed(2)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Nota média</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {mentor.averageRating.toFixed(1)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Avaliações</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {mentor.totalReviews}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Sobre</h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                {mentor.bio}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Matérias</h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {mentor.subjects.map((item) => (
                  <span
                    key={item.id}
                    className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    {item.subject.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-100 bg-cyan-50 p-6">
              <h2 className="text-lg font-bold text-sky-900">
                Garantia ASA
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-sky-800">
                Se a primeira aula não te ajudar, a plataforma pode revisar o
                caso e oferecer suporte. A ideia é garantir mais confiança para
                quem está aprendendo.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Solicitar atendimento
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Escolha esse mentor para tirar dúvidas, marcar aula ou pedir
              ajuda com um conteúdo específico.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {mentor.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-sky-800"
                >
                  {badge}
                </span>
              ))}
            </div>

            <button className="mt-6 w-full rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800">
              Solicitar agora
            </button>

            <button className="mt-3 w-full rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-50">
              Enviar mensagem
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}