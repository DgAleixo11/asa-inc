interface ResponsiveShellProps {
  children: React.ReactNode;
  mobileActive?: "home" | "search" | "chat" | "profile";
}

export default function ResponsiveShell({
  children,
}: ResponsiveShellProps) {
  return <main className="min-h-screen bg-slate-50 text-slate-900">{children}</main>;
}