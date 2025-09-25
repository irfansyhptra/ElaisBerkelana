// src/components/FixedDestinationCard.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Destination } from "@/types";
import OptimizedImage from "./OptimizedImage";
import { normalizeImagePath } from "@/utils/imageUtils";
import {
  getCountryBackgroundImage,
  getCountryGradientOverlay,
  getCountryAccentColor,
} from "@/utils/backgroundUtils";

interface FixedDestinationCardProps {
  destination: Destination;
  variant?: "default" | "featured" | "minimal";
}

const FixedDestinationCard = ({
  destination,
  variant = "default",
}: FixedDestinationCardProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const href = `/destinations/${destination.country._id}/${destination.province._id}/${destination.slug}`;

  // Use static classes during SSR, dynamic after hydration
  const backgroundImage = mounted
    ? getCountryBackgroundImage(destination.country._id)
    : "/images/destinations/indo.jpg";

  // Create stable class mappings
  const getGradientClasses = () => {
    if (!mounted)
      return "bg-gradient-to-br from-emerald-900/70 via-blue-900/50 to-purple-900/60";

    const gradientOverlay = getCountryGradientOverlay(destination.country._id);
    if (destination.country._id === "1") {
      return "bg-gradient-to-br from-red-900/70 via-red-700/40 to-red-800/60";
    }
    if (destination.country._id === "2") {
      return "bg-gradient-to-br from-red-900/60 via-red-700/40 to-red-900/50";
    }
    return "bg-gradient-to-br from-emerald-900/70 via-blue-900/50 to-purple-900/60";
  };

  const getAccentClasses = () => {
    if (!mounted) return "from-yellow-400 via-orange-500 to-red-500";

    if (destination.country._id === "1") {
      return "from-red-600 via-red-500 to-red-400";
    }
    if (destination.country._id === "2") {
      return "from-red-700 via-red-600 to-red-400";
    }
    return "from-yellow-400 via-orange-500 to-red-500";
  };

  // Featured variant
  if (variant === "featured") {
    return (
      <div className="group col-span-full md:col-span-2 destination-card-featured">
        <Link href={href}>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-3xl hover:shadow-4xl transition-all duration-700">
            <div className="absolute inset-0">
              <OptimizedImage
                src={backgroundImage}
                alt="Featured Banner"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className={`absolute inset-0 ${getGradientClasses()}`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>

            <div className="absolute top-6 left-6 space-y-2">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${getAccentClasses()} rounded-2xl flex items-center justify-center shadow-lg`}
              >
                <span className="text-white text-xl">⭐</span>
              </div>
              <div
                className={`w-2 h-16 bg-gradient-to-b ${getAccentClasses()} rounded-full opacity-60`}
              ></div>
            </div>

            <div className="absolute top-6 right-6 w-20 h-20 rounded-2xl overflow-hidden border-3 border-white/40 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <OptimizedImage
                src={normalizeImagePath(destination.coverImage)}
                alt={destination.village}
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="mb-4">
                <span className="inline-block px-4 py-2 text-sm font-semibold text-white bg-white/20 backdrop-blur-xl rounded-full border border-white/30">
                  🌟 Featured Destination
                </span>
              </div>

              <h3 className="text-4xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300 drop-shadow-2xl">
                {destination.village}
              </h3>

              <p className="text-white/90 text-lg mb-4 drop-shadow-lg">
                {destination.province.name}, {destination.country.name}
              </p>

              <div className="flex items-center space-x-4">
                <div
                  className={`flex-1 h-2 bg-gradient-to-r ${getAccentClasses()} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}
                ></div>
                <div className="w-8 h-8 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30">
                  <span className="text-white text-sm">→</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // Minimal variant
  if (variant === "minimal") {
    return (
      <div className="group destination-card-minimal">
        <Link href={href}>
          <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 opacity-20">
              <OptimizedImage
                src={backgroundImage}
                alt="Background"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-white/40">
                <OptimizedImage
                  src={normalizeImagePath(destination.coverImage)}
                  alt={destination.village}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {destination.village}
              </h3>

              <p className="text-white/70 text-sm">
                {destination.province.name}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // Default variant
  return (
    <div className="group destination-card-default">
      <Link href={href}>
        <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700">
          <div className="absolute inset-0">
            <OptimizedImage
              src={backgroundImage}
              alt={`${destination.country.name} Banner`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className={`absolute inset-0 ${getGradientClasses()}`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
          </div>

          <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/40 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
          <div
            className={`absolute top-6 left-6 w-4 h-4 bg-gradient-to-br ${getAccentClasses()} rounded-full animate-pulse`}
          ></div>

          <div className="absolute top-4 right-4 w-16 h-16 rounded-xl overflow-hidden border-2 border-white/30 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
            <OptimizedImage
              src={normalizeImagePath(destination.coverImage)}
              alt={destination.village}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <div className="mb-3">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white/95 bg-white/20 backdrop-blur-xl rounded-full border border-white/20 shadow-lg">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                {destination.province.name}, {destination.country.name}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300 drop-shadow-lg leading-tight">
              {destination.village}
            </h3>

            <div className="flex items-center justify-between">
              <div
                className={`flex-1 h-1 bg-gradient-to-r ${getAccentClasses()} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
              ></div>
              <div className="ml-3 w-8 h-8 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors duration-300">
                <span className="text-white text-sm transform group-hover:translate-x-0.5 transition-transform duration-300">
                  →
                </span>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </Link>
    </div>
  );
};

export default FixedDestinationCard;
