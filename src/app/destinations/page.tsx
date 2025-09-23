// src/app/destinations/page.tsx
"use client";
import CountryCard from "@/components/CountryCard";
import { mockCountries } from "@/data/countries";
import Image from "next/image";

export default function DestinationsPage() {
  return (
    <div className="min-h-screen relative">
      {/* Full page background image */}
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

      {/* Content with glassmorphism */}
      <div className="relative z-10 pt-32 pb-16">
        <div className="w-full px-8 lg:px-16 xl:px-20">
          {/* Page title */}
          <div className="text-center mb-16">
            <div className="glass-card max-w-4xl mx-auto">
              <h1 className="title-large text-white mb-4">
                Destinasi Perjalanan
              </h1>
              <p className="text-xl text-white/90">
                Jelajahi negara-negara yang telah dikunjungi.
              </p>
            </div>
          </div>

          {/* Countries grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {mockCountries.map((country) => (
              <CountryCard key={country._id} country={country} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
