// src/app/destinations/[countryId]/page.tsx (Diperbaiki)
"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { mockProvinces } from "@/data/provinces";
import { mockDestinations } from "@/data/destinations";
import { mockCountries } from "@/data/countries";
import DestinationCard from "@/components/DestinationCard";
import Image from "next/image";
import { Country, Province, Destination } from "@/types"; // Impor tipe

export default function CountryDestinationsPage() {
  const params = useParams();
  const countrySlug = params.countryId as string;
  const [selectedProvince, setSelectedProvince] = useState("all");

  const currentCountry = useMemo(
    () => mockCountries.find((c: Country) => c.slug === countrySlug),
    [countrySlug]
  );

  const provincesInCountry = useMemo(() => {
    if (!currentCountry) return [];
    return mockProvinces.filter(
      (p: Province) => p.countryId === currentCountry._id
    );
  }, [currentCountry]);

  const filteredDestinations = useMemo(() => {
    if (!currentCountry) return [];
    return mockDestinations.filter(
      (d: Destination) =>
        d.countryId === currentCountry._id &&
        (selectedProvince === "all" || d.provinceId === selectedProvince)
    );
  }, [currentCountry, selectedProvince]);

  if (!currentCountry) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8">
        <div className="glass-card max-w-lg mx-auto">
          <p className="text-gray-600">Negara tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Full page background image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/hero-background.png"
          alt="Country Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Content with glassmorphism */}
      <div className="relative z-10 pt-32 pb-16">
        <div className="w-full px-8 lg:px-16 xl:px-20">
          {/* Page title */}
          <div className="text-center mb-12">
            <div className="glass-card max-w-4xl mx-auto">
              <h1 className="title-large text-white">
                Destinasi di {currentCountry.name}
              </h1>
            </div>
          </div>

          {/* Province filter */}
          <div className="mb-8 flex justify-center">
            <div className="glass-card-minimal">
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="p-3 rounded-lg bg-transparent text-white border border-white/30 min-w-[200px] focus:outline-none focus:border-white/50"
              >
                <option value="all" className="bg-gray-800">
                  Semua Provinsi
                </option>
                {provincesInCountry.map((province: Province) => (
                  <option
                    key={province._id}
                    value={province._id}
                    className="bg-gray-800"
                  >
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Destinations grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredDestinations.map((destination: Destination) => (
                <DestinationCard
                  key={destination._id}
                  destination={destination}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="glass-card max-w-lg mx-auto">
                <p className="text-white/80">
                  Belum ada destinasi untuk provinsi ini.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
