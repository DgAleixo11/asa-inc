import Link from "next/link";
import type { MockMentor } from "@/lib/mock-data";

interface MentorCardProps {
  mentor: MockMentor;
}

export default function MentorCard({ mentor }: MentorCardProps) {
  return (
    <Link
      href={`/mentores/${mentor.id}`}
      className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3 md:mb-5 md:gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-700 to-cyan-500 text-lg font-bold text-white md:h-16 md:w-16 md:text-xl">
            {mentor.user.name.charAt(0)}
            {mentor.online ? (
              <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
            ) : null}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
              {mentor.user.name}
            </h2>
            <p className="text-sm text-slate-500">{mentor.user.course}</p>
            <p className="hidden text-xs text-slate-400 md:block">
              {mentor.user.institution}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-400">a partir de</p>
          <p className="text-lg font-bold text-slate-900 md:text-xl">
            R$ {mentor.pricePerHour.toFixed(2)}
          </p>
          <p className="text-xs text-slate-500">/hora</p>
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-slate-600 md:mb-5">
        {mentor.bio}
      </p>

      <div className="mb-4 flex flex-wrap gap-2 md:mb-5">
        {mentor.subjects.slice(0, 3).map((item) => (
          <span
            key={item.id}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
          >
            {item.subject.name}
          </span>
        ))}
      </div>

      {mentor.badges.length > 0 ? (
        <div className="mb-4 flex flex-wrap gap-2 md:mb-5">
          {mentor.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-sky-800"
            >
              {badge}
            </span>
          ))}
        </div>
      ) : null}

      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Nota {mentor.averageRating.toFixed(1)}
          </p>
          <p className="text-xs text-slate-500">
            {mentor.totalReviews} avaliações
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium text-sky-900">
            {mentor.nextSlot}
          </p>
          <p className="text-xs text-slate-500">Próximo horário</p>
        </div>
      </div>
    </Link>
  );
}