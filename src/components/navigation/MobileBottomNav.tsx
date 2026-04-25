"use client";

import Link from "next/link";

interface MobileBottomNavProps {
  active?: "home" | "search" | "chat" | "profile";
}

export default function MobileBottomNav({
  active = "home",
}: MobileBottomNavProps) {
  const cls = (key: string) =>
    `flex min-w-[64px] flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium transition ${
      active === key
        ? "bg-sky-100 text-sky-900"
        : "text-slate-400 hover:bg-slate-100"
    }`;

  return (
    <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-2">
        <Link href="/" className={cls("home")}>
          <span className="text-lg">⌂</span>
          <span>Início</span>
        </Link>

        <Link href="/mentores" className={cls("search")}>
          <span className="text-lg">⌕</span>
          <span>Buscar</span>
        </Link>

        <Link href="/chat/123" className={cls("chat")}>
          <span className="text-lg">◔</span>
          <span>Chat</span>
        </Link>

        <Link href="/perfil" className={cls("profile")}>
          <span className="text-lg">◡</span>
          <span>Perfil</span>
        </Link>
      </div>
    </div>
  );
}