"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErro("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setErro("E-mail ou senha inválidos.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020b2d] px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#0b1738] p-8 shadow-2xl">
        <h1 className="text-center text-4xl font-bold text-white">Entrar</h1>
        <p className="mt-3 text-center text-sm text-slate-200">
          Acesse sua conta da ASA Inc.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-white">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none"
              style={{
                color: "#0f172a",
                WebkitTextFillColor: "#0f172a",
                caretColor: "#0f172a",
              }}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-white">
              Senha
            </label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none"
              style={{
                color: "#0f172a",
                WebkitTextFillColor: "#0f172a",
                caretColor: "#0f172a",
              }}
            />
          </div>

          {erro ? (
            <p className="text-sm font-medium text-red-400">{erro}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-blue-500 disabled:opacity-70"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-white">
          Ainda não tem conta?{" "}
          <Link href="/cadastro" className="font-semibold text-blue-400">
            Criar conta
          </Link>
        </p>
      </div>
    </main>
  );
}