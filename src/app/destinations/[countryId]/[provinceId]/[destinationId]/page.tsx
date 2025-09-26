// src/app/destinations/[countryId]/[provinceId]/[destinationId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getDestinationBySlug } from "@/lib/api";
import ImageGallery from "@/components/ImageGallery";
import Timeline from "@/components/Timeline";
import SocialEmbed from "@/components/SocialEmbed";
import VisitorCounter from "@/components/VisitorCounter";
import FacilitiesSection from "@/components/FacilitiesSection";
import HighlightsSection from "@/components/HighlightsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DetailInfoSection from "@/components/DetailInfoSection";
import { Destination } from "@/types";

export default function DestinationDetailPage() {
  const params = useParams();
  const destinationSlug = params.destinationId as string;
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true);
        const data = await getDestinationBySlug(destinationSlug);
        setDestination(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat destinasi");
      } finally {
        setLoading(false);
      }
    };

    if (destinationSlug) {
      fetchDestination();
    }
  }, [destinationSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8">
        <div className="glass-card max-w-lg mx-auto">
          <p className="text-gray-600">Memuat destinasi...</p>
        </div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8">
        <div className="glass-card max-w-lg mx-auto">
          <p className="text-gray-600">
            {error || "Destinasi tidak ditemukan"}
          </p>
        </div>
      </div>
    );
  }

  // ... (sisa kode sama)
  return (
    <main className="min-h-screen relative">
      {/* Full page background image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={destination.images?.[0] || "/hero-background.png"}
          alt={destination.village}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content with glassmorphism */}
      <div className="relative z-10 pt-32 pb-16">
        <div className="w-full px-8 lg:px-16 xl:px-20">
          {/* Page title */}
          <div className="text-center mb-12">
            <div className="glass-card max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="title-large text-white mb-4">
                  {destination.village}
                </h1>
                <p className="text-xl text-white/90">
                  {destination.province.name}, {destination.country.name}
                </p>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card"
              >
                <h2 className="title-medium text-white mb-4">Tentang Desa</h2>
                <p className="text-white/90 leading-relaxed text-lg">
                  {destination.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card"
              >
                <h2 className="title-medium text-white mb-6">
                  Program Pemberdayaan
                </h2>
                <Timeline items={destination.programs || []} />
              </motion.div>

              {/* Detail Info Section */}
              <DetailInfoSection destination={destination} />

              {/* Benefits Section */}
              <HighlightsSection highlights={destination.keyBenefits} />

              {/* Resources Section */}
              <FacilitiesSection facilities={destination.resources} />

              {/* Social Media Section */}
              <SocialEmbed socialMedia={destination.socialMedia} />

              {/* Testimonials Section */}
              <TestimonialsSection testimonials={destination.testimonials} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card sticky top-32 space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Galeri Foto
                  </h3>
                  <ImageGallery
                    images={(destination.images || []).map((url, index) => ({
                      url,
                      caption: `${destination.village} - Foto ${index + 1}`,
                    }))}
                  />
                </div>
                <VisitorCounter />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
