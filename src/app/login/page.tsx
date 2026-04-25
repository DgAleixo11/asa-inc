"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import ResponsiveShell from "@/components/layout/ResponsiveShell";

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
    <ResponsiveShell mobileActive="profile">
      <section className="bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-5 pb-10 pt-8 text-white md:px-8 md:pb-14 md:pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-wide text-cyan-200">
                ASA Inc.
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
                Entre na sua conta
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200 md:text-lg">
                Acesse sua área para acompanhar pedidos, mensagens, avaliações e
                toda sua experiência dentro da plataforma.
              </p>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur md:mt-8 md:p-6">
                <p className="text-sm text-slate-200">
                  Com sua conta, você pode:
                </p>

                <ul className="mt-4 space-y-3 text-sm text-slate-100">
                  <li>• acompanhar pedidos em tempo real</li>
                  <li>• conversar com mentores pelo chat</li>
                  <li>• organizar sua jornada acadêmica</li>
                </ul>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-3 backdrop-blur md:p-4">
              <div className="rounded-[1.7rem] bg-white p-6 shadow-2xl md:p-8">
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
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
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
    </ResponsiveShell>
  );
}