// src/app/destinations/page.tsx
"use client";
import CountryCard from "@/components/CountryCard";
import { mockCountries } from "@/data/countries";
import Image from "next/image";

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-brand-white pt-20">
      <div className="relative h-[40vh] flex items-center justify-center">
        <Image
          src="/hero-background.jpg"
          alt="Destinations Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Destinasi Perjalanan</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Jelajahi negara-negara yang telah dikunjungi.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCountries.map((country) => (
            <CountryCard key={country._id} country={country} />
          ))}
        </div>
      </div>
    </div>
  );
}
