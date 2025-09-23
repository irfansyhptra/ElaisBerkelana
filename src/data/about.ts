export interface AboutData {
  title: string;
  description: string;
  vision: string;
  mission: string[];
  stats: {
    label: string;
    value: string;
  }[];
  team: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  photo: string;
  social: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const aboutData: AboutData = {
  title: "Elaeis Berkelana",
  description:
    "Elaeis Berkelana adalah platform dokumentasi sosial yang berfokus pada perjalanan eksplorasi manfaat kelapa sawit di berbagai desa dan perusahaan di Indonesia. Kami mendokumentasikan dampak positif industri kelapa sawit terhadap pemberdayaan masyarakat lokal dan pembangunan ekonomi berkelanjutan.",
  vision:
    "Menjadi platform dokumentasi terpercaya yang menyajikan narasi autentik tentang kontribusi positif industri kelapa sawit terhadap pembangunan sosial-ekonomi Indonesia.",
  mission: [
    "Mendokumentasikan dampak positif industri kelapa sawit terhadap kehidupan masyarakat desa",
    "Menyajikan cerita autentik tentang pemberdayaan ekonomi lokal melalui perkebunan kelapa sawit",
    "Membangun kesadaran tentang praktik berkelanjutan dalam industri kelapa sawit",
    "Menghubungkan cerita lokal dengan narasi global tentang pembangunan berkelanjutan",
  ],
  stats: [
    {
      label: "Desa Dikunjungi",
      value: "45+",
    },
    {
      label: "Keluarga Terdampak",
      value: "2500+",
    },
    {
      label: "Tahun Perjalanan",
      value: "3+",
    },
    {
      label: "Perusahaan Mitra",
      value: "12+",
    },
  ],
  team: [
    {
      id: "1",
      name: "Elais Rahman",
      position: "Dokumenter & Peneliti Utama",
      photo: "/images/team/elais.jpg",
      social: {
        instagram: "elaisberkelana",
        linkedin: "elais-rahman",
        twitter: "elaisberkelana",
      },
    },
    {
      id: "2",
      name: "Dr. Sari Dewi",
      position: "Advisor Sosial-Ekonomi",
      photo: "/images/team/sari.jpg",
      social: {
        instagram: "saridewi_phd",
        linkedin: "sari-dewi-phd",
      },
    },
    {
      id: "3",
      name: "Budi Pranoto",
      position: "Koordinator Lapangan",
      photo: "/images/team/budi.jpg",
      social: {
        instagram: "budipranoto",
        twitter: "budipranoto",
      },
    },
  ],
};
