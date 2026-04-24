import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-6 pb-10 pt-10 text-white md:rounded-b-[2.5rem]">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -left-10 bottom-8 h-40 w-40 rounded-full bg-teal-300/10 blur-2xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between md:hidden">
          <div>
            <p className="text-sm font-semibold text-cyan-200">ASA Inc.</p>
            <p className="text-xs text-slate-300">Aprender é evoluir.</p>
          </div>

          <Link
            href="/login"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur"
          >
            Entrar
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
              Plataforma acadêmica
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
              Alunos ajudando <span className="text-teal-300">alunos</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200 md:text-lg">
              Encontre alguém que domina a matéria que você precisa ou ensine o
              que você sabe e transforme isso em renda extra.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/mentores"
                className="flex items-center justify-between rounded-2xl bg-teal-400 px-5 py-4 font-semibold text-sky-950 md:inline-flex md:justify-center"
              >
                Quero aprender
              </Link>

              <Link
                href="/cadastro"
                className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-5 py-4 font-semibold text-white backdrop-blur md:inline-flex md:justify-center"
              >
                Quero ensinar
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 backdrop-blur">
            <div className="rounded-[1.5rem] bg-white/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                SOS Prova
              </p>
              <h2 className="mt-3 text-2xl font-bold">
                Travou numa matéria agora?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">
                Encontre ajuda rápida com tutores disponíveis, veja avaliações e
                marque seu atendimento com poucos cliques.
              </p>

              <Link
                href="/mentores"
                className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-sky-950"
              >
                Buscar tutores
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}