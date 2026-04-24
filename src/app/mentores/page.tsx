import ResponsiveShell from "@/components/layout/ResponsiveShell";
import MentorCard from "@/components/cards/MentorCard";
import { mockMentors } from "@/lib/mock-data";

const filters = ["Todos", "Cálculo", "Redação", "Python", "Física", "Química"];

export default function MentoresPage() {
  const mentors = mockMentors;

  return (
    <ResponsiveShell mobileActive="search">
      <section className="border-b border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-slate-500">ASA Inc.</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Mentores disponíveis
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Encontre alguém que pode te ajudar com a matéria que você precisa.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Buscar
              </p>
              <input
                type="text"
                placeholder="Buscar por tutor ou matéria"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-700"
              />
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Faixa de preço
              </p>
              <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-700">
                <option>Todos</option>
                <option>Até R$ 20</option>
                <option>Até R$ 30</option>
                <option>Até R$ 50</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-2 md:flex-wrap">
            {filters.map((item) => (
              <button
                key={item}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  item === "Todos"
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Resultados encontrados
            </p>
            <h2 className="text-2xl font-bold text-slate-900">
              {mentors.length} mentores disponíveis
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </section>
    </ResponsiveShell>
  );
}