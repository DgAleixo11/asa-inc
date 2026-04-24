export interface MockOrder {
  id: string;
  title: string;
  mentorName: string;
  subject: string;
  date: string;
  status: "Confirmado" | "Pendente" | "Agendado" | "Concluído" | "Cancelado";
}

export const mockOrders: MockOrder[] = [
  {
    id: "123",
    title: "Aula de Cálculo I",
    mentorName: "Marina Costa",
    subject: "Cálculo I",
    date: "Hoje às 19h",
    status: "Confirmado",
  },
  {
    id: "124",
    title: "Redação ENEM",
    mentorName: "Pedro Alves",
    subject: "Redação",
    date: "Amanhã às 14h",
    status: "Pendente",
  },
  {
    id: "125",
    title: "Python básico",
    mentorName: "Juliana Rocha",
    subject: "Python",
    date: "Sexta às 20h",
    status: "Agendado",
  },
];