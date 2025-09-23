// src/components/DestinationCard.tsx
"use client";

import Link from "next/link";
import { Destination } from "@/types";
import { motion } from "framer-motion";
import OptimizedImage from "./OptimizedImage";
import { normalizeImagePath } from "@/utils/imageUtils";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  // Buat URL berdasarkan slug, bukan ID
  const href = `/destinations/${destination.countryId}/${destination.provinceId}/${destination.slug}`;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group"
    >
      <Link href={href}>
        <div className="glass-card-minimal overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:bg-white/80">
          <div className="relative aspect-[4/3] overflow-hidden">
            <OptimizedImage
              src={normalizeImagePath(destination.coverImage)}
              alt={destination.village}
              fill
              className="group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="p-6">
            <h3 className="title-medium text-gray-900 mb-2 group-hover:text-black transition-colors">
              {destination.village}
            </h3>
            <p className="text-gray-600 font-light">
              {`${destination.province}, ${destination.country}`}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;
