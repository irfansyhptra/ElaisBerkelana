"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Village {
  id: string;
  name: string;
  description: string;
}

interface VillageSelectProps {
  villages: Village[];
  onVillageSelect: (village: Village) => void;
}

export default function VillageSelect({
  villages,
  onVillageSelect,
}: VillageSelectProps) {
  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);

  const handleVillageSelect = (village: Village) => {
    setSelectedVillage(village);
    onVillageSelect(village);
  };

  return (
    <div className="glass-card">
      <h2 className="text-xl font-semibold text-white mb-4">Select Village</h2>
      <div className="space-y-3">
        {villages.map((village) => (
          <motion.button
            key={village.id}
            onClick={() => handleVillageSelect(village)}
            className={`w-full p-4 rounded-lg transition-all duration-300 ${
              selectedVillage?.id === village.id
                ? "bg-primary text-white"
                : "glass hover:bg-white/10 text-white/80"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="text-lg font-medium mb-1">{village.name}</h3>
            <p className="text-sm opacity-80">{village.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
