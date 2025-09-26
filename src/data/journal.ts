// src/data/journal.ts
import { JournalEntry } from "@/types";

export const mockJournalEntries: JournalEntry[] = [
  {
    id: "1",
    title: "Eksplorasi Kebun Sawit Berkelanjutan di Riau",
    date: "2024-03-15",
    category: "Dokumentasi",
    imageUrl: "/images/destinations/indo.jpg",
    excerpt:
      "Menyaksikan langsung praktik berkelanjutan dalam pengelolaan kebun kelapa sawit yang ramah lingkungan dan memberdayakan masyarakat lokal.",
  },
  {
    id: "2",
    title: "Kisah Petani Sawit Mandiri di Kalimantan",
    date: "2024-03-10",
    category: "Komunitas",
    imageUrl: "/images/destinations/gayo.jpg",
    excerpt:
      "Perjalanan menginspirasi bersama petani sawit yang berhasil membangun koperasi dan meningkatkan kesejahteraan keluarga melalui praktik pertanian berkelanjutan.",
  },
  {
    id: "3",
    title: "Inovasi Teknologi Ramah Lingkungan",
    date: "2024-03-05",
    category: "Teknologi",
    imageUrl: "/images/destinations/indo.jpg",
    excerpt:
      "Mengulas penerapan teknologi terdepan dalam pengolahan kelapa sawit yang mengurangi jejak karbon dan meningkatkan efisiensi produksi.",
  },
];
