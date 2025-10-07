// src/components/ImpactSection.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Leaf,
  TrendingUp,
  Heart,
  Building,
} from "lucide-react";

interface ImpactData {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
}

const impactData: ImpactData[] = [
  {
    icon: <Users size={32} />,
    title: "Pemberdayaan Petani",
    value: "15,000+",
    description:
      "Keluarga petani yang terdampak dari program kemitraan kelapa sawit",
    color: "text-green-600",
  },
  {
    icon: <GraduationCap size={32} />,
    title: "Akses Pendidikan",
    value: "250+",
    description:
      "Anak petani yang mendapat beasiswa pendidikan dari program CSR",
    color: "text-blue-600",
  },
  {
    icon: <Leaf size={32} />,
    title: "Teknologi Hijau",
    value: "85%",
    description:
      "Pengurangan limbah melalui inovasi pengolahan ramah lingkungan",
    color: "text-emerald-600",
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Peningkatan Ekonomi",
    value: "300%",
    description: "Rata-rata peningkatan pendapatan keluarga petani plasma",
    color: "text-orange-600",
  },
  {
    icon: <Heart size={32} />,
    title: "Fasilitas Kesehatan",
    value: "45+",
    description: "Klinik dan puskesmas yang dibangun di area perkebunan",
    color: "text-red-500",
  },
  {
    icon: <Building size={32} />,
    title: "Infrastruktur Desa",
    value: "120+",
    description: "Desa yang mendapat bantuan pembangunan infrastruktur",
    color: "text-purple-600",
  },
];

const ImpactSection = () => {
  return (
    <section className="section-minimal relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/70 via-white/50 to-orange-50/70"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full px-8 lg:px-16 xl:px-20">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="glass-card-liquid max-w-4xl mx-auto">
            <h2 className="title-large text-gray-900 mb-6" data-aos="fade-up">
              Dampak Nyata di Lapangan
            </h2>
            <p
              className="text-xl text-gray-600 font-light leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Melalui perjalanan berkelana, kami menemukan bukti konkret
              bagaimana industri kelapa sawit berkelanjutan memberikan dampak
              yang terukur bagi masyarakat Indonesia.
            </p>
          </div>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {impactData.map((impact, index) => (
            <motion.div
              key={impact.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass-card-liquid text-center hover:scale-105 transition-all duration-500 h-full">
                <div className={`${impact.color} mb-4 flex justify-center`}>
                  <div className="glass-card-minimal p-4 rounded-full">
                    {impact.icon}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {impact.title}
                </h3>

                <div className={`text-4xl font-bold ${impact.color} mb-4`}>
                  {impact.value}
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {impact.description}
                </p>

                {/* Hover decoration */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-400 to-orange-400 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-sm"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16" data-aos="fade-up">
          <div className="glass-card-liquid max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ingin Tahu Lebih Dalam?
            </h3>
            <p className="text-gray-600 mb-6">
              Ikuti perjalanan dokumentasi lengkap untuk melihat bagaimana
              kelapa sawit berkelanjutan mengubah kehidupan masyarakat
              Indonesia.
            </p>
            <Link href="/destinations">
              <button className="btn-primary text-lg px-10 py-4">
                Eksplorasi Selengkapnya
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
