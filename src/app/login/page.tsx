"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      setMessage("Login inválido");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Entrar</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="E-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Senha" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

          <button className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white">
            Entrar
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-slate-600">{message}</p> : null}
      </div>
    </main>
  );
}