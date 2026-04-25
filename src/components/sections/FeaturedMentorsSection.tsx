import Link from "next/link";
import MentorCard from "@/components/cards/MentorCard";
import { mockMentors } from "@/lib/mock-data";

export default function FeaturedMentorsSection() {
  const featuredMentors = mockMentors.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-12 md:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Em destaque</p>
          <h3 className="text-3xl font-bold text-slate-900">Tutores em alta</h3>
        </div>

        <Link href="/mentores" className="text-sm font-medium text-sky-900">
          Ver todos
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {featuredMentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </section>
  );
}