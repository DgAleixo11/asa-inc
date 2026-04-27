import Link from "next/link";

const subjects = [
  "Cálculo",
  "Física",
  "Química",
  "Redação",
  "Python",
  "Estatística",
];

export default function SubjectsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 md:text-xl">
          Matérias populares
        </h3>
        <Link href="/mentores" className="text-sm font-medium text-sky-800">
          Ver tudo
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 md:flex-wrap">
        {subjects.map((subject) => (
          <Link
            key={subject}
            href="/mentores"
            className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300"
          >
            {subject}
          </Link>
        ))}
      </div>
    </section>
  );
}