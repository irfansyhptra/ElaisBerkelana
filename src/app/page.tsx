// src/app/page.tsx (Enhanced with Glassmorphism)
"use client";

import HeroSection from "@/components/HeroSection";
import { Testimonial, JournalEntry } from "@/types";
import AboutSection from "@/components/AboutSection";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/data/testimonials";
import JournalCard from "@/components/JournalCard";
import { mockJournalEntries } from "@/data/journal";
import ImpactSection from "@/components/ImpactSection";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      <section className="min-h-screen relative">
        <HeroSection />
      </section>

      {/* Enhanced Journal Section with Glass Effect */}
      <section id="journal" className="section-minimal relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white/30 to-orange-50/50"></div>
        <div className="relative z-10 w-full px-8 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <div className="glass-card-liquid max-w-4xl mx-auto">
              <h2 className="title-large text-gray-900 mb-4" data-aos="fade-up">
                Dokumentasi Terbaru
              </h2>
              <p
                className="text-xl text-gray-600 font-light"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Catatan perjalanan terbaru dalam mendokumentasikan dampak positif 
                industri kelapa sawit di berbagai wilayah Indonesia.
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
                  className="glass-card-liquid hover:scale-105 transition-transform duration-500"
                >
                  <JournalCard entry={entry} />
                </div>
              ))}
          </div>
          <div className="text-center mt-12" data-aos="fade-up">
            <div className="glass-card-minimal inline-block">
              <Link href="/journal" className="btn-primary">
                Lihat Semua Dokumentasi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonial Section with Glass Effect */}
      <section className="section-minimal relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/20 to-green-50/40"></div>
        <div className="relative z-10 w-full px-8 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <div className="glass-card-liquid max-w-4xl mx-auto">
              <h2 className="title-large text-gray-900 mb-4" data-aos="fade-up">
                Suara Dari Lapangan
              </h2>
              <p
                className="text-xl text-gray-600 font-light"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Testimoni langsung dari petani, kepala desa, dan stakeholder 
                industri kelapa sawit yang telah merasakan dampak positifnya.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial: Testimonial, index: number) => (
              <div
                key={testimonial.id}
                data-aos="fade-up"
                data-aos-delay={100 * index}
                className="glass-card-liquid hover:scale-105 transition-transform duration-500"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="relative">
        <ImpactSection />
      </section>

      <section className="min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 via-white/30 to-green-50/50"></div>
        <div className="relative z-10">
          <AboutSection />
        </div>
      </section>
    </div>
  );
}
