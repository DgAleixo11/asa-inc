import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import { desktopNavItems } from "@/config/navigation";

export default function DesktopNavbar() {
  return (
    <header className="hidden border-b border-slate-200 bg-white/80 backdrop-blur md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <BrandLogo />

        <nav className="flex items-center gap-8">
          {desktopNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/login"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Entrar
          </Link>
        </nav>
      </div>
    </header>
  );
}