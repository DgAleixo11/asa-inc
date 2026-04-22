interface ChatPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

const messages = [
  {
    id: "1",
    from: "mentor",
    text: "Oi! Vi que você quer ajuda com derivadas. Em que parte está travando?",
    time: "14:32",
  },
  {
    id: "2",
    from: "student",
    text: "Estou com dificuldade na regra da cadeia, não consigo visualizar direito.",
    time: "14:35",
  },
  {
    id: "3",
    from: "mentor",
    text: "Tranquilo, isso é bem comum. Posso te explicar com exercícios práticos.",
    time: "14:36",
  },
];

export default async function ChatPage({ params }: ChatPageProps) {
  const { orderId } = await params;

  return (
    <main className="min-h-screen bg-slate-50">
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
            <p className="text-sm font-semibold text-slate-900">Marina Costa</p>
            <p className="text-xs text-slate-500">Online agora</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
            <p className="text-sm font-medium text-slate-700">
              Atendimento • Cálculo I
            </p>
          </div>

          <div className="space-y-5 px-6 py-6">
            {messages.map((message) => (
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
                  <p className="text-sm leading-relaxed">{message.text}</p>
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
            ))}
          </div>

          <div className="border-t border-slate-200 bg-white px-6 py-5">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Digite sua mensagem"
                className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-700"
              />
              <button className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}