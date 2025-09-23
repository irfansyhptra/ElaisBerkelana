// src/app/page.tsx (Diperbaiki)
"use client";

import HeroSection from "@/components/HeroSection";
// TravelPost dan MOCK_POSTS tidak lagi digunakan, jadi kita hapus.
import { Testimonial, JournalEntry } from "@/types";
import AboutSection from "@/components/AboutSection";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/data/testimonials";
import JournalCard from "@/components/JournalCard";
import { mockJournalEntries } from "@/data/journal";
import Link from "next/link";

// MOCK_POSTS dihapus karena tidak digunakan.

export default function Home() {
  return (
    <div className="bg-white">
      <section className="min-h-screen relative">
        <HeroSection />
      </section>

      {/* Bagian Jurnal Terbaru */}
      <section id="journal" className="section-minimal bg-gray-50">
        <div className="w-full px-8 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <div className="glass-card-minimal max-w-4xl mx-auto">
              <h2 className="title-large text-gray-900 mb-4" data-aos="fade-up">
                Jurnal & Kegiatan Terbaru
              </h2>
              <p
                className="text-xl text-gray-600 font-light"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Dokumentasi dari berbagai proyek dan kegiatan yang saya lakukan.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {mockJournalEntries
              .slice(0, 3)
              .map((entry: JournalEntry, index: number) => (
                <div
                  key={entry.id}
                  data-aos="fade-up"
                  data-aos-delay={100 * index}
                >
                  <JournalCard entry={entry} />
                </div>
              ))}
          </div>
          <div className="text-center mt-12" data-aos="fade-up">
            <Link href="/journal" className="btn-primary">
              Lihat Semua Jurnal
            </Link>
          </div>
        </div>
      </section>

      {/* Bagian Testimoni */}
      <section className="section-minimal bg-white">
        <div className="w-full px-8 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <div className="glass-card-minimal max-w-4xl mx-auto">
              <h2 className="title-large text-gray-900 mb-4" data-aos="fade-up">
                Apa Kata Mereka
              </h2>
              <p
                className="text-xl text-gray-600 font-light"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Beberapa testimoni dari rekan dan kolaborator.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial: Testimonial, index: number) => (
              <div
                key={testimonial.id}
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <TestimonialCard testimonial={testimonial} />
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
