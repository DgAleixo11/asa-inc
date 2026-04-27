export default function PerfilLoadingPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="h-48 rounded-3xl bg-slate-200/70 animate-pulse" />
        <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
          <div className="h-36 rounded-3xl bg-slate-200/70 animate-pulse" />
          <div className="h-36 rounded-3xl bg-slate-200/70 animate-pulse" />
          <div className="h-36 rounded-3xl bg-slate-200/70 animate-pulse" />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="h-72 rounded-3xl bg-slate-200/70 animate-pulse" />
          <div className="h-72 rounded-3xl bg-slate-200/70 animate-pulse" />
        </div>
      </div>
    </main>
  );
}