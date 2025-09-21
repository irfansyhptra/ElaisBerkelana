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
      "Sebuah perjalanan spiritual menemukan ketenangan di tengah tarian alam dan budaya lokal yang kental. Matahari terbenam di sini bukan sekadar penutup hari, melainkan pembuka tirai pertunjukan semesta.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "/images/post1.jpg",
  },
  {
    _id: "2",
    title: "Kopi dan Kabut di Pegunungan",
    village: "Desa Takengon, Aceh Tengah",
    date: "28 Agustus 2025",
    description:
      "Menyesap secangkir kopi arabika asli langsung dari sumbernya sambil diselimuti kabut dingin adalah pengalaman yang tak terlupakan. Desa ini mengajarkan arti kesederhanaan dan kenikmatan.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "/images/post2.jpg",
  },
];

export default function Home() {
  useEffect(() => {
    // Debug: Log posts to console
    console.log("MOCK_POSTS:", MOCK_POSTS);

    // Optional: Add smooth scroll behavior for enhanced UX
    const addSmoothScrolling = () => {
      const links = document.querySelectorAll('a[href^="#"]');
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const href = link.getAttribute("href");
          if (href) {
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }
        });
      });
    };

    addSmoothScrolling();
  }, []);

  return (
    <div>
      <section className="h-screen relative">
        <HeroSection />
      </section>

      <section
        id="journey"
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20"
        style={{ display: "block", visibility: "visible" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Jejak Perjalanan Terbaru
            </h2>
            <p
              className="text-lg text-gray-600"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Setiap tempat menyimpan permata uniknya. Inilah beberapa kisah
              terbaru dari petualangan saya.
            </p>
          </div>

          <div className="travel-posts-grid max-w-6xl mx-auto">
            {MOCK_POSTS.length > 0 ? (
              MOCK_POSTS.map((post, index) => (
                <div
                  key={post._id}
                  className="transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
                  data-aos="fade-up"
                  data-aos-delay={300 + index * 200}
                  data-aos-duration="800"
                >
                  <TravelPost post={post} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-500 text-lg">
                  Belum ada post tersedia.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="min-h-screen">
        <AboutSection />
      </section>
    </div>
  );
}
