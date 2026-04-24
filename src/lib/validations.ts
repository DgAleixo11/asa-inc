import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  institution: z.string().optional(),
  course: z.string().optional(),
  period: z.string().optional(),
});

export const createOrderSchema = z.object({
  mentorId: z.string().min(1),
  subjectId: z.string().min(1),
  description: z.string().min(10),
  scheduledAt: z.string().min(1),
  durationMinutes: z.number().min(30),
  totalPrice: z.number().positive(),
});