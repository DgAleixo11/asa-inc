import Link from "next/link";
import MentorCard from "@/components/cards/MentorCard";
import { mockMentors } from "@/lib/mock-data";

export default function FeaturedMentorsSection() {
  const featuredMentors = mockMentors.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-10">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Em destaque</p>
          <h3 className="text-2xl font-bold text-slate-900">Tutores em alta</h3>
        </div>

        <Link href="/mentores" className="text-sm font-medium text-sky-900">
          Ver todos
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featuredMentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </section>
  );
}