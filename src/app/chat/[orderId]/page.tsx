interface ChatPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { orderId } = await params;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-900">Chat do pedido {orderId}</h1>
        </div>

        <div className="space-y-4 px-6 py-6">
          <div className="max-w-md rounded-2xl bg-slate-100 px-4 py-3 text-slate-800">
            Aqui vai aparecer a conversa entre aluno e mentor.
          </div>
        </div>
      </div>
    </main>
  );
}