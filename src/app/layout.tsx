import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "ELAIES BERKELANA | Kisah dari Pelosok Negeri",
  description:
    "Arsip perjalanan personal menelusuri denyut kehidupan di desa-desa Indonesia. Temukan cerita, budaya, dan keindahan yang jarang tersentuh.",
  keywords:
    "blog perjalanan, travel blog, elaeis, indonesia, desa, petualangan, budaya lokal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      {/* Responsive layout with mobile-first approach */}
      <body className="min-h-screen flex flex-col bg-white overflow-x-hidden">
        <ClientLayout>
          <Navbar />
          {/* Main content with mobile padding considerations */}
          <main className="flex-grow pb-16 sm:pb-0">{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
