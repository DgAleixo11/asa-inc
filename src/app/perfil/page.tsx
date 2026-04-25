import ResponsiveShell from "@/components/layout/ResponsiveShell";
import MetricCard from "@/components/cards/MetricCard";
import PageIntro from "@/components/ui/PageIntro";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { getMyProfile } from "@/lib/data/profile";

export default async function PerfilPage() {
  const profile = await getMyProfile();

  if (!profile) {
    return (
      <ResponsiveShell mobileActive="profile">
        <section className="px-5 py-8 md:px-8 md:py-10">
          <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">
              Você precisa entrar
            </h1>
            <p className="mt-2 text-slate-600">
              Faça login para acessar seu perfil.
            </p>
          </div>
        </section>
      </ResponsiveShell>
    );
  }

  return (
    <ResponsiveShell mobileActive="profile">
      <section className="bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-5 pb-10 pt-8 text-white md:px-8 md:pb-12 md:pt-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-4 md:gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 text-2xl font-bold text-white backdrop-blur md:h-24 md:w-24 md:text-3xl">
                {profile.name.charAt(0)}
              </div>

              <div>
                <PageIntro
                  eyebrow="ASA Inc."
                  title={profile.name}
                  description={profile.email}
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 px-5 py-4 backdrop-blur md:px-6 md:py-5">
              <p className="text-sm text-slate-200">Perfil atual</p>
              <p className="text-lg font-bold md:text-xl">{profile.role}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          <MetricCard
            label="Conta"
            value="Ativa"
            description="Seu acesso está funcionando normalmente."
          />
          <MetricCard
            label="Curso"
            value={profile.course}
            description="Curso cadastrado na plataforma."
          />
          <MetricCard
            label="Período"
            value={profile.period}
            description="Período informado no cadastro."
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <SurfaceCard className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Informações acadêmicas
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm text-slate-500">Instituição</p>
                <p className="font-semibold text-slate-900">
                  {profile.institution}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Curso</p>
                <p className="font-semibold text-slate-900">{profile.course}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Período</p>
                <p className="font-semibold text-slate-900">{profile.period}</p>
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900">Conta</h2>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm text-slate-500">Nome</p>
                <p className="font-semibold text-slate-900">{profile.name}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">E-mail</p>
                <p className="font-semibold text-slate-900">{profile.email}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Tipo de perfil</p>
                <p className="font-semibold text-slate-900">{profile.role}</p>
              </div>
            </div>
          </SurfaceCard>
        </div>
      </section>
    </ResponsiveShell>
  );
}