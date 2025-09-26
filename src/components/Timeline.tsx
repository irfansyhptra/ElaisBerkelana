// src/components/Timeline.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Itinerary } from "@/types";
import Image from "next/image";

interface TimelineProps {
  items: Itinerary[];
}

const Timeline = ({ items }: TimelineProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  if (!items || items.length === 0) {
    return (
      <div className="glass-card-minimal p-6 text-center">
        <p className="text-white/70">Belum ada itinerary tersedia</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative"
        >
          {/* Timeline connector */}
          {index < items.length - 1 && (
            <div className="absolute left-8 top-16 w-0.5 h-full bg-gradient-to-b from-blue-400 to-transparent z-0" />
          )}

          <div className="glass-card relative z-10">
            <button
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              className="w-full text-left flex items-start gap-4 p-0"
            >
              {/* Day badge */}
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{item.day}</span>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Hari {item.day}: {item.title || "Aktivitas Harian"}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.activities.map((activity, actIndex) => (
                    <span
                      key={actIndex}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90"
                    >
                      {activity}
                    </span>
                  ))}
                </div>

                {/* Benefits preview */}
                {item.benefits && item.benefits.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.benefits
                      .slice(0, 3)
                      .map((benefit: string, bIndex: number) => (
                        <span
                          key={bIndex}
                          className="px-2 py-1 bg-green-500/20 text-green-200 text-xs rounded"
                        >
                          🌱 {benefit}
                        </span>
                      ))}
                    {item.benefits.length > 3 && (
                      <span className="text-green-200/70 text-xs">
                        +{item.benefits.length - 3} lainnya
                      </span>
                    )}
                  </div>
                )}
              </div>

              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                className="flex-shrink-0 mt-2"
              >
                <span className="text-white text-2xl">⌄</span>
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
                  <div className="pt-6 pl-20 space-y-6">
                    {/* Detailed Activities */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        📋 Aktivitas Detail
                      </h4>
                      <ul className="space-y-2">
                        {item.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-start gap-3">
                            <span className="text-blue-400 mt-2">•</span>
                            <span className="text-white/90">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Social & Economic Impact */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {item.socialImpact && (
                        <div className="glass-card-minimal p-4">
                          <h5 className="text-blue-300 font-medium mb-2">
                            👥 Dampak Sosial
                          </h5>
                          <p className="text-white/80 text-sm">
                            {item.socialImpact}
                          </p>
                        </div>
                      )}
                      {item.economicImpact && (
                        <div className="glass-card-minimal p-4">
                          <h5 className="text-green-300 font-medium mb-2">
                            💰 Dampak Ekonomi
                          </h5>
                          <p className="text-white/80 text-sm">
                            {item.economicImpact}
                          </p>
                        </div>
                      )}
                      {item.environmentalImpact && (
                        <div className="glass-card-minimal p-4">
                          <h5 className="text-emerald-300 font-medium mb-2">
                            🌱 Dampak Lingkungan
                          </h5>
                          <p className="text-white/80 text-sm">
                            {item.environmentalImpact}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Images */}
                    {item.images && item.images.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">
                          📸 Dokumentasi Hari {item.day}
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {item.images.map((image, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                            >
                              <Image
                                src={image}
                                alt={`Dokumentasi hari ${item.day} - ${
                                  imgIndex + 1
                                }`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Videos */}
                    {item.videos && item.videos.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">
                          🎥 Video Dokumentasi
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {item.videos.map((video, vidIndex) => (
                            <div
                              key={vidIndex}
                              className="relative aspect-video rounded-lg overflow-hidden"
                            >
                              <iframe
                                src={video}
                                className="w-full h-full"
                                frameBorder="0"
                                allowFullScreen
                                title={`Video hari ${item.day} - ${
                                  vidIndex + 1
                                }`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {item.notes && (
                      <div className="glass-card-minimal p-4">
                        <h5 className="text-amber-300 font-medium mb-2">
                          📝 Catatan
                        </h5>
                        <p className="text-white/80">{item.notes}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
