import Link from "next/link";
import ResponsiveShell from "@/components/layout/ResponsiveShell";
import MetricCard from "@/components/cards/MetricCard";
import StarRating from "@/components/ui/StarRating";
import { getMentorById } from "@/lib/data/mentors";

interface MentorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MentorDetailsPage({ params }: MentorPageProps) {
  const { id } = await params;
  const mentor = await getMentorById(id);

  if (!mentor) {
    return (
      <ResponsiveShell mobileActive="search">
        <section className="px-6 py-10 md:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">
              Mentor não encontrado
            </h1>
            <p className="mt-2 text-slate-600">
              Não foi possível localizar esse perfil.
            </p>
          </div>
        </section>
      </ResponsiveShell>
    );
  }

  return (
    <ResponsiveShell mobileActive="search">
      <section className="bg-gradient-to-br from-sky-900 via-sky-800 to-cyan-700 px-6 pb-12 pt-10 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/mentores"
            className="mb-8 inline-block text-sm font-medium text-slate-200 hover:text-white"
          >
            ← Voltar para mentores
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="flex items-center gap-5">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-white/15 text-4xl font-bold text-white backdrop-blur">
                {mentor.user.name.charAt(0)}
                {mentor.online ? (
                  <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white bg-emerald-400" />
                ) : null}
              </div>

              <div>
                <h1 className="text-4xl font-bold">{mentor.user.name}</h1>
                <p className="mt-2 text-slate-200">{mentor.user.course}</p>
                <p className="text-sm text-slate-300">{mentor.user.institution}</p>

                <div className="mt-4 flex items-center gap-3">
                  <StarRating rating={mentor.averageRating} />
                  <span className="text-sm text-slate-200">
                    {mentor.averageRating.toFixed(1)} • {mentor.totalReviews} avaliações
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
              <p className="text-sm text-slate-200">Próximo horário</p>
              <p className="mt-1 text-2xl font-bold">{mentor.nextSlot}</p>
              <p className="mt-3 text-sm text-slate-200">
                Atendimento rápido e direto com um tutor verificado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <MetricCard
            label="Preço por hora"
            value={`R$ ${mentor.pricePerHour.toFixed(2)}`}
          />
          <MetricCard
            label="Nota média"
            value={mentor.averageRating.toFixed(1)}
          />
          <MetricCard
            label="Avaliações"
            value={String(mentor.totalReviews)}
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Sobre</h2>
              <p className="mt-4 leading-relaxed text-slate-600">{mentor.bio}</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Matérias</h2>

              <div className="mt-5 flex flex-wrap gap-3">
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
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Solicitar atendimento
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Escolha esse mentor para tirar dúvidas, marcar aula ou pedir ajuda
              com um conteúdo específico.
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

            <Link
              href={`/pedidos/novo?mentor=${mentor.id}`}
              className="mt-8 block w-full rounded-2xl bg-slate-900 px-5 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
            >
              Solicitar agora
            </Link>

            <Link
              href={`/chat/123?mentor=${mentor.id}`}
              className="mt-3 block w-full rounded-2xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Enviar mensagem
            </Link>
          </div>
        </div>
      </section>
    </ResponsiveShell>
  );
}