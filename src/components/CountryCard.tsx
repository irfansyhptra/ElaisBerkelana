// src/components/CountryCard.tsx
import Link from "next/link";
import { Country } from "@/types";
import { motion } from "framer-motion";
import OptimizedImage from "./OptimizedImage";
import { normalizeImagePath } from "@/utils/imageUtils";

interface CountryCardProps {
  country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group"
    >
      <Link href={`/destinations/${country.slug}`}>
        <div className="relative aspect-[5/3] rounded-2xl overflow-hidden glass-card-minimal shadow-lg group-hover:shadow-2xl transition-all duration-500">
          <OptimizedImage
            src={normalizeImagePath(country.image?.url)}
            alt={country.name}
            fill
            className="group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 p-8">
            <div className="glass-card-minimal inline-block">
              <h3 className="title-medium text-white group-hover:text-white transition-colors">
                {country.name}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CountryCard;
