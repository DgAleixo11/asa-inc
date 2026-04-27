import "./globals.css";
import type { Metadata, Viewport } from "next";
import AuthProvider from "@/components/providers/AuthProvider";
import PwaProvider from "@/components/providers/PwaProvider";

export const metadata: Metadata = {
  title: {
    default: "ASA Inc.",
    template: "%s | ASA Inc.",
  },
  description: "Plataforma de conexão entre alunos para suporte acadêmico",
  manifest: "/manifest.webmanifest",
  applicationName: "ASA Inc.",
  keywords: ["ASA Inc.", "mentoria", "alunos", "estudo", "aulas", "reforço"],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ASA Inc.",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png" }],
    shortcut: [{ url: "/icons/icon-192.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <AuthProvider>
          <PwaProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}