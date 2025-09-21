// src/app/destinations/[countryId]/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { mockProvinces } from "@/data/provinces";
import { mockDestinations } from "@/data/destinations";
import { mockCountries } from "@/data/countries";
import DestinationCard from "@/components/DestinationCard"; // Impor ini sekarang akan berhasil

export default function CountryDestinationsPage() {
  const params = useParams();
  const countrySlug = params.countryId as string;
  const [selectedProvince, setSelectedProvince] = useState("all");

  const currentCountry = useMemo(
    () => mockCountries.find((c) => c.slug === countrySlug),
    [countrySlug]
  );

  const provincesInCountry = useMemo(() => {
    if (!currentCountry) return [];
    return mockProvinces.filter((p) => p.countryId === currentCountry._id);
  }, [currentCountry]);

  const filteredDestinations = useMemo(() => {
    if (!currentCountry) return [];
    return mockDestinations.filter(
      (d) =>
        d.countryId === currentCountry._id &&
        (selectedProvince === "all" || d.provinceId === selectedProvince)
    );
  }, [currentCountry, selectedProvince]);

  if (!currentCountry) {
    return <div className="pt-24 text-center">Negara tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-brand-white pt-20">
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold">
          Destinasi di {currentCountry.name}
        </h1>
      </div>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="p-3 rounded-lg glass text-white bg-black/20 border border-white/20"
          >
            <option value="all">Semua Provinsi</option>
            {provincesInCountry.map((province) => (
              <option key={province._id} value={province._id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">
              Belum ada destinasi untuk provinsi ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
