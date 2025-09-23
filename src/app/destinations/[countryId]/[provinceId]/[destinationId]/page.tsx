// src/app/destinations/[countryId]/[provinceId]/[destinationId]/page.tsx (Diperbaiki)
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { mockDestinations } from "@/data/destinations";
import ImageGallery from "@/components/ImageGallery";
import Timeline from "@/components/Timeline";
import SocialEmbed from "@/components/SocialEmbed";
import VisitorCounter from "@/components/VisitorCounter";
import { Destination } from "@/types";

export default function DestinationDetailPage() {
  const params = useParams();
  const destinationSlug = params.destinationId as string;

  const destination: Destination | undefined = mockDestinations.find(
    (d: Destination) => d.slug === destinationSlug
  );

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8">
        <div className="glass-card max-w-lg mx-auto">
          <p className="text-gray-600">Destinasi tidak ditemukan</p>
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
          src={destination.coverImage}
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
                  {destination.province}, {destination.country}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Visitor counter */}
          <div className="fixed top-32 right-6 z-20">
            <div className="glass-card-minimal">
              <VisitorCounter />
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
                  Timeline Perjalanan
                </h2>
                <Timeline items={destination.timeline} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-card"
              >
                <h2 className="title-medium text-white mb-6">Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.highlights.map(
                    (highlight: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="glass-card-minimal"
                      >
                        <p className="text-white/90 font-medium">{highlight}</p>
                      </motion.div>
                    )
                  )}
                </div>
              </motion.div>
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
                  <ImageGallery images={destination.imageGallery} />
                </div>
                <SocialEmbed
                  youtubeUrl={destination.youtubeUrl}
                  instagramUrl={destination.instagramUrl}
                  tiktokUrl={destination.tiktokUrl}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
