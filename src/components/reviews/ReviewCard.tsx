import StarRating from "@/components/ui/StarRating";

interface ReviewCardProps {
  review: {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: string | Date;
    studentName: string;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-slate-900">{review.studentName}</p>
          <p className="text-xs text-slate-500">
            {new Date(review.createdAt).toLocaleDateString("pt-BR")}
          </p>
        </div>

        <StarRating rating={review.rating} />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        {review.comment?.trim() || "Sem comentário."}
      </p>
    </div>
  );
}