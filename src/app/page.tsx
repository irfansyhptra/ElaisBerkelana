// src/app/page.tsx (Enhanced with Dynamic Data & Modern UI)
"use client";

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ImpactSection from "@/components/ImpactSection";
import ModernDestinationCard from "@/components/ModernDestinationCard";
import DestinationCard from "@/components/DestinationCard";
import ModernButton from "@/components/ModernButton";
import YouTubeSection from "@/components/YouTubeSection";
import { useHomepageData } from "@/hooks/useHomepageData";
import { useTranslation } from "@/hooks/useTranslation";
import { RefreshCw, Loader2, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getDestinations } from "@/lib/api";
import { Destination } from "@/types";

export default function Home() {
  const { featuredDestinations, youtubeVideos, loading, error, refreshData } =
    useHomepageData();
  const { t } = useTranslation();

  // State for latest documentation (from backend destinations)
  const [latestDocumentations, setLatestDocumentations] = useState<
    Destination[]
  >([]);
  const [docsLoading, setDocsLoading] = useState(true);
  const [docsError, setDocsError] = useState<string | null>(null);

  // Fetch latest destinations for documentation section
  useEffect(() => {
    const fetchLatestDocs = async () => {
      try {
        setDocsLoading(true);
        const destinations = await getDestinations({});
        // Sort by createdAt (newest first) and take 3
        const latest = destinations
          .sort((a, b) => {
            const dateA = new Date(a.createdAt || "1970-01-01").getTime();
            const dateB = new Date(b.createdAt || "1970-01-01").getTime();
            return dateB - dateA;
          })
          .slice(0, 3);
        setLatestDocumentations(latest);
      } catch (err) {
        setDocsError("Gagal memuat dokumentasi terbaru");
        console.error(err);
      } finally {
        setDocsLoading(false);
      }
    };

    fetchLatestDocs();
  }, []);

  return (
    <div className="relative">
      <section className="min-h-screen relative">
        <HeroSection />
      </section>

      {/* Featured Destinations Section */}
      <section className="section-minimal relative mobile-safe-area">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white/30 to-blue-50/50"></div>
        <div className="responsive-container relative z-10">
          <div className="text-center responsive-margin">
            <div className="glass-card-liquid max-w-4xl mx-auto">
              <h2
                className="responsive-text-xl font-bold text-gray-900 mb-4"
                data-aos="fade-up"
              >
                {t("home.featuredPrograms.title")}
              </h2>
              <p
                className="responsive-text-base text-gray-600 font-light"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {t("home.featuredPrograms.description")}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="glass-card flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                <span className="text-gray-700 text-lg">
                  Memuat program unggulan...
                </span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="glass-card border-red-500/30 bg-red-500/10">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                <p className="text-red-700 mb-4">{error}</p>
                <ModernButton
                  onClick={refreshData}
                  variant="outline"
                  size="sm"
                  icon="none"
                >
                  <RefreshCw className="w-4 h-4" />
                  Coba Lagi
                </ModernButton>
              </div>
            </div>
          ) : featuredDestinations.length > 0 ? (
            <div className="responsive-grid">
              {featuredDestinations.map((destination, index) => (
                <div
                  key={destination._id}
                  data-aos="fade-up"
                  data-aos-delay={100 * index}
                  className="glass-card-liquid hover:scale-105 transition-transform duration-500"
                >
                  <ModernDestinationCard destination={destination} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="glass-card">
                <p className="text-gray-600 mb-4">{t("empty.noPrograms")}</p>
                <ModernButton
                  onClick={refreshData}
                  variant="glass"
                  size="sm"
                  icon="none"
                >
                  <RefreshCw className="w-4 h-4" />
                  {t("common.refreshData")}
                </ModernButton>
              </div>
            </div>
          )}

          <div className="text-center mt-12" data-aos="fade-up">
            <ModernButton
              href="/destinations"
              variant="primary"
              size="lg"
              className="shadow-2xl hover:shadow-green-500/30"
            >
              {t("home.featuredPrograms.cta")}
            </ModernButton>
          </div>
        </div>
      </section>

      {/* Enhanced Journal Section with Glass Effect - Using Backend Data */}
      <section
        id="journal"
        className="section-minimal relative mobile-safe-area"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white/30 to-orange-50/50"></div>
        <div className="responsive-container relative z-10">
          <div className="text-center mb-16">
            <div className="glass-card-liquid max-w-4xl mx-auto">
              <h2 className="title-large text-gray-900 mb-4" data-aos="fade-up">
                {t("home.latestDocumentation.title")}
              </h2>
              <p
                className="text-xl text-gray-600 font-light"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {t("home.latestDocumentation.description")}
              </p>
            </div>
          </div>

          {docsLoading ? (
            <div className="text-center py-12">
              <div className="glass-card flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                <span className="text-gray-700 text-lg">
                  Memuat dokumentasi terbaru...
                </span>
              </div>
            </div>
          ) : docsError ? (
            <div className="text-center py-12">
              <div className="glass-card border-red-500/30 bg-red-500/10">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                <p className="text-red-700 mb-4">{docsError}</p>
                <ModernButton
                  onClick={() => window.location.reload()}
                  variant="outline"
                  size="sm"
                  icon="none"
                >
                  <RefreshCw className="w-4 h-4" />
                  Coba Lagi
                </ModernButton>
              </div>
            </div>
          ) : latestDocumentations.length > 0 ? (
            <div className="responsive-grid">
              {latestDocumentations.map((destination, index) => (
                <div
                  key={destination._id}
                  data-aos="fade-up"
                  data-aos-delay={100 * index}
                  className="glass-card-liquid hover:scale-105 transition-transform duration-500"
                >
                  <DestinationCard destination={destination} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="glass-card">
                <p className="text-gray-600 mb-4">
                  Belum ada dokumentasi tersedia
                </p>
                <ModernButton
                  onClick={() => window.location.reload()}
                  variant="glass"
                  size="sm"
                  icon="none"
                >
                  <RefreshCw className="w-4 h-4" />
                  Muat Ulang
                </ModernButton>
              </div>
            </div>
          )}

          <div className="text-center mt-12" data-aos="fade-up">
            <ModernButton
              href="/destinations"
              variant="secondary"
              size="lg"
              className="shadow-2xl hover:shadow-blue-500/30"
            >
              {t("home.latestDocumentation.cta")}
            </ModernButton>
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="section-minimal relative mobile-safe-area">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-white/20 to-orange-50/40"></div>
        <div className="responsive-container relative z-10">
          <div className="text-center mb-16">
            <div className="glass-card-liquid max-w-4xl mx-auto">
              <h2 className="title-large text-gray-900 mb-4" data-aos="fade-up">
                {t("home.videoDocumentation.title")}
              </h2>
              <p
                className="text-xl text-gray-600 font-light"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {t("home.videoDocumentation.description")}
              </p>
            </div>
          </div>

          {/* YouTube Section Component */}
          <YouTubeSection className="py-8" />

          {youtubeVideos.length > 6 && (
            <div className="text-center mt-12" data-aos="fade-up">
              <ModernButton
                href="/journal"
                variant="outline"
                size="lg"
                icon="external"
                className="shadow-lg hover:shadow-red-500/20"
              >
                Lihat Semua Video
              </ModernButton>
            </div>
          )}
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
