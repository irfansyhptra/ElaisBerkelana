// src/app/journal/page.tsx (Diperbaiki)
"use client";

import JournalCard from "@/components/JournalCard";
import { mockJournalEntries } from "@/data/journal";
import Image from "next/image";
import { JournalEntry } from "@/types"; // Impor tipe JournalEntry

export default function JournalPage() {
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <Image
          src="/hero-background1.jpg"
          alt="Journal Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 pt-32 pb-16">
        <div className="w-full px-8 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <div className="glass-card max-w-4xl mx-auto">
              <h1 className="title-large text-white mb-4">Jurnal Perjalanan</h1>
              <p className="text-xl text-white/90">
                Kumpulan cerita, kegiatan, dan proyek yang telah saya
                dokumentasikan.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {mockJournalEntries.map((entry: JournalEntry, index: number) => (
              <div
                key={entry.id}
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <JournalCard entry={entry} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
