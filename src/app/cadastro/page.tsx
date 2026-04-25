"use client";

import { useState } from "react";
import Link from "next/link";
import ResponsiveShell from "@/components/layout/ResponsiveShell";

type RegisterError =
  | string
  | {
      formErrors?: string[];
      fieldErrors?: Record<string, string[] | undefined>;
    };

function getErrorMessage(error: RegisterError | undefined): string {
  if (!error) return "Não foi possível concluir o cadastro.";
  if (typeof error === "string") return error;
  if (error.formErrors && error.formErrors.length > 0) return error.formErrors[0];

  if (error.fieldErrors) {
    const firstField = Object.values(error.fieldErrors).find(
      (messages) => messages && messages.length > 0
    );
    if (firstField && firstField.length > 0) return firstField[0];
  }

  return "Não foi possível concluir o cadastro.";
}

export default function CadastroPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    institution: "",
    course: "",
    period: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(getErrorMessage(data.error));
        return;
      }

      setMessage("Usuário criado com sucesso!");
      setForm({
        name: "",
        email: "",
        password: "",
        institution: "",
        course: "",
        period: "",
      });
    } catch {
      setMessage("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ResponsiveShell mobileActive="profile">
      <section className="bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-6 pb-12 pt-12 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-wide text-cyan-200">
                ASA Inc.
              </p>
              <h1 className="mt-3 text-5xl font-bold leading-tight">
                Crie sua conta
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-200">
                Cadastre-se para aprender com outros alunos, pedir ajuda rápida
                e transformar seu conhecimento em oportunidade.
              </p>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                <p className="text-sm text-slate-200">
                  Ao criar sua conta, você poderá:
                </p>

                <ul className="mt-4 space-y-3 text-sm text-slate-100">
                  <li>• buscar mentores por matéria</li>
                  <li>• abrir pedidos e acompanhar atendimentos</li>
                  <li>• conversar pelo chat da plataforma</li>
                </ul>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 backdrop-blur">
              <div className="rounded-[1.7rem] bg-white p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-slate-900">
                  Criar conta
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Preencha seus dados para começar.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <input
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                    placeholder="Nome"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />

                  <input
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                    placeholder="E-mail"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />

                  <input
                    type="password"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                    placeholder="Senha"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />

                  <input
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                    placeholder="Instituição"
                    value={form.institution}
                    onChange={(e) =>
                      setForm({ ...form, institution: e.target.value })
                    }
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                      placeholder="Curso"
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                    />

                    <input
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                      placeholder="Período"
                      value={form.period}
                      onChange={(e) => setForm({ ...form, period: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
                  >
                    {loading ? "Cadastrando..." : "Criar conta"}
                  </button>
                </form>

                {message ? (
                  <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {message}
                  </p>
                ) : null}

                <div className="mt-6 text-center text-sm text-slate-600">
                  Já tem conta?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-sky-900 hover:text-sky-700"
                  >
                    Entrar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ResponsiveShell>
  );
}