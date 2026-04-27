export default function DashboardLoadingPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-slate-200/70 px-6 py-10 animate-pulse" />
        <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
          <div className="h-36 rounded-3xl bg-slate-200/70 animate-pulse" />
          <div className="h-36 rounded-3xl bg-slate-200/70 animate-pulse" />
          <div className="h-36 rounded-3xl bg-slate-200/70 animate-pulse" />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="h-80 rounded-3xl bg-slate-200/70 animate-pulse" />
          <div className="h-80 rounded-3xl bg-slate-200/70 animate-pulse" />
        </div>
      </div>
    </main>
  );
}