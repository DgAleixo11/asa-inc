import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) return null;

          const email = String(credentials.email ?? "");
          const password = String(credentials.password ?? "");

          if (!email || !password) return null;

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) return null;

          const isValid = await bcrypt.compare(password, user.passwordHash);

          if (!isValid) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          } as any;
        } catch (error) {
          console.error("Erro no authorize:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = String(token.id ?? "");
        (session.user as any).role = token.role ?? "STUDENT";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};