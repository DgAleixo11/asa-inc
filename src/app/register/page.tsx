"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    institution: "",
    course: "",
    period: "",
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setSucesso("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data?.error || "Erro ao criar conta.");
        setLoading(false);
        return;
      }

      setSucesso("Conta criada com sucesso!");

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch {
      setErro("Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    border: "1px solid #cbd5e1",
    color: "#0f172a",
    WebkitTextFillColor: "#0f172a",
    caretColor: "#0f172a",
  };

  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-8"
      style={{ backgroundColor: "#020b2d" }}
    >
      <div
        className="w-full max-w-2xl rounded-[28px] p-8 shadow-2xl"
        style={{
          backgroundColor: "#0b1738",
          border: "1px solid #1e335f",
          boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
        }}
      >
        <h1
          className="text-center text-4xl font-bold"
          style={{ color: "#ffffff" }}
        >
          Criar conta
        </h1>

        <p
          className="mt-3 text-center text-sm"
          style={{ color: "#dbe7ff" }}
        >
          Preencha seus dados para começar.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: "#ffffff" }}
            >
              Nome
            </label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-2xl px-4 py-3 outline-none"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: "#ffffff" }}
            >
              E-mail
            </label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-2xl px-4 py-3 outline-none"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: "#ffffff" }}
            >
              Senha
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-2xl px-4 py-3 outline-none"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: "#ffffff" }}
            >
              Instituição
            </label>
            <input
              type="text"
              placeholder="Digite sua instituição"
              value={form.institution}
              onChange={(e) =>
                setForm({ ...form, institution: e.target.value })
              }
              className="w-full rounded-2xl px-4 py-3 outline-none"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: "#ffffff" }}
            >
              Curso
            </label>
            <input
              type="text"
              placeholder="Digite seu curso"
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
              className="w-full rounded-2xl px-4 py-3 outline-none"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: "#ffffff" }}
            >
              Período
            </label>
            <input
              type="text"
              placeholder="Digite seu período"
              value={form.period}
              onChange={(e) => setForm({ ...form, period: e.target.value })}
              className="w-full rounded-2xl px-4 py-3 outline-none"
              style={inputStyle}
            />
          </div>

          {erro ? (
            <p className="text-sm font-medium" style={{ color: "#f87171" }}>
              {erro}
            </p>
          ) : null}

          {sucesso ? (
            <p className="text-sm font-medium" style={{ color: "#34d399" }}>
              {sucesso}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl px-4 py-3 text-base font-semibold transition disabled:opacity-70"
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
            }}
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm" style={{ color: "#ffffff" }}>
          Já tem conta?{" "}
          <Link href="/login" style={{ color: "#60a5fa", fontWeight: 600 }}>
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}