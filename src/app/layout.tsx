import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

// Konfigurasi font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-poppins", // Opsional, untuk penggunaan via variabel CSS
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
    <html lang="id" className={poppins.className}>
      <body className="min-h-screen flex flex-col">
        <ClientLayout>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
