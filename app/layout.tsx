import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Débora Monteiro | Advocacia e Consultoria Jurídica",
  description: "Atendimento jurídico humanizado e focado em resultados. Especialistas na defesa dos seus direitos.",
  
  // MAJOR FIX: Tratamento de imagem para Favicon de alta qualidade
  icons: {
    // 1. Usamos a imagem de alta resolução 'logo.png' da pasta public
    apple: "/logo.png",
    // 2. Definimos explicitamente o ícone como a imagem de alta resolução
    icon: "/logo.png",
  },

  // ESTRATÉGIA DE CACHE (ANTI-CASH): 
  // Força o navegador a buscar a versão mais recente sempre que houver mudança
  other: {
    "cache-control": "no-cache, no-store, must-revalidate",
    "pragma": "no-cache",
    "expires": "0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}