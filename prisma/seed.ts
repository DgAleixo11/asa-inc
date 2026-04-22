import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL!;

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const hashed = await bcrypt.hash("123456", 10);

  const calculus = await prisma.subject.create({
    data: {
      name: "Cálculo I",
    },
  }).catch(async () => {
    return prisma.subject.findFirstOrThrow({ where: { name: "Cálculo I" } });
  });

  const mentorUser = await prisma.user.upsert({
    where: { email: "marina@asa.com" },
    update: {},
    create: {
      name: "Marina Costa",
      email: "marina@asa.com",
      passwordHash: hashed,
      role: "MENTOR",
      institution: "Universidade Exemplo",
      course: "Engenharia Civil",
      period: "7º",
    },
  });

  const mentorProfile = await prisma.mentorProfile.upsert({
    where: { userId: mentorUser.id },
    update: {},
    create: {
      userId: mentorUser.id,
      bio: "Ajudo alunos com cálculo, limites e derivadas.",
      pricePerHour: 25,
      mode: "ONLINE",
      approved: true,
    },
  });

  const existingRelation = await prisma.mentorSubject.findFirst({
    where: {
      mentorId: mentorProfile.id,
      subjectId: calculus.id,
    },
  });

  if (!existingRelation) {
    await prisma.mentorSubject.create({
      data: {
        mentorId: mentorProfile.id,
        subjectId: calculus.id,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });