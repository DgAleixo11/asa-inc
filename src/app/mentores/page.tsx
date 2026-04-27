"use client";

import { useEffect, useMemo, useState } from "react";
import ResponsiveShell from "@/components/layout/ResponsiveShell";
import MentorCard from "@/components/cards/MentorCard";
import { mockMentors, type MockMentor } from "@/lib/mock-data";

const filters = ["Todos", "Cálculo I", "Redação", "Python"];

export default function MentoresPage() {
  const [mentors, setMentors] = useState<MockMentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState("0");

  useEffect(() => {
    async function loadMentors() {
      setLoading(true);

      const params = new URLSearchParams();

      if (query.trim()) params.set("q", query.trim());
      if (subject && subject !== "Todos") params.set("subject", subject);
      if (maxPrice && maxPrice !== "0") params.set("maxPrice", maxPrice);

      try {
        const res = await fetch(`/api/mentors?${params.toString()}`);
        if (!res.ok) throw new Error("Falha ao buscar mentores");

        const data = await res.json();
        setMentors(data);
      } catch {
        setMentors(mockMentors);
      } finally {
        setLoading(false);
      }
    }

    loadMentors();
  }, [query, subject, maxPrice]);

  const title = useMemo(() => {
    if (loading) return "Carregando mentores...";
    return `${mentors.length} mentores disponíveis`;
  }, [loading, mentors.length]);

  return (
    <ResponsiveShell mobileActive="search">
      <section className="border-b border-slate-200 bg-white px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium text-slate-500">ASA Inc.</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">
            Mentores disponíveis
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Encontre alguém que pode te ajudar com a matéria que você precisa,
            com preço acessível, reputação e disponibilidade.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.4fr_0.4fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 md:p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Buscar
              </p>
              <input
                type="text"
                placeholder="Buscar por tutor, bio ou matéria"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-700"
              />
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 md:p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Matéria
              </p>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-700"
              >
                {filters.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 md:p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Preço
              </p>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-700"
              >
                <option value="0">Todos</option>
                <option value="20">Até R$ 20</option>
                <option value="30">Até R$ 30</option>
                <option value="50">Até R$ 50</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Resultados encontrados
            </p>
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              {title}
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-slate-600">Buscando mentores...</p>
          </div>
        ) : mentors.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-slate-600">
              Nenhum mentor encontrado com esses filtros.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-6 xl:grid-cols-3">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        )}
      </section>
    </ResponsiveShell>
  );
}