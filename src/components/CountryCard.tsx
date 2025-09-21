// src/components/CountryCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Country } from "@/types";
import { motion } from "framer-motion";

interface CountryCardProps {
  country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <motion.div whileHover={{ y: -10 }} className="group">
      <Link href={`/destinations/${country.slug}`}>
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
          <Image
            src={country.imageUrl}
            alt={country.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-3xl font-bold text-white">{country.name}</h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CountryCard;
