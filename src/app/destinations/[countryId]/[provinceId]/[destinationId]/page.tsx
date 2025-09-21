// src/app/destinations/[countryId]/[provinceId]/[destinationId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { mockDestinations } from "@/data/destinations";
import ImageGallery from "@/components/ImageGallery";
import Timeline from "@/components/Timeline";
import SocialEmbed from "@/components/SocialEmbed";
import VisitorCounter from "@/components/VisitorCounter";
import { Destination } from "@/types"; // Path impor sudah benar

export default function DestinationDetailPage() {
  const params = useParams();
  const destinationSlug = params.destinationId as string;

  const destination: Destination | undefined = mockDestinations.find(
    (d) => d.slug === destinationSlug
  );

  if (!destination) {
    return <div className="pt-24 text-center">Destinasi tidak ditemukan</div>;
  }

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <Image
          src={destination.coverImage}
          alt={destination.village}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {destination.village}
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              {destination.province}, {destination.country}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="section-container relative">
        <div className="absolute top-4 right-4 z-20">
          <VisitorCounter />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Tentang Desa
              </h2>
              <p className="text-white/90 leading-relaxed">
                {destination.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
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
              <h2 className="text-3xl font-bold text-white mb-6">Highlights</h2>
              <div className="grid grid-cols-2 gap-4">
                {destination.highlights.map(
                  (highlight: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glass p-4 rounded-lg"
                    >
                      <p className="text-white/90">{highlight}</p>
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
              className="glass-card sticky top-24 space-y-6"
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
    </main>
  );
}
