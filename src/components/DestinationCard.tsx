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
  const href = `/destinations/${destination.country._id}/${destination.province._id}/${destination.slug}`;

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 300,
      }}
      className="group"
    >
      <Link href={href}>
        <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform-gpu">
          {/* Background Image dengan Banner Effect */}
          <div className="absolute inset-0">
            <OptimizedImage
              src="/images/destinations/indo.jpg"
              alt="Banner Background"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay gradien untuk efek modern */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>

          {/* Destination Image sebagai accent */}
          <div className="absolute top-4 right-4 w-16 h-16 rounded-xl overflow-hidden border-2 border-white/30 shadow-lg group-hover:scale-110 transition-transform duration-500">
            <OptimizedImage
              src={normalizeImagePath(destination.coverImage)}
              alt={destination.village}
              fill
              className="object-cover"
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/40 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-6 left-6 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            {/* Location tag */}
            <div className="mb-3">
              <span className="inline-block px-3 py-1 text-xs font-medium text-white/90 bg-white/20 backdrop-blur-sm rounded-full border border-white/20">
                {destination.province.name}, {destination.country.name}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors duration-300 drop-shadow-lg">
              {destination.village}
            </h3>

            {/* Bottom decorative line */}
            <div className="w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500 -z-10"></div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;
