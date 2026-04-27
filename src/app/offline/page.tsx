import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-sky-900">ASA Inc.</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Você está offline
        </h1>
        <p className="mt-3 text-slate-600">
          Sua conexão caiu. Algumas páginas salvas ainda podem abrir, mas para
          usar todos os recursos você precisa voltar para a internet.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white"
          >
            Tentar novamente
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-900"
          >
            Ir para dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}