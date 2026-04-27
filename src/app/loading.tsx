export default function GlobalLoadingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white shadow-lg">
          ASA
        </div>

        <p className="mt-5 text-lg font-semibold text-slate-900">ASA Inc.</p>
        <p className="mt-1 text-sm text-slate-500">Carregando sua experiência...</p>

        <div className="mt-5 h-1.5 w-32 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-slate-900" />
        </div>
      </div>
    </main>
  );
}