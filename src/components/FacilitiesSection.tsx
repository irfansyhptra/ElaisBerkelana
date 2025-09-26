// src/components/FacilitiesSection.tsx
"use client";
import { motion } from "framer-motion";
import { PalmOilResources } from "@/types";

interface FacilitiesSectionProps {
  facilities?: PalmOilResources;
}

const FacilitiesSection = ({ facilities }: FacilitiesSectionProps) => {
  if (!facilities) return null;

  const facilityIcons: Record<string, string> = {
    equipment: "🛠️",
    training: "�‍🏫",
    research: "🔬",
    certification: "📜",
    documentation: "�",
    community: "🤝",
    education: "🎓",
    sustainability: "🌱",
    monitoring: "�",
    development: "�️",
    other: "⚡",
  };

  const facilityCategories = [
    {
      key: "equipment",
      label: "Peralatan & Fasilitas",
      items: facilities.equipment,
    },
    {
      key: "training",
      label: "Pelatihan & Pembelajaran",
      items: facilities.training,
    },
    { key: "research", label: "Penelitian", items: facilities.research },
    {
      key: "certification",
      label: "Sertifikasi",
      items: facilities.certification,
    },
    {
      key: "documentation",
      label: "Dokumentasi",
      items: facilities.documentation,
    },
    {
      key: "community",
      label: "Pemberdayaan Masyarakat",
      items: facilities.community,
    },
    { key: "education", label: "Pendidikan", items: facilities.education },
    {
      key: "sustainability",
      label: "Keberlanjutan",
      items: facilities.sustainability,
    },
    { key: "monitoring", label: "Monitoring", items: facilities.monitoring },
    {
      key: "development",
      label: "Pengembangan",
      items: facilities.development,
    },
    { key: "other", label: "Lainnya", items: facilities.other },
  ].filter((category) => category.items && category.items.length > 0);

  if (facilityCategories.length === 0) return null;

  return (
    <div className="glass-card p-6">
      <h3 className="text-2xl font-bold text-white mb-6">
        🏢 Fasilitas & Layanan
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {facilityCategories.map((category, index) => (
          <motion.div
            key={category.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card-minimal p-4 h-full"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">
                {facilityIcons[category.key] || "🔧"}
              </span>
              <h4 className="font-semibold text-white">{category.label}</h4>
            </div>

            <ul className="space-y-2">
              {category.items?.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="flex items-start gap-2 text-sm">
                  <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FacilitiesSection;
