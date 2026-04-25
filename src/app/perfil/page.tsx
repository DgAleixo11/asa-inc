import ResponsiveShell from "@/components/layout/ResponsiveShell";
import MetricCard from "@/components/cards/MetricCard";
import { getMyProfile } from "@/lib/data/profile";

export default async function PerfilPage() {
  const profile = await getMyProfile();

  if (!profile) {
    return (
      <ResponsiveShell mobileActive="profile">
        <section className="px-6 py-10 md:px-8">
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
      <section className="bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-6 pb-12 pt-10 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/15 text-3xl font-bold text-white backdrop-blur">
                {profile.name.charAt(0)}
              </div>

              <div>
                <p className="text-sm font-medium tracking-wide text-cyan-200">
                  ASA Inc.
                </p>
                <h1 className="mt-1 text-4xl font-bold">{profile.name}</h1>
                <p className="text-sm text-slate-200">{profile.email}</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 px-6 py-5 backdrop-blur">
              <p className="text-sm text-slate-200">Perfil atual</p>
              <p className="text-xl font-bold">{profile.role}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
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

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
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
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
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
          </div>
        </div>
      </section>
    </ResponsiveShell>
  );
}