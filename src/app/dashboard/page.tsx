import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return <main className="p-10">Você precisa entrar.</main>;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Olá, {session.user.name}
        </h1>
        <p className="mt-2 text-slate-600">Bem-vindo à sua área da ASA Inc.</p>
      </div>
    </main>
  );
}