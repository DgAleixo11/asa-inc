require("dotenv/config");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function upsertSubject(name) {
  return prisma.subject.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}

async function upsertMentor({
  name,
  email,
  institution,
  course,
  period,
  bio,
  pricePerHour,
  mode,
  averageRating,
  totalReviews,
  subjects,
  passwordHash,
}) {
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name,
      email,
      passwordHash,
      role: "MENTOR",
      institution,
      course,
      period,
    },
  });

  const profile = await prisma.mentorProfile.upsert({
    where: { userId: user.id },
    update: {
      bio,
      pricePerHour,
      mode,
      averageRating,
      totalReviews,
      approved: true,
    },
    create: {
      userId: user.id,
      bio,
      pricePerHour,
      mode,
      averageRating,
      totalReviews,
      approved: true,
    },
  });

  for (const subject of subjects) {
    const subjectData = await upsertSubject(subject);

    const exists = await prisma.mentorSubject.findFirst({
      where: {
        mentorId: profile.id,
        subjectId: subjectData.id,
      },
    });

    if (!exists) {
      await prisma.mentorSubject.create({
        data: {
          mentorId: profile.id,
          subjectId: subjectData.id,
        },
      });
    }
  }

  return profile;
}

async function main() {
  const hashed = await bcrypt.hash("123456", 10);

  const subjects = [
    "Biologia",
    "Química",
    "Física",
    "Matemática",
    "Redação ENEM",
    "Cálculo I",
    "Python",
    "Power BI",
    "Preparatório Medicina",
    "Preparatório Medicina Veterinária",
    "Preparatório Engenharia",
    "Preparatório ESA",
    "Preparatório EsPCEx",
    "Preparatório EEAR",
    "Preparatório PMERJ",
    "Preparatório Polícia Civil",
  ];

  for (const subject of subjects) {
    await upsertSubject(subject);
  }

  await upsertMentor({
    name: "Ana Beatriz",
    email: "ana.medicina@asa.com",
    institution: "Universidade Federal",
    course: "Medicina",
    period: "8º período",
    bio: "Ajudo estudantes que sonham com Medicina a organizar rotina, revisar biologia, química e montar estratégia para vestibular e ENEM.",
    pricePerHour: 35,
    mode: "ONLINE",
    averageRating: 4.9,
    totalReviews: 128,
    subjects: ["Preparatório Medicina", "Biologia", "Química", "Redação ENEM"],
    passwordHash: hashed,
  });

  await upsertMentor({
    name: "Lucas Ferreira",
    email: "lucas.engenharia@asa.com",
    institution: "Universidade Pública",
    course: "Engenharia de Produção",
    period: "7º período",
    bio: "Dou apoio em cálculo, física, matemática e organização de estudos para quem quer entrar ou sobreviver bem na engenharia.",
    pricePerHour: 30,
    mode: "ONLINE",
    averageRating: 4.8,
    totalReviews: 96,
    subjects: ["Preparatório Engenharia", "Cálculo I", "Física", "Matemática"],
    passwordHash: hashed,
  });

  await upsertMentor({
    name: "Camila Rocha",
    email: "camila.redacao@asa.com",
    institution: "Universidade Estadual",
    course: "Letras",
    period: "6º período",
    bio: "Ajudo com redação ENEM, estrutura argumentativa, repertório sociocultural e correção detalhada para vestibulares.",
    pricePerHour: 25,
    mode: "ONLINE",
    averageRating: 5.0,
    totalReviews: 174,
    subjects: ["Redação ENEM", "Preparatório Medicina", "Preparatório Polícia Civil"],
    passwordHash: hashed,
  });

  await upsertMentor({
    name: "Rafael Mendes",
    email: "rafael.militar@asa.com",
    institution: "Preparatório Militar",
    course: "Matemática e Física",
    period: "Mentor",
    bio: "Foco em preparação para ESA, EsPCEx e EEAR, com matemática, física, simulados e plano de estudo semanal.",
    pricePerHour: 28,
    mode: "ONLINE",
    averageRating: 4.7,
    totalReviews: 83,
    subjects: ["Preparatório ESA", "Preparatório EsPCEx", "Preparatório EEAR", "Matemática", "Física"],
    passwordHash: hashed,
  });

  await upsertMentor({
    name: "Bruno Almeida",
    email: "bruno.policia@asa.com",
    institution: "Preparatório para Concursos",
    course: "Segurança Pública",
    period: "Mentor",
    bio: "Ajudo candidatos de concursos policiais com organização de estudos, português, redação e estratégia para PMERJ e Polícia Civil.",
    pricePerHour: 27,
    mode: "ONLINE",
    averageRating: 4.9,
    totalReviews: 111,
    subjects: ["Preparatório PMERJ", "Preparatório Polícia Civil", "Redação ENEM", "Matemática"],
    passwordHash: hashed,
  });

  await upsertMentor({
    name: "Juliana Costa",
    email: "juliana.tech@asa.com",
    institution: "Universidade Exemplo",
    course: "Ciência da Computação",
    period: "6º período",
    bio: "Ajudo estudantes com Python, lógica de programação, Power BI e projetos práticos para faculdade e portfólio.",
    pricePerHour: 32,
    mode: "ONLINE",
    averageRating: 4.8,
    totalReviews: 67,
    subjects: ["Python", "Power BI", "Preparatório Engenharia"],
    passwordHash: hashed,
  });

  console.log("Seed concluído com os novos nichos da ASA Inc.");
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