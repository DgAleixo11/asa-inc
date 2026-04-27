"use client";

import Link from "next/link";
import { mobileNavItems } from "@/config/navigation";
import type { MobileNavKey } from "@/types/ui";

interface MobileBottomNavProps {
  active?: MobileNavKey;
}

export default function MobileBottomNav({
  active = "home",
}: MobileBottomNavProps) {
  const cls = (key: string) =>
    `flex min-w-[64px] flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[11px] font-medium transition ${
      active === key
        ? "bg-sky-100 text-sky-900"
        : "text-slate-400 hover:bg-slate-100"
    }`;

  return (
    <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-2">
        {mobileNavItems.map((item) => (
          <Link key={item.key} href={item.href} className={cls(item.key)}>
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}