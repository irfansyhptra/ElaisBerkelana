"use client";

// import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import YouTubePlayer from "@/components/YouTubePlayer";
import ImageGallery from "@/components/ImageGallery";
import { Destination } from "@/types";

// Mock data - replace with actual API call later
const mockDestination: Destination = {
  _id: "1",
  village: "Desa Gayo",
  province: "Aceh",
  description:
    "Sebuah desa yang kaya akan budaya dan tradisi kopi. Di sini, setiap sudut menyimpan cerita tentang kehidupan masyarakat yang harmonis dengan alam dan menjaga warisan leluhur mereka.",
  youtubeUrl: "https://www.youtube.com/watch?v=example1",
  coverImage: "/images/desa-gayo.jpg",
  imageGallery: [
    { url: "/images/gayo-1.jpg", caption: "Kebun Kopi" },
    { url: "/images/gayo-2.jpg", caption: "Upacara Tradisional" },
    { url: "/images/gayo-3.jpg", caption: "Kehidupan Sehari-hari" },
  ],
  timeline: [
    {
      date: "12 Sep 2025",
      title: "Hari Pertama",
      description:
        "Mengunjungi perkebunan kopi dan belajar tentang proses panen.",
    },
    {
      date: "13 Sep 2025",
      title: "Hari Kedua",
      description: "Mengikuti upacara adat dan mengenal budaya lokal.",
    },
    {
      date: "14 Sep 2025",
      title: "Hari Ketiga",
      description:
        "Belajar tentang proses pengolahan kopi dan tradisi minum kopi.",
    },
  ],
  highlights: [
    "Tradisi pembuatan kopi",
    "Upacara adat",
    "Keramahtamahan penduduk",
    "Pemandangan alam",
  ],
  createdAt: "2025-09-12",
};

export default function DestinationDetailPage() {
  // We'll use these variables when implementing API integration
  // const params = useParams();
  // State for the active image in the gallery
  const [, setActiveImageIndex] = useState(0);

  // In a real app, fetch destination data based on params.id
  const destination = mockDestination;

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
              {destination.province}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
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

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Timeline Perjalanan
              </h2>
              <div className="space-y-6">
                {destination.timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-primary/30"
                  >
                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary transform -translate-x-[3px]" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-1">{item.date}</p>
                    <p className="text-white/90">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Highlights</h2>
              <div className="grid grid-cols-2 gap-4">
                {destination.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass p-4 rounded-lg"
                  >
                    <p className="text-white/90">{highlight}</p>
                  </motion.div>
                ))}
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
              {/* Image Gallery */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Galeri Foto
                </h3>
                <ImageGallery
                  images={destination.imageGallery}
                  onImageClick={setActiveImageIndex}
                />
              </div>

              {/* YouTube Video */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Video Perjalanan
                </h3>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <YouTubePlayer videoUrl={destination.youtubeUrl} />
                </div>
              </div>

              {/* Additional Info */}
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-2">
                  Tanggal Kunjungan
                </h3>
                <p className="text-white/80">
                  {new Date(destination.createdAt).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
