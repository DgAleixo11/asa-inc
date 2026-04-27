import ResponsiveShell from "@/components/layout/ResponsiveShell";
import MentorCard from "@/components/cards/MentorCard";
import { getMentors } from "@/lib/data/mentors";

const filters = ["Todos", "Cálculo", "Redação", "Python", "Física", "Química"];

export default async function MentoresPage() {
  const mentors = await getMentors();

  return (
    <ResponsiveShell mobileActive="search">
      <section className="border-b border-slate-200 bg-white px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium text-slate-500">ASA Inc.</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
            Mentores disponíveis
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Encontre alguém que pode te ajudar com a matéria que você precisa,
            com preço acessível, reputação e disponibilidade.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 md:p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Buscar
              </p>
              <input
                type="text"
                placeholder="Buscar por tutor ou matéria"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-700"
              />
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 md:p-5">
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

          <div className="mt-5 flex gap-3 overflow-x-auto pb-2 md:flex-wrap">
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

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Resultados encontrados
            </p>
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              {mentors.length} mentores disponíveis
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:gap-6 xl:grid-cols-3">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </section>
    </ResponsiveShell>
  );
}