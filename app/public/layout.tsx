// app/public/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SISNavbar } from "@/components/navbar/SISNavbar";
import { SISFooter } from "@/components/footer/SISFooter";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salon International de la Santé (S.I.S.) | Plateforme Mondiale de Prévention et Promotion de la Santé",
  description: "Le Salon International de la Santé (S.I.S.) transforme la prévention en investissement stratégique pour le développement humain, social et économique. Plateforme internationale dédiée à la lutte contre les maladies non transmissibles et à l'amélioration durable du bien-être des populations.",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-background">
            <SISNavbar />
            <main className="flex-1 w-full">
              {children}
            </main>
            <SISFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}