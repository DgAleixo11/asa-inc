import "./globals.css";
import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}