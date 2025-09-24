// src/data/destinations.ts
import { Destination, Country, Province } from "@/types";

// Mock countries data
const mockCountries: Country[] = [
  {
    _id: "1",
    name: "Indonesia",
    slug: "indonesia",
    image: {
      url: "/images/destinations/indo.jpg",
      publicId: "indo",
    },
  },
];

// Mock provinces data
const mockProvinces: Province[] = [
  {
    _id: "1",
    name: "Aceh",
    slug: "aceh",
    country: "1",
  },
  {
    _id: "2",
    name: "Jawa Barat",
    slug: "jawa-barat",
    country: "1",
  },
];

export const mockDestinations: Destination[] = [
  {
    _id: "1",
    title: "Desa Gayo Highlands",
    slug: "gayo-highlands",
    description:
      "Desa wisata di dataran tinggi Gayo dengan keindahan alam pegunungan dan budaya kopi yang khas.",
    country: mockCountries[0],
    province: mockProvinces[0],
    village: "Desa Gayo Highlands",
    images: ["/images/destinations/gayo.jpg", "/images/destinations/indo.jpg"],
    price: 500000,
    rating: 4.8,
    duration: "2-3 hari",
    included: [
      "Akomodasi homestay",
      "Makan 3x sehari",
      "Tour guide lokal",
      "Aktivitas wisata kopi",
      "Transportasi lokal",
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          "Arrival dan check-in homestay",
          "Tour perkebunan kopi",
          "Proses pengolahan kopi tradisional",
          "Menikmati sunset di bukit",
        ],
      },
      {
        day: 2,
        activities: [
          "Trekking ke air terjun",
          "Wisata Danau Laut Tawar",
          "Interaksi dengan masyarakat lokal",
          "Belajar tarian tradisional Gayo",
        ],
      },
    ],
    featured: true,
    createdAt: "2024-01-15",
    youtubeUrl: "https://www.youtube.com/watch?v=example1",
  },
  {
    _id: "2",
    title: "Desa Wisata Indonesia",
    slug: "wisata-indonesia",
    description:
      "Desa wisata yang menampilkan keragaman budaya Indonesia dengan berbagai atraksi wisata tradisional.",
    country: mockCountries[0],
    province: mockProvinces[1],
    village: "Desa Wisata Indonesia",
    images: ["/images/destinations/indo.jpg", "/images/destinations/gayo.jpg"],
    price: 300000,
    rating: 4.5,
    duration: "1-2 hari",
    included: [
      "Akomodasi guesthouse",
      "Makan tradisional",
      "Workshop kerajinan",
      "Pertunjukan seni budaya",
      "Souvenir khas daerah",
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          "Welcome ceremony",
          "Tour desa dan pengenalan budaya",
          "Workshop membatik",
          "Pertunjukan tari tradisional",
          "Makan malam bersama keluarga host",
        ],
      },
    ],
    featured: false,
    createdAt: "2024-02-01",
    youtubeUrl: "https://www.youtube.com/watch?v=example2",
  },
];
