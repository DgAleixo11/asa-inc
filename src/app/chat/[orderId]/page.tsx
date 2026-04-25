"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ResponsiveShell from "@/components/layout/ResponsiveShell";

interface ChatPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

interface ChatMessage {
  id: string;
  from: "mentor" | "student";
  text: string;
  time: string;
  senderName: string;
}

export default function ChatPage({ params }: ChatPageProps) {
  const { data: session } = useSession();
  const [orderId, setOrderId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function resolveParams() {
      const resolved = await params;
      setOrderId(resolved.orderId);
    }

    resolveParams();
  }, [params]);

  useEffect(() => {
    async function loadMessages() {
      if (!orderId) return;

      const res = await fetch(`/api/orders/${orderId}/messages`);
      if (!res.ok) return;

      const data = await res.json();
      setMessages(data);
    }

    loadMessages();
  }, [orderId]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || !orderId) return;

    setLoading(true);

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        content,
      }),
    });

    if (res.ok) {
      const newMessage = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: newMessage.id,
          from: "student",
          text: newMessage.content,
          time: new Date(newMessage.createdAt).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          senderName: session?.user?.name || "Você",
        },
      ]);
      setContent("");
    }

    setLoading(false);
  }

  return (
    <ResponsiveShell mobileActive="chat">
      <section className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">ASA Inc.</p>
            <h1 className="text-2xl font-bold text-slate-900">
              Chat do pedido {orderId}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Converse com o tutor e alinhe sua aula.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-100 px-4 py-3 text-right">
            <p className="text-sm font-semibold text-slate-900">Chat real</p>
            <p className="text-xs text-slate-500">Mensagens salvas no banco</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
            <p className="text-sm font-medium text-slate-700">
              Atendimento em andamento
            </p>
          </div>

          <div className="space-y-5 px-6 py-6">
            {messages.length === 0 ? (
              <p className="text-sm text-slate-500">
                Ainda não há mensagens neste pedido.
              </p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.from === "student" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xl rounded-3xl px-5 py-4 ${
                      message.from === "student"
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    <p className="text-xs font-semibold opacity-70">
                      {message.senderName}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={`mt-2 text-xs ${
                        message.from === "student"
                          ? "text-slate-300"
                          : "text-slate-500"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-slate-200 bg-white px-6 py-5">
            <form onSubmit={handleSend} className="flex gap-3">
              <input
                type="text"
                placeholder="Digite sua mensagem"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
              >
                {loading ? "..." : "Enviar"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </ResponsiveShell>
  );
}