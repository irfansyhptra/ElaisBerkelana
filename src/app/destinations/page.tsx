// src/app/destinations/page.tsx
"use client";
import CountryCard from "@/components/CountryCard";
import ModernDestinationCard from "@/components/ModernDestinationCard";
import { useEffect, useState } from "react";
import { Country, PalmOilDestination } from "@/types";
import { getCountries, getDestinations } from "@/lib/api";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";

export default function DestinationsPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [destinations, setDestinations] = useState<PalmOilDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDestinations, setShowDestinations] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [countriesData, destinationsData] = await Promise.all([
          getCountries(),
          getDestinations(),
        ]);
        setCountries(countriesData);
        setDestinations(destinationsData);

        // Debug log untuk check coverImage
        console.log(
          "Destinations data:",
          destinationsData.map((d) => ({
            title: d.title,
            coverImage: d.coverImage,
            hasCoverImage: !!d.coverImage,
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {t("common.loading")}
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <Image
          src="/hero-background.png"
          alt="Destinations Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative z-10 pt-32 pb-16">
        <div className="w-full px-8 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <div className="glass-card max-w-4xl mx-auto">
              <h1 className="title-large text-white mb-4">
                {t("destinations.title")}
              </h1>
              <p className="text-xl text-white/90">
                {t("destinations.description")}
              </p>

              {/* Toggle buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setShowDestinations(true)}
                  className={`px-6 py-2 rounded-md transition-colors ${
                    showDestinations
                      ? "bg-green-600 text-white"
                      : "bg-white/20 text-white/80 hover:bg-white/30"
                  }`}
                >
                  {t("common.all")} {t("nav.destinations")}
                </button>
                <button
                  onClick={() => setShowDestinations(false)}
                  className={`px-6 py-2 rounded-md transition-colors ${
                    !showDestinations
                      ? "bg-green-600 text-white"
                      : "bg-white/20 text-white/80 hover:bg-white/30"
                  }`}
                >
                  Pilih Negara
                </button>
              </div>
            </div>
          </div>

          {showDestinations ? (
            <div>
              <div className="mb-8 text-center">
                <p className="text-white/80">
                  {t("admin.showingPrograms", { count: destinations.length })}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {destinations.map((destination: PalmOilDestination) => (
                  <ModernDestinationCard
                    key={destination._id}
                    destination={destination}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {countries.map((country: Country) => (
                <CountryCard key={country._id} country={country} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
