"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResponsiveShell from "@/components/layout/ResponsiveShell";

export default function NovaAvaliacaoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId") ?? "";
  const mentorId = searchParams.get("mentorId") ?? "";

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          mentorId,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(typeof data.error === "string" ? data.error : "Erro ao enviar avaliação.");
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
    <ResponsiveShell mobileActive="profile">
      <section className="bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 px-6 pb-10 pt-10 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium tracking-wide text-cyan-200">
            ASA Inc.
          </p>
          <h1 className="mt-2 text-4xl font-bold">Avaliar atendimento</h1>
          <p className="mt-2 max-w-2xl text-slate-200">
            Registre sua experiência com esse mentor.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Nota
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
              >
                <option value={5}>5 - Excelente</option>
                <option value={4}>4 - Muito bom</option>
                <option value={3}>3 - Bom</option>
                <option value={2}>2 - Regular</option>
                <option value={1}>1 - Ruim</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Comentário
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Conte como foi sua experiência"
                className="min-h-[140px] w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
            >
              {loading ? "Enviando..." : "Enviar avaliação"}
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