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
      whileHover={{ y: -8 }}
      className="glass-card-minimal h-full flex flex-col"
    >
      <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
        <OptimizedImage
          src={entry.imageUrl}
          alt={entry.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <p className="text-sm text-gray-500 mb-2">
          {entry.date} • {entry.category}
        </p>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex-grow">
          {entry.title}
        </h3>
        <p className="text-gray-600 text-sm">{entry.excerpt}</p>
      </div>
    </motion.div>
  );
};

export default JournalCard;
