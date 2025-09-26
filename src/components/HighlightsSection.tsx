// src/components/HighlightsSection.tsx
"use client";
import { motion } from "framer-motion";

interface HighlightsSectionProps {
  highlights?: string[];
}

const HighlightsSection = ({ highlights }: HighlightsSectionProps) => {
  if (!highlights || highlights.length === 0) return null;

  const highlightIcons = ["🌟", "⭐", "✨", "🎯", "🏆", "💎", "🔥", "🎊"];

  return (
    <div className="glass-card p-6">
      <h3 className="text-2xl font-bold text-white mb-6">
        🌟 Highlight Perjalanan
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {highlights.map((highlight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-start gap-3 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20"
          >
            <span className="text-2xl flex-shrink-0">
              {highlightIcons[index % highlightIcons.length]}
            </span>
            <p className="text-white/90 font-medium">{highlight}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HighlightsSection;
