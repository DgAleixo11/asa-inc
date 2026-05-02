import Link from "next/link";
import SectionBadge from "@/components/ui/SectionBadge";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-5 pb-10 pt-8 text-white md:px-8 md:pb-20 md:pt-20">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -left-10 bottom-8 h-44 w-44 rounded-full bg-teal-300/10 blur-2xl" />

      <div className="relative mx-auto max-w-7xl">
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

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="max-w-3xl">
            <SectionBadge>Plataforma acadêmica e preparatória</SectionBadge>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-7xl">
              Encontre quem já passou pelo caminho que você quer{" "}
              <span className="text-teal-300">chegar</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg">
              A ASA Inc conecta estudantes, mentores e universitários para ajudar
              quem está se preparando para Medicina, Veterinária, Engenharias,
              universidades públicas, concursos militares, carreiras policiais e
              desafios da faculdade.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PrimaryButton href="/mentores">Encontrar mentor</PrimaryButton>
              <SecondaryButton href="/cadastro">
                Quero ser mentor
              </SecondaryButton>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 backdrop-blur">
            <div className="rounded-[1.75rem] bg-white/10 p-5 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                ASA Inc
              </p>

              <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                Precisa de ajuda para estudar com direção?
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                Encontre mentores para revisar matérias, montar rotina de estudos,
                corrigir redações, resolver exercícios e se preparar melhor para
                provas, vestibulares e concursos.
              </p>

              <div className="mt-5 rounded-2xl bg-white/10 p-4">
                <p className="text-sm font-medium">Você pode encontrar ajuda em:</p>

                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  <li>• Medicina, Veterinária e Engenharias</li>
                  <li>• Redação, matemática, física, química e biologia</li>
                  <li>• Preparatórios militares e policiais</li>
                  <li>• Python, Power BI e habilidades práticas</li>
                </ul>
              </div>

              <Link
                href="/mentores"
                className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-sky-950"
              >
                Buscar mentores
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}