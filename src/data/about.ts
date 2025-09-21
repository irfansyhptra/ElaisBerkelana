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
    "Elaeis Berkelana adalah platform travel yang berfokus pada pengalaman wisata berkualitas dengan harga terjangkau. Kami berkomitmen untuk memberikan pelayanan terbaik dan pengalaman tak terlupakan bagi setiap pelanggan kami.",
  vision:
    "Menjadi platform travel terpercaya yang menghubungkan para pelancong dengan pengalaman wisata autentik di Indonesia.",
  mission: [
    "Menyediakan paket wisata berkualitas dengan harga terjangkau",
    "Mendukung pariwisata lokal dan pemberdayaan masyarakat setempat",
    "Memberikan pengalaman perjalanan yang aman dan nyaman",
    "Mempromosikan destinasi wisata Indonesia ke dunia",
  ],
  stats: [
    {
      label: "Destinasi",
      value: "50+",
    },
    {
      label: "Pelanggan Puas",
      value: "1000+",
    },
    {
      label: "Tahun Pengalaman",
      value: "5+",
    },
    {
      label: "Tour Guide",
      value: "25+",
    },
  ],
  team: [
    {
      id: "1",
      name: "Andi Pratama",
      position: "CEO & Founder",
      photo: "/images/team/andi.jpg",
      social: {
        instagram: "andipratama",
        linkedin: "andi-pratama",
        twitter: "andipratama",
      },
    },
    {
      id: "2",
      name: "Lisa Widodo",
      position: "Head of Operations",
      photo: "/images/team/lisa.jpg",
      social: {
        instagram: "lisawidodo",
        linkedin: "lisa-widodo",
      },
    },
    {
      id: "3",
      name: "Rudi Hartono",
      position: "Head of Marketing",
      photo: "/images/team/rudi.jpg",
      social: {
        instagram: "rudihartono",
        twitter: "rudihartono",
      },
    },
  ],
};
