interface MentorPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getMentors() {
  const res = await fetch("http://localhost:3000/api/mentors", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erro ao buscar mentores");
  return res.json();
}

export default async function MentorDetailsPage({ params }: MentorPageProps) {
  const { id } = await params;
  const mentors = await getMentors();
  const mentor = mentors.find((item: any) => item.id === id);

  if (!mentor) {
    return <main className="p-10">Mentor não encontrado.</main>;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">{mentor.user.name}</h1>
        <p className="mt-2 text-slate-600">{mentor.bio}</p>
        <p className="mt-4 text-slate-500">R$ {mentor.pricePerHour.toFixed(2)}/hora</p>
        <p className="text-slate-500">Nota {mentor.averageRating.toFixed(1)}</p>
      </div>
    </main>
  );
}