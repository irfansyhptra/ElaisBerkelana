// src/components/DestinationCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Destination } from "@/types";
import { motion } from "framer-motion";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  // Buat URL berdasarkan slug, bukan ID
  const href = `/destinations/${destination.countryId}/${destination.provinceId}/${destination.slug}`;

  return (
    <motion.div whileHover={{ y: -10 }} className="group">
      <Link href={href}>
        <div className="glass-card overflow-hidden text-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="relative aspect-video">
            <Image
              src={destination.coverImage}
              alt={destination.village}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{destination.village}</h3>
            <p className="text-white/80">{`${destination.province}, ${destination.country}`}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;
