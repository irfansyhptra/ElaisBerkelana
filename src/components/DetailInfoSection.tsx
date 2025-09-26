// src/components/DetailInfoSection.tsx
"use client";
import { motion } from "framer-motion";
import { PalmOilDestination } from "@/types";

interface DetailInfoSectionProps {
  destination: PalmOilDestination;
}

const DetailInfoSection = ({ destination }: DetailInfoSectionProps) => {
  const infoItems = [
    {
      icon: "�",
      label: "Jenis Program",
      value:
        destination.type === "village"
          ? "Desa Binaan"
          : destination.type === "plantation"
          ? "Kebun Sawit"
          : destination.type === "mill"
          ? "Pabrik"
          : destination.type === "research"
          ? "Penelitian"
          : "Komunitas",
      color: "text-green-300",
    },
    {
      icon: "📊",
      label: "Skor Dampak Sosial",
      value: `${destination.socialImpactScore}/100`,
      color:
        destination.socialImpactScore >= 80
          ? "text-green-300"
          : destination.socialImpactScore >= 60
          ? "text-yellow-300"
          : "text-orange-300",
    },
    {
      icon: "⏱️",
      label: "Durasi Program",
      value: destination.programDuration || "Berkelanjutan",
      color: "text-blue-300",
    },
    {
      icon: "",
      label: "Koordinat",
      value: destination.coordinates
        ? `${destination.coordinates.latitude.toFixed(
            6
          )}, ${destination.coordinates.longitude.toFixed(6)}`
        : "Tidak tersedia",
      color: "text-purple-300",
    },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-2xl font-bold text-white mb-6">
        ℹ️ Informasi Detail
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {infoItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="glass-card-minimal p-4 text-center"
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <h4 className="font-semibold text-white/90 mb-1">{item.label}</h4>
            <p className={`${item.color} font-medium`}>{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Benefits and Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Key Benefits */}
        {destination.keyBenefits && destination.keyBenefits.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-green-300 mb-4 flex items-center gap-2">
              ✅ Manfaat Utama
            </h4>
            <ul className="space-y-2">
              {destination.keyBenefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                  <span className="text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Challenges */}
        {destination.challenges && destination.challenges.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-orange-300 mb-4 flex items-center gap-2">
              ⚠️ Tantangan
            </h4>
            <ul className="space-y-2">
              {destination.challenges.map(
                (challenge: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-white/90">{challenge}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Requirements */}
      {destination.requirements && destination.requirements.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-yellow-300 mb-4 flex items-center gap-2">
            📋 Persyaratan
          </h4>
          <ul className="space-y-2">
            {destination.requirements.map((requirement, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1 flex-shrink-0">•</span>
                <span className="text-white/90">{requirement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailInfoSection;
