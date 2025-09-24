// src/app/destinations/[countryId]/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { getProvincesByCountry, getDestinations } from "@/lib/api";
import DestinationCard from "@/components/DestinationCard";
import Image from "next/image";
import { Province, Destination, Country } from "@/types";
import { getCountries } from "@/lib/api";

export default function CountryDestinationsPage() {
  const params = useParams();
  const countrySlug = params.countryId as string;

  const [countries, setCountries] = useState<Country[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [loading, setLoading] = useState(true);

  const currentCountry = useMemo(
    () => countries.find((c) => c.slug === countrySlug),
    [countries, countrySlug]
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const countryData = await getCountries();
        setCountries(countryData);
        const country = countryData.find((c) => c.slug === countrySlug);

        if (country) {
          const provinceData = await getProvincesByCountry(country._id);
          setProvinces(provinceData);
          const destinationData = await getDestinations({
            provinceSlug: "all",
          }); // Load all for the country initially
          setDestinations(destinationData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [countrySlug]);

  const filteredDestinations = useMemo(() => {
    if (selectedProvince === "all") return destinations;
    return destinations.filter((d) => d.province.slug === selectedProvince);
  }, [destinations, selectedProvince]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

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

      <div className="relative z-10 pt-32 pb-16">
        <div className="w-full px-8 lg:px-16 xl:px-20">
          <div className="text-center mb-12">
            <div className="glass-card max-w-4xl mx-auto">
              <h1 className="title-large text-white">
                Destinasi di {currentCountry.name}
              </h1>
            </div>
          </div>

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
                {provinces.map((province: Province) => (
                  <option
                    key={province._id}
                    value={province.slug}
                    className="bg-gray-800"
                  >
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
