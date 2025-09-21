// src/components/Timeline.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TimelineItem } from "@/types";
import Image from "next/image";

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="glassmorphism p-4 rounded-lg">
          <button
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            className="w-full text-left flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <span className="text-primary font-bold">{item.time}</span>
              <h4 className="font-semibold text-white">{item.activity}</h4>
            </div>
            <motion.div animate={{ rotate: activeIndex === index ? 180 : 0 }}>
              {/* Ganti dengan ikon panah jika ada */}
              <span className="text-white">▼</span>
            </motion.div>
          </button>
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pl-12">
                  <p className="text-white/80">{item.notes}</p>
                  {item.imageUrl && (
                    <div className="relative aspect-video rounded-md overflow-hidden mt-4">
                      <Image
                        src={item.imageUrl}
                        alt={item.activity}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
