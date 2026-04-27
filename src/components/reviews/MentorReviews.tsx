"use client";

import { useEffect, useState } from "react";
import ReviewCard from "@/components/reviews/ReviewCard";

interface MentorReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  studentName: string;
}

interface MentorReviewsProps {
  mentorId: string;
}

export default function MentorReviews({ mentorId }: MentorReviewsProps) {
  const [reviews, setReviews] = useState<MentorReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch(`/api/mentors/${mentorId}/reviews`);
        if (!res.ok) throw new Error("Erro ao buscar avaliações");

        const data = await res.json();
        setReviews(data);
      } catch {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, [mentorId]);

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Carregando avaliações...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Esse mentor ainda não recebeu avaliações.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}