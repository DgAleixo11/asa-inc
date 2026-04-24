import { prisma } from "@/lib/prisma";

export async function getMentors() {
  const mentors = await prisma.mentorProfile.findMany({
    where: {
      approved: true,
    },
    include: {
      user: true,
      subjects: {
        include: {
          subject: true,
        },
      },
    },
    orderBy: {
      averageRating: "desc",
    },
  });

  return mentors.map((mentor) => ({
    id: mentor.id,
    user: {
      name: mentor.user.name,
      course: `${mentor.user.course ?? "Curso"}${
        mentor.user.period ? ` · ${mentor.user.period}` : ""
      }`,
      institution: mentor.user.institution ?? "Instituição não informada",
    },
    bio: mentor.bio,
    pricePerHour: mentor.pricePerHour,
    averageRating: mentor.averageRating,
    totalReviews: mentor.totalReviews,
    online: true,
    nextSlot: "Hoje, 19h",
    badges: ["Tutor verificado"],
    subjects: mentor.subjects.map((item) => ({
      id: item.id,
      subject: {
        name: item.subject.name,
      },
    })),
  }));
}

export async function getMentorById(id: string) {
  const mentor = await prisma.mentorProfile.findUnique({
    where: { id },
    include: {
      user: true,
      subjects: {
        include: {
          subject: true,
        },
      },
    },
  });

  if (!mentor || !mentor.approved) return null;

  return {
    id: mentor.id,
    user: {
      name: mentor.user.name,
      course: `${mentor.user.course ?? "Curso"}${
        mentor.user.period ? ` · ${mentor.user.period}` : ""
      }`,
      institution: mentor.user.institution ?? "Instituição não informada",
    },
    bio: mentor.bio,
    pricePerHour: mentor.pricePerHour,
    averageRating: mentor.averageRating,
    totalReviews: mentor.totalReviews,
    online: true,
    nextSlot: "Hoje, 19h",
    badges: ["Tutor verificado"],
    subjects: mentor.subjects.map((item) => ({
      id: item.id,
      subject: {
        name: item.subject.name,
      },
    })),
  };
}