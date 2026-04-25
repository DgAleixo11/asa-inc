import DesktopNavbar from "@/components/navigation/DesktopNavbar";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";

interface ResponsiveShellProps {
  children: React.ReactNode;
  mobileActive?: "home" | "search" | "chat" | "profile";
}

export default function ResponsiveShell({
  children,
  mobileActive = "home",
}: ResponsiveShellProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="hidden md:block">
        <DesktopNavbar />
        <div className="min-h-[calc(100vh-73px)]">{children}</div>
      </div>

      <div className="md:hidden">
        <div className="mx-auto min-h-screen max-w-md bg-slate-50">
          <div className="pb-28">{children}</div>
          <MobileBottomNav active={mobileActive} />
        </div>
      </div>
    </main>
  );
}