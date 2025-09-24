// src/data/journal.ts
import { JournalEntry } from "@/types";

export const mockJournalEntries: JournalEntry[] = [
  {
    id: "1",
    title: "Petualangan di Gayo Highlands",
    date: "2024-01-15",
    category: "Travel Experience",
    imageUrl: "/images/destinations/gayo.jpg",
    excerpt:
      "Merasakan kehangatan masyarakat Gayo dan menikmati secangkir kopi arabika terbaik di dataran tinggi Aceh. Perjalanan yang tak terlupakan dengan pemandangan yang memukau.",
  },
  {
    id: "2",
    title: "Keberagaman Budaya Indonesia",
    date: "2024-02-01",
    category: "Cultural Journey",
    imageUrl: "/images/destinations/indo.jpg",
    excerpt:
      "Menjelajahi kekayaan budaya Nusantara melalui desa wisata yang menampilkan berbagai tradisi dan kerajinan lokal. Pengalaman yang memperkaya wawasan tentang Indonesia.",
  },
  {
    id: "3",
    title: "Sustainable Tourism di Era Modern",
    date: "2024-02-15",
    category: "Sustainability",
    imageUrl: "/images/destinations/gayo.jpg",
    excerpt:
      "Bagaimana pariwisata berkelanjutan dapat memberikan dampak positif bagi masyarakat lokal dan lingkungan. Cerita dari lapangan tentang implementasi eco-tourism.",
  },
  {
    id: "4",
    title: "Tips Traveling Responsif",
    date: "2024-03-01",
    category: "Travel Tips",
    imageUrl: "/images/destinations/indo.jpg",
    excerpt:
      "Panduan praktis untuk melakukan perjalanan yang bertanggung jawab, mulai dari persiapan hingga interaksi dengan masyarakat lokal. Traveling yang memberikan manfaat untuk semua.",
  },
];
