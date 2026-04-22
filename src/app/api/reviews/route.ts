import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createReviewSchema } from "@/lib/validations";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createReviewSchema.safeParse({
      ...body,
      studentId: session.user.id,
    });

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { orderId, studentId, mentorId, rating, comment } = parsed.data;

    const existingReview = await prisma.review.findUnique({
      where: { orderId },
    });

    if (existingReview) {
      return NextResponse.json({ error: "Esse pedido já foi avaliado" }, { status: 409 });
    }

    const review = await prisma.review.create({
      data: {
        orderId,
        studentId,
        mentorId,
        rating,
        comment,
      },
    });

    const mentorReviews = await prisma.review.findMany({
      where: { mentorId },
      select: { rating: true },
    });

    const totalReviews = mentorReviews.length;
    const averageRating =
      mentorReviews.reduce((acc, item) => acc + item.rating, 0) / totalReviews;

    await prisma.mentorProfile.update({
      where: { userId: mentorId },
      data: { averageRating, totalReviews },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao salvar avaliação" }, { status: 500 });
  }
}