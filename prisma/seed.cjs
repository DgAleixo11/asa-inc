require("dotenv/config");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("123456", 10);

  const calculo = await prisma.subject.upsert({
    where: { name: "Cálculo I" },
    update: {},
    create: { name: "Cálculo I" },
  });

  const redacao = await prisma.subject.upsert({
    where: { name: "Redação" },
    update: {},
    create: { name: "Redação" },
  });

  const python = await prisma.subject.upsert({
    where: { name: "Python" },
    update: {},
    create: { name: "Python" },
  });

  const marina = await prisma.user.upsert({
    where: { email: "marina@asa.com" },
    update: {},
    create: {
      name: "Marina Costa",
      email: "marina@asa.com",
      passwordHash: hashed,
      role: "MENTOR",
      institution: "Universidade Exemplo",
      course: "Engenharia Civil",
      period: "7º período",
    },
  });

  const pedro = await prisma.user.upsert({
    where: { email: "pedro@asa.com" },
    update: {},
    create: {
      name: "Pedro Alves",
      email: "pedro@asa.com",
      passwordHash: hashed,
      role: "MENTOR",
      institution: "Universidade Exemplo",
      course: "Letras",
      period: "5º período",
    },
  });

  const juliana = await prisma.user.upsert({
    where: { email: "juliana@asa.com" },
    update: {},
    create: {
      name: "Juliana Rocha",
      email: "juliana@asa.com",
      passwordHash: hashed,
      role: "MENTOR",
      institution: "Universidade Exemplo",
      course: "Ciência da Computação",
      period: "6º período",
    },
  });

  const marinaProfile = await prisma.mentorProfile.upsert({
    where: { userId: marina.id },
    update: {},
    create: {
      userId: marina.id,
      bio: "Ajudo alunos com cálculo, limites e derivadas.",
      pricePerHour: 25,
      mode: "ONLINE",
      averageRating: 4.9,
      totalReviews: 87,
      approved: true,
    },
  });

  const pedroProfile = await prisma.mentorProfile.upsert({
    where: { userId: pedro.id },
    update: {},
    create: {
      userId: pedro.id,
      bio: "Ajudo com redação, estrutura argumentativa e repertório.",
      pricePerHour: 18,
      mode: "ONLINE",
      averageRating: 5.0,
      totalReviews: 142,
      approved: true,
    },
  });

  const julianaProfile = await prisma.mentorProfile.upsert({
    where: { userId: juliana.id },
    update: {},
    create: {
      userId: juliana.id,
      bio: "Foco em lógica, Python e projetos práticos.",
      pricePerHour: 30,
      mode: "ONLINE",
      averageRating: 4.8,
      totalReviews: 56,
      approved: true,
    },
  });

  const mentorSubjects = [
    { mentorId: marinaProfile.id, subjectId: calculo.id },
    { mentorId: pedroProfile.id, subjectId: redacao.id },
    { mentorId: julianaProfile.id, subjectId: python.id },
  ];

  for (const item of mentorSubjects) {
    const exists = await prisma.mentorSubject.findFirst({ where: item });
    if (!exists) {
      await prisma.mentorSubject.create({ data: item });
    }
  }

  console.log("Seed concluído.");
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