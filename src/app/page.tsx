"use client";

import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import TravelPost from "@/components/TravelPost";
import { Post } from "@/types";
import AboutSection from "@/components/AboutSection";

const MOCK_POSTS: Post[] = [
  {
    _id: "1",
    title: "Menyapa Senja di Desa Penari",
    village: "Desa Gayo, Aceh",
    date: "12 September 2025",
    description:
      "Sebuah perjalanan spiritual menemukan ketenangan di tengah tarian alam dan budaya lokal yang kental...",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "/images/destinations/gayo.jpg",
  },
  {
    _id: "2",
    title: "Kopi dan Kabut di Pegunungan",
    village: "Desa Takengon, Aceh Tengah",
    date: "28 Agustus 2025",
    description:
      "Menyesap secangkir kopi arabika asli langsung dari sumbernya sambil diselimuti kabut dingin...",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "/images/destinations/indo.jpg",
  },
];

export default function Home() {
  useEffect(() => {
    console.log("MOCK_POSTS:", MOCK_POSTS);
  }, []);

  return (
    <div className="bg-white">
      <section className="min-h-screen relative">
        <HeroSection />
      </section>

      <section
        id="journey"
        className="section-minimal bg-gradient-to-b from-white via-gray-50 to-white"
      >
        <div className="w-full px-8 lg:px-16 xl:px-20">
          <div className="text-center mb-24">
            <div className="glass-card max-w-5xl mx-auto">
              <h2 className="title-large text-gray-900 mb-6" data-aos="fade-up">
                Jejak Perjalanan Terbaru
              </h2>
              <p
                className="text-xl text-gray-600 font-light leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Setiap tempat menyimpan permata uniknya. Inilah beberapa kisah
                terbaru dari petualangan saya.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {MOCK_POSTS.map((post, index) => (
              <div
                key={post._id}
                className="transform transition-all duration-500 hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={300 + index * 200}
                data-aos-duration="800"
              >
                <TravelPost post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-screen">
        <AboutSection />
      </section>
    </div>
  );
}
