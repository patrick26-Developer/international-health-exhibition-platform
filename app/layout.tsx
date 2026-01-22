// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SISNavbar } from "@/components/navbar/SISNavbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SISFooter } from "@/components/footer/SISFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salon International de la Santé | International Health Fair",
  description: "Global platform for health prevention and promotion dedicated to fighting non-communicable diseases and sustainable improvement of population wellbeing.",
};

export default function RootLayout({
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