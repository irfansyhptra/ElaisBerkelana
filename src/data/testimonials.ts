export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  destination: string;
  comment: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Pak Suryadi",
    avatar: "/images/testimonials/avatar1.jpg",
    rating: 5,
    destination: "Petani Kelapa Sawit, Desa Muaro Jambi",
    comment:
      "Berkat kemitraan dengan perusahaan kelapa sawit, kehidupan keluarga saya jauh lebih baik. Anak-anak bisa sekolah dan kami punya rumah yang layak.",
    date: "2025-10-15",
  },
  {
    id: "2",
    name: "Ibu Sari Wulandari",
    avatar: "/images/testimonials/avatar2.jpg",
    rating: 5,
    destination: "Ketua Koperasi Wanita Tani Sawit, Riau",
    comment:
      "Melalui koperasi ini, kami para ibu-ibu bisa mandiri secara ekonomi. Penghasilan dari kelapa sawit membantu pendidikan anak-anak kami.",
    date: "2025-09-28",
  },
  {
    id: "3",
    name: "Dr. Bambang Sutrisno",
    avatar: "/images/testimonials/avatar3.jpg",
    rating: 5,
    destination: "Kepala Desa Sungai Bahar, Sumsel",
    comment:
      "Industri kelapa sawit telah mengubah wajah desa kami. Infrastruktur membaik, ada klinik kesehatan, dan generasi muda tidak lagi merantau.",
    date: "2025-10-02",
  },
  {
    id: "4",
    name: "Ahmad Rizaldi",
    avatar: "/images/testimonials/avatar1.jpg",
    rating: 5,
    destination: "Manajer CSR PT. Sawit Makmur",
    comment:
      "Program pemberdayaan masyarakat melalui kelapa sawit berkelanjutan telah memberikan dampak nyata pada peningkatan taraf hidup petani.",
    date: "2025-09-15",
  },
  {
    id: "5",
    name: "Ibu Nurlaela",
    avatar: "/images/testimonials/avatar2.jpg",
    rating: 5,
    destination: "Guru SD Desa Sawit Jaya, Kalbar",
    comment:
      "Bantuan pendidikan dari perusahaan sawit memungkinkan kami memiliki perpustakaan dan laboratorium komputer untuk anak-anak desa.",
    date: "2025-08-20",
  },
  {
    id: "6",
    name: "Bapak Joko Widodo",
    avatar: "/images/testimonials/avatar3.jpg",
    rating: 5,
    destination: "Koordinator Plasma Sawit, Kalteng",
    comment:
      "Sistem plasma kelapa sawit memberikan kepastian penghasilan bagi petani kecil. Ini solusi yang berkelanjutan untuk ekonomi pedesaan.",
    date: "2025-08-10",
  },
];
