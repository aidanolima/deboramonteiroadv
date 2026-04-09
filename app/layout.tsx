import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Débora Monteiro | Advocacia e Consultoria Jurídica",
  description: "Atendimento jurídico humanizado e focado em resultados. Especialistas na defesa dos seus direitos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* Adicionamos o suppressHydrationWarning aqui */}
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}