// src/data/destinations.ts
import { Destination } from "@/types";

export const mockDestinations: Destination[] = [
  {
    _id: "1",
    slug: "desa-gayo",
    countryId: "1",
    provinceId: "101",
    village: "Desa Gayo",
    province: "Aceh",
    country: "Indonesia",
    description: "Sebuah desa yang kaya akan budaya dan tradisi kopi...",
    youtubeUrl: "https://www.youtube.com/watch?v=example1",
    instagramUrl: "https://www.instagram.com/p/C2x-...",
    coverImage: "/public/images/destinations/gayo.jpg",
    imageGallery: [
      { url: "/public/images/destinations/gayo.jpg", caption: "Kebun Kopi" },
      { url: "/public/images/gayo-2.jpg", caption: "Upacara Tradisional" },
    ],
    timeline: [
      {
        time: "09:00",
        activity: "Kunjungan ke Kebun Kopi",
        notes: "Belajar memetik biji kopi bersama petani lokal.",
        imageUrl: "/public/images/gayo-1.jpg",
      },
      {
        time: "14:00",
        activity: "Upacara Adat",
        notes: "Menyaksikan ritual adat yang sakral.",
        imageUrl: "/public/images/gayo-2.jpg",
      },
    ],
    highlights: ["Tradisi Kopi", "Upacara Adat", "Keramahan Penduduk"],
    createdAt: "2025-09-12",
  },
  // Tambahkan destinasi lainnya di sini
];
