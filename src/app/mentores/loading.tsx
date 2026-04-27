export default function MentoresLoadingPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="h-52 rounded-3xl bg-slate-200/70 animate-pulse" />
        <div className="mt-8 grid gap-4 md:gap-6 xl:grid-cols-3">
          <div className="h-80 rounded-3xl bg-slate-200/70 animate-pulse" />
          <div className="h-80 rounded-3xl bg-slate-200/70 animate-pulse" />
          <div className="h-80 rounded-3xl bg-slate-200/70 animate-pulse" />
        </div>
      </div>
    </main>
  );
}