// src/components/DestinationCard.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Destination } from "@/types";
import OptimizedImage from "./OptimizedImage";
import { normalizeImagePath } from "@/utils/imageUtils";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const href = `/destinations/${destination.country._id}/${destination.province._id}/${destination.slug}`;

  // Prioritize banner image from form, fallback to cover image or first image
  const getBannerImage = () => {
    if (!mounted) return "/images/destinations/indo.jpg";

    // First priority: banner image from form
    if (destination.banner) {
      return normalizeImagePath(destination.banner);
    }

    // Second priority: cover image
    if (destination.coverImage) {
      return normalizeImagePath(destination.coverImage);
    }

    // Third priority: first image in gallery
    if (destination.images?.[0]) {
      return normalizeImagePath(destination.images[0]);
    }

    // Fallback
    return "/images/destinations/indo.jpg";
  };

  const bannerImage = getBannerImage();

  // Modern Minimalist Design with Glass Effect - Mobile Responsive
  return (
    <div className="group destination-card">
      <Link href={href}>
        <div className="relative h-64 sm:h-72 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
          {/* Banner Background */}
          <div className="absolute inset-0">
            <OptimizedImage
              src={bannerImage}
              alt={`${destination.village} Banner`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>

          {/* Glass Card Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="p-4 sm:p-6 bg-white/10 backdrop-blur-md border-t border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {/* Location Badge */}
              <div className="mb-3 sm:mb-4">
                <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-white bg-white/20 backdrop-blur-lg rounded-full border border-white/30 shadow-lg">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-1 sm:mr-2 animate-pulse"></span>
                  <span className="truncate">
                    {destination.province.name}, {destination.country.name}
                  </span>
                </span>
              </div>

              {/* Destination Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-emerald-300 transition-colors duration-300 drop-shadow-lg line-clamp-2">
                {destination.village}
              </h3>

              {/* Description Preview */}
              {destination.description && (
                <p className="text-white/80 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {destination.description.substring(0, 100)}...
                </p>
              )}

              {/* Action Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {/* Type Badge */}
                  <span className="px-2 py-1 text-xs font-medium text-white/90 bg-white/20 backdrop-blur-sm rounded-md border border-white/20 capitalize">
                    {destination.type}
                  </span>

                  {/* Impact Score */}
                  {destination.socialImpactScore && (
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400 text-sm">⭐</span>
                      <span className="text-white/80 text-xs font-medium">
                        {destination.socialImpactScore}/10
                      </span>
                    </div>
                  )}
                </div>

                {/* View Arrow */}
                <div className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30 group-hover:bg-emerald-500/30 group-hover:border-emerald-400/50 transition-all duration-300">
                  <span className="text-white text-sm transform group-hover:translate-x-0.5 transition-transform duration-300">
                    →
                  </span>
                </div>
              </div>

              {/* Progress Bar Animation */}
              <div className="mt-4 h-0.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              </div>
            </div>
          </div>

          {/* Corner Accent */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-400 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>

          {/* Featured indicator */}
          {destination.featured && (
            <div className="absolute top-4 left-4">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xs">★</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default DestinationCard;
