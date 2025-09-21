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
    name: "Ahmad Rizki",
    avatar: "/images/testimonials/avatar1.jpg",
    rating: 5,
    destination: "Bali Paradise Explorer",
    comment:
      "Pengalaman yang luar biasa! Guide sangat profesional dan akomodasi memuaskan. Akan merekomendasikan ke teman-teman!",
    date: "2025-08-15",
  },
  {
    id: "2",
    name: "Siti Nurhaliza",
    avatar: "/images/testimonials/avatar2.jpg",
    rating: 4,
    destination: "Yogyakarta Heritage Tour",
    comment:
      "Tour yang sangat berkesan, bisa mengenal lebih dalam budaya Yogyakarta. Pelayanan memuaskan!",
    date: "2025-08-10",
  },
  {
    id: "3",
    name: "Budi Santoso",
    avatar: "/images/testimonials/avatar3.jpg",
    rating: 5,
    destination: "Bromo Mountain Adventure",
    comment:
      "Sunrise di Bromo sungguh menakjubkan! Worth it banget! Guide sangat berpengalaman.",
    date: "2025-07-28",
  },
];
