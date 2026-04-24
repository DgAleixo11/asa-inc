"use client";

import { useState } from "react";
import ResponsiveShell from "@/components/layout/ResponsiveShell";

export default function NovoPedidoPage() {
  const [form, setForm] = useState({
    subject: "",
    description: "",
    date: "",
    duration: "",
  });

  return (
    <ResponsiveShell mobileActive="search">
      <section className="bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-6 pb-10 pt-10 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-medium tracking-wide text-cyan-200">
            ASA Inc.
          </p>
          <h1 className="mt-2 text-4xl font-bold">Solicitar atendimento</h1>
          <p className="mt-2 max-w-2xl text-slate-200">
            Preencha os dados para pedir ajuda com a matéria que você precisa.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <form className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Matéria
              </label>
              <input
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                placeholder="Ex: Cálculo I"
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Descrição
              </label>
              <textarea
                className="min-h-[130px] w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                placeholder="Descreva sua dúvida ou necessidade"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Data
                </label>
                <input
                  type="date"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Duração
                </label>
                <select
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                  value={form.duration}
                  onChange={(e) =>
                    setForm({ ...form, duration: e.target.value })
                  }
                >
                  <option value="">Selecione</option>
                  <option value="30">30 minutos</option>
                  <option value="60">1 hora</option>
                  <option value="90">1h30</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Continuar pedido
            </button>
          </form>
        </div>
      </section>
    </ResponsiveShell>
  );
}