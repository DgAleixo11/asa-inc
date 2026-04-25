"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResponsiveShell from "@/components/layout/ResponsiveShell";
import { mockMentors } from "@/lib/mock-data";

export default function NovoPedidoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mentorId = searchParams.get("mentor") ?? "";

  const mentor = useMemo(
    () => mockMentors.find((item) => item.id === mentorId) ?? mockMentors[0],
    [mentorId]
  );

  const [form, setForm] = useState({
    subjectId: mentor.subjects[0]?.id ?? "",
    description: "",
    date: "",
    time: "",
    duration: "60",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const scheduledAt = `${form.date}T${form.time}:00`;

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mentorId: mentor.id,
          subjectId: form.subjectId,
          description: form.description,
          scheduledAt,
          durationMinutes: Number(form.duration),
          totalPrice: mentor.pricePerHour,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          typeof data.error === "string"
            ? data.error
            : "Não foi possível criar o pedido."
        );
        return;
      }

      router.push("/pedidos");
    } catch {
      setMessage("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

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
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Mentor selecionado</p>
          <p className="mt-1 text-xl font-bold text-slate-900">
            {mentor.user.name}
          </p>
          <p className="text-sm text-slate-500">
            R$ {mentor.pricePerHour.toFixed(2)} por hora
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Matéria
              </label>
              <select
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                value={form.subjectId}
                onChange={(e) =>
                  setForm({ ...form, subjectId: e.target.value })
                }
              >
                {mentor.subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.subject.name}
                  </option>
                ))}
              </select>
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

            <div className="grid gap-4 md:grid-cols-3">
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
                  Hora
                </label>
                <input
                  type="time"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
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
                  <option value="30">30 minutos</option>
                  <option value="60">1 hora</option>
                  <option value="90">1h30</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
            >
              {loading ? "Criando pedido..." : "Continuar pedido"}
            </button>
          </form>

          {message ? (
            <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {message}
            </p>
          ) : null}
        </div>
      </section>
    </ResponsiveShell>
  );
}