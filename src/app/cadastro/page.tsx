"use client";

import { useState } from "react";

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message || data.error || "Resposta recebida");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Criar conta</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="E-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Senha" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <input className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Instituição" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} />
          <input className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Curso" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} />
          <input className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Período" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} />

          <button className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white">
            Cadastrar
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-slate-600">{message}</p> : null}
      </div>
    </main>
  );
}