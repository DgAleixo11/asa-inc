async function getMentors() {
  const res = await fetch("http://localhost:3000/api/mentors", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erro ao buscar mentores");
  return res.json();
}

export default async function MentoresPage() {
  const mentors = await getMentors();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-slate-900">Mentores disponíveis</h1>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor: any) => (
            <a
              key={mentor.id}
              href={`/mentores/${mentor.id}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-900">{mentor.user.name}</h2>
              <p className="mt-2 text-sm text-slate-600">{mentor.bio}</p>
              <p className="mt-4 text-sm text-slate-500">R$ {mentor.pricePerHour.toFixed(2)}/hora</p>
              <p className="text-sm text-slate-500">Nota {mentor.averageRating.toFixed(1)}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}