import Link from "next/link";
import { mockMentors } from "@/lib/mock-data";

export default function MentoresPage() {
  const mentors = mockMentors;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-slate-500">ASA Inc.</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Mentores disponíveis
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Encontre alguém que pode te ajudar com a matéria que você precisa,
            com preço acessível e linguagem de aluno para aluno.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Todos", "Cálculo", "Redação", "Python", "Física"].map((item) => (
              <button
                key={item}
                className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mentors.map((mentor) => (
            <Link
              key={mentor.id}
              href={`/mentores/${mentor.id}`}
              className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-700 to-cyan-500 text-lg font-bold text-white">
                    {mentor.user.name.charAt(0)}
                    {mentor.online ? (
                      <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
                    ) : null}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {mentor.user.name}
                    </h2>
                    <p className="text-sm text-slate-500">{mentor.user.course}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400">a partir de</p>
                  <p className="text-lg font-bold text-slate-900">
                    R$ {mentor.pricePerHour.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500">/hora</p>
                </div>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-slate-600">
                {mentor.bio}
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                {mentor.subjects.slice(0, 3).map((item) => (
                  <span
                    key={item.id}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {item.subject.name}
                  </span>
                ))}
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {mentor.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-sky-800"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Nota {mentor.averageRating.toFixed(1)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {mentor.totalReviews} avaliações
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-sky-900">
                    {mentor.nextSlot}
                  </p>
                  <p className="text-xs text-slate-500">
                    Próximo horário
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}