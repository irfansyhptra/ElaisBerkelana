// src/components/JournalCard.tsx
import { JournalEntry } from "@/types";
import OptimizedImage from "./OptimizedImage";
import { motion } from "framer-motion";

interface JournalCardProps {
  entry: JournalEntry;
}

const JournalCard = ({ entry }: JournalCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group h-full"
    >
      {/* Enhanced Glass Card */}
      <div className="glass-card-liquid h-full flex flex-col overflow-hidden">
        {/* Image Container with Glass Overlay */}
        <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
          <OptimizedImage
            src={entry.imageUrl}
            alt={entry.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Glass overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Floating category badge */}
          <div className="absolute top-4 right-4 glass-card-minimal px-3 py-1 text-xs font-medium text-gray-700">
            {entry.category}
          </div>
        </div>

        <div className="flex flex-col flex-grow p-2">
          {/* Date with glass effect */}
          <div className="glass-card-minimal inline-block px-3 py-1 mb-4 text-xs text-gray-500 self-start">
            {entry.date}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex-grow group-hover:text-green-700 transition-colors duration-300">
            {entry.title}
          </h3>

          <div className="glass-card-minimal p-4">
            <p className="text-gray-600 text-sm leading-relaxed">
              {entry.excerpt}
            </p>
          </div>
        </div>

        {/* Hover decoration */}
        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-orange-400 to-green-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-sm"></div>
      </div>
    </motion.div>
  );
};

export default JournalCard;
