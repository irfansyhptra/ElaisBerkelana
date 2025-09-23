// src/data/journal.ts
import { JournalEntry } from "@/types";

export const mockJournalEntries: JournalEntry[] = [
  {
    id: "1",
    title: "Lokakarya Fotografi di Desa Adat",
    date: "15 Oktober 2025",
    category: "Lokakarya",
    imageUrl: "/images/destinations/gayo.jpg", // Ganti dengan gambar yang sesuai
    excerpt:
      "Mengadakan lokakarya fotografi untuk pemuda-pemudi di desa adat, menangkap keindahan tradisi mereka.",
  },
  {
    id: "2",
    title: "Penelitian Kopi Gayo: Dari Hulu ke Hilir",
    date: "20 September 2025",
    category: "Penelitian",
    imageUrl: "/images/destinations/indo.jpg", // Ganti dengan gambar yang sesuai
    excerpt:
      "Menelusuri proses kopi Gayo dari perkebunan hingga menjadi secangkir kopi nikmat.",
  },
  {
    id: "3",
    title: "Pembangunan Perpustakaan Mini di Pesisir",
    date: "5 Agustus 2025",
    category: "Pengabdian Masyarakat",
    imageUrl: "/hero-background.png", // Ganti dengan gambar yang sesuai
    excerpt:
      "Sebuah inisiatif kecil untuk membawa jendela dunia kepada anak-anak di pesisir.",
  },
];
