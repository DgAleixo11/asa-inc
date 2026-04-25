import Link from "next/link";
import SectionBadge from "@/components/ui/SectionBadge";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-6 pb-12 pt-12 text-white">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -left-10 bottom-8 h-40 w-40 rounded-full bg-teal-300/10 blur-2xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between md:hidden">
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

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-2xl">
            <SectionBadge>Plataforma acadêmica</SectionBadge>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Alunos ajudando <span className="text-teal-300">alunos</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 md:text-lg">
              Encontre alguém que domina a matéria que você precisa ou ensine o
              que você sabe e transforme isso em renda extra.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href="/mentores">Quero aprender</PrimaryButton>
              <SecondaryButton href="/cadastro">
                Quero ensinar
              </SecondaryButton>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 backdrop-blur">
            <div className="rounded-[1.6rem] bg-white/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                SOS Prova
              </p>
              <h2 className="mt-3 text-2xl font-bold">
                Travou numa matéria agora?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">
                Encontre ajuda rápida com tutores disponíveis, veja avaliações
                e marque seu atendimento com poucos cliques.
              </p>

              <div className="mt-5 rounded-2xl bg-white/10 p-4">
                <p className="text-sm font-medium">Exemplos de ajuda:</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  <li>• Revisão para prova</li>
                  <li>• Resolução de exercícios</li>
                  <li>• Redação e trabalhos</li>
                  <li>• Programação e lógica</li>
                </ul>
              </div>

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