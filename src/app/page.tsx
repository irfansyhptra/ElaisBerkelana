// src/app/page.tsx (Enhanced with Glassmorphism)
"use client";

import HeroSection from "@/components/HeroSection";
import { Testimonial, JournalEntry, Destination } from "@/types";
import AboutSection from "@/components/AboutSection";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/data/testimonials";
import JournalCard from "@/components/JournalCard";
import { mockJournalEntries } from "@/data/journal";
import ImpactSection from "@/components/ImpactSection";
import ModernDestinationCard from "@/components/ModernDestinationCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDestinations } from "@/lib/api";

export default function Home() {
  const [featuredDestinations, setFeaturedDestinations] = useState<
    Destination[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedDestinations = async () => {
      try {
        const destinations = await getDestinations({ featured: true });
        setFeaturedDestinations(destinations.slice(0, 3)); // Show only 3 featured destinations
      } catch (error) {
        console.error("Failed to load featured destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedDestinations();
  }, []);

  return (
    <div className="relative">
      <section className="min-h-screen relative">
        <HeroSection />
      </section>

      {/* Featured Destinations Section */}
      <section className="section-minimal relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white/30 to-blue-50/50"></div>
        <div className="relative z-10 w-full px-8 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <div className="glass-card-liquid max-w-4xl mx-auto">
              <h2 className="title-large text-gray-900 mb-4" data-aos="fade-up">
                Destinasi Unggulan
              </h2>
              <p
                className="text-xl text-gray-600 font-light"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Jelajahi destinasi-destinasi pilihan yang menampilkan dampak
                positif industri kelapa sawit terhadap pemberdayaan masyarakat
                lokal.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-600">Memuat destinasi unggulan...</p>
            </div>
          ) : featuredDestinations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {featuredDestinations.map(
                (destination: Destination, index: number) => (
                  <div
                    key={destination._id}
                    data-aos="fade-up"
                    data-aos-delay={100 * index}
                    className="glass-card-liquid hover:scale-105 transition-transform duration-500"
                  >
                    <ModernDestinationCard destination={destination} />
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Belum ada destinasi unggulan tersedia.
              </p>
            </div>
          )}

          <div className="text-center mt-12" data-aos="fade-up">
            <div className="glass-card-minimal inline-block">
              <Link href="/destinations" className="btn-primary">
                Lihat Semua Destinasi
              </Link>
            </div>
          </div>
        </div>
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
                Catatan perjalanan terbaru dalam mendokumentasikan dampak
                positif industri kelapa sawit di berbagai wilayah Indonesia.
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
