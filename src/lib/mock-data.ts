export interface MockMentor {
  id: string;
  user: {
    name: string;
    course: string;
    institution: string;
  };
  bio: string;
  pricePerHour: number;
  averageRating: number;
  totalReviews: number;
  online: boolean;
  nextSlot: string;
  badges: string[];
  subjects: {
    id: string;
    subject: {
      name: string;
    };
  }[];
}

export const mockMentors: MockMentor[] = [
  {
    id: "1",
    user: {
      name: "Marina Costa",
      course: "Engenharia Civil · 7º período",
      institution: "Universidade Exemplo",
    },
    bio: "Tirei notas altas em Cálculo e ajudo alunos com limites, derivadas e exercícios de prova.",
    pricePerHour: 25,
    averageRating: 4.9,
    totalReviews: 87,
    online: true,
    nextSlot: "Hoje, 19h",
    badges: ["Top tutor", "Resposta rápida"],
    subjects: [
      { id: "1", subject: { name: "Cálculo I" } },
      { id: "2", subject: { name: "Cálculo II" } },
      { id: "3", subject: { name: "Limites" } },
    ],
  },
  {
    id: "2",
    user: {
      name: "Pedro Alves",
      course: "Letras · 5º período",
      institution: "Universidade Exemplo",
    },
    bio: "Ajudo com redação, repertório e estrutura argumentativa para provas e vestibulares.",
    pricePerHour: 18,
    averageRating: 5.0,
    totalReviews: 142,
    online: false,
    nextSlot: "Amanhã, 14h",
    badges: ["Nota 980"],
    subjects: [
      { id: "4", subject: { name: "Redação" } },
      { id: "5", subject: { name: "ENEM" } },
    ],
  },
  {
    id: "3",
    user: {
      name: "Juliana Rocha",
      course: "Ciência da Computação · 6º período",
      institution: "Universidade Exemplo",
    },
    bio: "Foco em lógica, Python e projetos práticos para quem quer aprender do zero.",
    pricePerHour: 30,
    averageRating: 4.8,
    totalReviews: 56,
    online: true,
    nextSlot: "Hoje, 21h",
    badges: ["Projeto final"],
    subjects: [
      { id: "6", subject: { name: "Python" } },
      { id: "7", subject: { name: "Lógica" } },
      { id: "8", subject: { name: "POO" } },
    ],
  },
];