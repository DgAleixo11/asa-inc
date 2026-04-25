interface SurfaceCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function SurfaceCard({
  children,
  className = "",
}: SurfaceCardProps) {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white p-7 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}