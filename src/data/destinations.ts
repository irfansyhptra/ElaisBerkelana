export interface Destination {
  id: string;
  title: string;
  description: string;
  location: string;
  images: string[];
  price: number;
  rating: number;
  duration: string;
  included: string[];
  itinerary: {
    day: number;
    activities: string[];
  }[];
  featured: boolean;
}

export const destinations: Destination[] = [
  {
    id: "bali-paradise",
    title: "Bali Paradise Explorer",
    description:
      "Jelajahi keindahan Pulau Dewata dengan pengalaman yang tak terlupakan. Dari pantai eksotis hingga kuil bersejarah.",
    location: "Bali, Indonesia",
    images: [
      "/images/destinations/bali-1.jpg",
      "/images/destinations/bali-2.jpg",
      "/images/destinations/bali-3.jpg",
    ],
    price: 5000000,
    rating: 4.8,
    duration: "4 hari 3 malam",
    included: [
      "Hotel bintang 4",
      "Transportasi AC",
      "Guide profesional",
      "Tiket masuk wisata",
      "Makan 3x sehari",
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          "Check-in hotel",
          "Mengunjungi Pantai Kuta",
          "Makan malam di Jimbaran",
        ],
      },
      {
        day: 2,
        activities: [
          "Mengunjungi Pura Tanah Lot",
          "Melihat sunset di Uluwatu",
          "Menonton tari Kecak",
        ],
      },
      {
        day: 3,
        activities: [
          "Eksplorasi Ubud",
          "Mengunjungi Monkey Forest",
          "Berbelanja di Pasar Seni",
        ],
      },
      {
        day: 4,
        activities: [
          "Sarapan",
          "Waktu bebas",
          "Check-out dan transfer ke bandara",
        ],
      },
    ],
    featured: true,
  },
  {
    id: "yogyakarta-heritage",
    title: "Yogyakarta Heritage Tour",
    description:
      "Rasakan pesona budaya dan sejarah di kota istimewa Yogyakarta. Dari Candi Borobudur hingga Malioboro.",
    location: "Yogyakarta, Indonesia",
    images: [
      "/images/destinations/yogya-1.jpg",
      "/images/destinations/yogya-2.jpg",
      "/images/destinations/yogya-3.jpg",
    ],
    price: 3500000,
    rating: 4.7,
    duration: "3 hari 2 malam",
    included: [
      "Hotel bintang 3",
      "Transportasi AC",
      "Guide lokal",
      "Tiket masuk wisata",
      "Makan 3x sehari",
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          "Check-in hotel",
          "Mengunjungi Keraton Yogyakarta",
          "Jalan-jalan di Malioboro",
        ],
      },
      {
        day: 2,
        activities: [
          "Sunrise di Borobudur",
          "Mengunjungi Prambanan",
          "Pertunjukan Ramayana Ballet",
        ],
      },
      {
        day: 3,
        activities: [
          "Belanja oleh-oleh",
          "Check-out dan transfer ke stasiun/bandara",
        ],
      },
    ],
    featured: true,
  },
  {
    id: "bromo-adventure",
    title: "Bromo Mountain Adventure",
    description:
      "Petualangan seru melihat sunrise dan keindahan Gunung Bromo yang menakjubkan.",
    location: "Jawa Timur, Indonesia",
    images: [
      "/images/destinations/bromo-1.jpg",
      "/images/destinations/bromo-2.jpg",
      "/images/destinations/bromo-3.jpg",
    ],
    price: 2500000,
    rating: 4.9,
    duration: "2 hari 1 malam",
    included: [
      "Penginapan",
      "Jeep 4x4",
      "Guide lokal",
      "Tiket masuk",
      "Makan 3x",
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          "Penjemputan di Malang/Surabaya",
          "Check-in hotel area Bromo",
          "Istirahat dan briefing",
        ],
      },
      {
        day: 2,
        activities: [
          "Start jeep tour (02.30)",
          "Sunrise di Penanjakan",
          "Explore Gunung Bromo",
          "Kembali ke hotel dan check-out",
          "Transfer ke Malang/Surabaya",
        ],
      },
    ],
    featured: false,
  },
];
