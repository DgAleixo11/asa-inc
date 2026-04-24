import Link from "next/link";

export default function DesktopNavbar() {
  return (
    <header className="hidden border-b border-slate-200 bg-white/80 backdrop-blur md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <Link href="/" className="text-lg font-bold text-slate-900">
            ASA Inc.
          </Link>
          <p className="text-xs text-slate-500">Aprender é evoluir.</p>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Início
          </Link>
          <Link
            href="/mentores"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Mentores
          </Link>
          <Link
            href="/pedidos"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Pedidos
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Dashboard
          </Link>
          <Link
            href="/perfil"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Perfil
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Entrar
          </Link>
        </nav>
      </div>
    </header>
  );
}