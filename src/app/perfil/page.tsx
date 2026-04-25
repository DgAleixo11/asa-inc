import ResponsiveShell from "@/components/layout/ResponsiveShell";
import MetricCard from "@/components/cards/MetricCard";
import { getMyProfile } from "@/lib/data/profile";

export default async function PerfilPage() {
  const profile = await getMyProfile();

  if (!profile) {
    return (
      <ResponsiveShell mobileActive="profile">
        <section className="px-6 py-10">
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
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
      <section className="bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-6 pb-10 pt-10 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 text-2xl font-bold text-white backdrop-blur">
                {profile.name.charAt(0)}
              </div>

              <div>
                <p className="text-sm font-medium tracking-wide text-cyan-200">
                  ASA Inc.
                </p>
                <h1 className="mt-1 text-3xl font-bold">{profile.name}</h1>
                <p className="text-sm text-slate-200">{profile.email}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
              <p className="text-sm text-slate-200">Perfil atual</p>
              <p className="text-lg font-bold">{profile.role}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-3">
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

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Informações acadêmicas
            </h2>

            <div className="mt-5 space-y-4">
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

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Conta</h2>

            <div className="mt-5 space-y-4">
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