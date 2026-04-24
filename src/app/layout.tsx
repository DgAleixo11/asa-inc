import "./globals.css";
import type { Metadata } from "next";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "ASA Inc.",
  description: "Plataforma de conexão entre alunos para suporte acadêmico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}