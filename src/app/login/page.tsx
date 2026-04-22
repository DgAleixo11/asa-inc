"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      setMessage("Login inválido. Confira seu e-mail e senha.");
      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
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
                Entrar
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
                Acesse sua conta
              </h1>

              <p className="mt-4 text-base leading-relaxed text-slate-200">
                Entre para acompanhar pedidos, conversar com tutores e acessar
                sua área na plataforma.
              </p>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-slate-200">
                  Com a sua conta da ASA Inc., você pode:
                </p>

                <ul className="mt-4 space-y-3 text-sm text-slate-100">
                  <li>• acompanhar suas aulas e pedidos</li>
                  <li>• conversar com tutores pelo chat</li>
                  <li>• gerenciar sua experiência como aluno ou mentor</li>
                </ul>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-3 backdrop-blur">
              <div className="rounded-[1.7rem] bg-white p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-slate-900">Entrar</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Preencha seus dados para acessar sua conta.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

                  <button
                    disabled={loading}
                    className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </button>
                </form>

                {message ? (
                  <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {message}
                  </p>
                ) : null}

                <div className="mt-6 text-center text-sm text-slate-600">
                  Ainda não tem conta?{" "}
                  <Link
                    href="/cadastro"
                    className="font-semibold text-sky-900 hover:text-sky-700"
                  >
                    Criar conta
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