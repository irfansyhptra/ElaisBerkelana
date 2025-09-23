// src/app/contact/page.tsx (Diperbaiki)
"use client";

import ContactForm from "@/components/ContactForm";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <Image
          src="/hero-background.png"
          alt="Contact Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 pt-32 pb-16 flex items-center justify-center">
        <div className="w-full max-w-4xl px-8">
          <div className="glass-card p-8 md:p-12">
            <div className="text-center mb-12">
              <h1 className="title-large text-white mb-4">Hubungi Saya</h1>
              <p className="text-xl text-white/90">
                Punya pertanyaan, ide kolaborasi, atau sekadar ingin menyapa?
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
