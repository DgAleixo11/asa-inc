import Link from "next/link";
import MentorCard from "@/components/cards/MentorCard";
import { mockMentors } from "@/lib/mock-data";

export default function FeaturedMentorsSection() {
  const featuredMentors = mockMentors.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8 md:pb-12">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Em destaque</p>
          <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Tutores em alta
          </h3>
        </div>

        <Link href="/mentores" className="text-sm font-medium text-sky-900">
          Ver todos
        </Link>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {featuredMentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </section>
  );
}