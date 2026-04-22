"use client";

import { useState } from "react";
import Link from "next/link";

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
      setMessage(data.message || data.error || "Resposta recebida");
    } catch {
      setMessage("Não foi possível concluir o cadastro agora.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-6 pb-16 pt-12 text-white">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -left-10 bottom-8 h-40 w-40 rounded-full bg-teal-300/10 blur-2xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium tracking-wide text-cyan-200">
                ASA Inc.
              </p>
              <p className="text-xs text-slate-300">Aprender é evoluir.</p>
            </div>

            <Link
              href="/"
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur"
            >
              Voltar
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                Cadastro
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
                Crie sua conta
              </h1>

              <p className="mt-4 text-base leading-relaxed text-slate-200">
                Entre para a ASA Inc. e comece a aprender com outros alunos ou
                ensine o que você domina e gere renda extra.
              </p>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-slate-200">
                  Ao criar sua conta, você poderá:
                </p>

                <ul className="mt-4 space-y-3 text-sm text-slate-100">
                  <li>• buscar mentores por matéria</li>
                  <li>• solicitar aulas e atendimentos</li>
                  <li>• conversar pelo chat da plataforma</li>
                  <li>• também atuar como tutor futuramente</li>
                </ul>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-3 backdrop-blur">
              <div className="rounded-[1.7rem] bg-white p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-slate-900">
                  Criar conta
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Preencha seus dados para começar.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Nome
                    </label>
                    <input
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                      placeholder="Seu nome"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      E-mail
                    </label>
                    <input
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                      placeholder="seuemail@email.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Senha
                    </label>
                    <input
                      type="password"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                      placeholder="Sua senha"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Instituição
                    </label>
                    <input
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                      placeholder="Nome da instituição"
                      value={form.institution}
                      onChange={(e) =>
                        setForm({ ...form, institution: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Curso
                      </label>
                      <input
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                        placeholder="Seu curso"
                        value={form.course}
                        onChange={(e) =>
                          setForm({ ...form, course: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Período
                      </label>
                      <input
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                        placeholder="Ex: 5º"
                        value={form.period}
                        onChange={(e) =>
                          setForm({ ...form, period: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <button
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
    </main>
  );
}