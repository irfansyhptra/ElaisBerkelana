// src/app/journal/page.tsx
"use client";

import Image from "next/image";
import MarqueeSection from "@/components/MarqueeSection";
import { useGalleryImages } from "@/hooks/useGalleryImages";
import {
  Loader2,
  Image as ImageIcon,
  Calendar,
  MapPin,
  RefreshCw,
} from "lucide-react";

export default function JournalPage() {
  const {
    images: allImages,
    loading,
    error,
    refresh,
    lastUpdated,
  } = useGalleryImages(30000);

  // Split images into chunks of 10
  const chunkedImages = [];
  for (let i = 0; i < allImages.length; i += 10) {
    chunkedImages.push(allImages.slice(i, i + 10));
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/hero-background.png"
          alt="Documentation Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-16 px-8">
          <div className="glass-card max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ImageIcon className="w-8 h-8 text-emerald-400" />
              <h1 className="title-large text-white">Dokumentasi Visual</h1>
            </div>
            <p className="text-xl text-white/90 mb-6">
              Koleksi lengkap foto dari semua destinasi sawit berkelanjutan yang
              telah didokumentasikan
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 text-white/80 flex-wrap">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-emerald-400" />
                <span>{loading ? "..." : allImages.length} Foto</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>
                  {loading
                    ? "..."
                    : new Set(allImages.map((img) => img.destinationId))
                        .size}{" "}
                  Destinasi
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span>
                  {lastUpdated
                    ? `Update: ${lastUpdated.toLocaleTimeString("id-ID")}`
                    : "Real-time Update"}
                </span>
              </div>
              <button
                onClick={refresh}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-all duration-300 disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                <span className="text-sm">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="glass-card flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
              <span className="text-white text-lg">Memuat dokumentasi...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="glass-card border-red-500/30 bg-red-500/10">
              <div className="text-center text-red-400">
                <div className="text-4xl mb-4">⚠️</div>
                <p className="text-lg mb-2">Gagal memuat gambar</p>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Documentation Sections */}
        {!loading && !error && allImages.length > 0 && (
          <div className="space-y-16 marquee-container">
            {chunkedImages.map((imageChunk, sectionIndex) => (
              <div key={sectionIndex} className="relative">
                {/* Section Header */}
                <div className="text-center mb-8 px-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <span className="text-white font-medium">
                      Koleksi {sectionIndex + 1}
                    </span>
                    <span className="text-white/60">
                      ({imageChunk.length} foto)
                    </span>
                  </div>
                </div>

                {/* Marquee Animation */}
                <MarqueeSection
                  images={imageChunk}
                  direction={sectionIndex % 2 === 0 ? "left" : "right"}
                  speed={25 + sectionIndex * 5}
                  className="py-8"
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && allImages.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="glass-card text-center">
              <div className="text-6xl mb-6">📷</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Belum Ada Dokumentasi
              </h3>
              <p className="text-white/70 mb-6">
                Dokumentasi visual akan muncul di sini setelah gambar destinasi
                diupload melalui admin panel.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-400/30">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Auto-refresh setiap 30 detik</span>
              </div>
            </div>
          </div>
        )}

        {/* Real-time Update Indicator */}
        {!loading && allImages.length > 0 && (
          <div className="fixed bottom-6 right-6 z-20">
            <div className="glass-card border-emerald-500/30 bg-emerald-500/10">
              <div className="flex items-center gap-2 text-emerald-300">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Live Update</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
