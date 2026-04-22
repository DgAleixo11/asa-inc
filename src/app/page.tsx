import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium text-slate-500">ASA Inc.</p>
        <h1 className="mt-2 text-5xl font-bold text-slate-900">
          Alunos ajudando alunos
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Encontre ajuda acadêmica com preço acessível ou ensine aquilo que você domina.
        </p>

        <div className="mt-8 flex gap-4">
          <Link href="/cadastro" className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white">
            Criar conta
          </Link>
          <Link href="/login" className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-900">
            Entrar
          </Link>
          <Link href="/mentores" className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-900">
            Ver mentores
          </Link>
        </div>
      </div>
    </main>
  );
}