// src/components/DocumentationCard.tsx
"use client";

import OptimizedImage from "./OptimizedImage";
import { normalizeImagePath } from "@/utils/imageUtils";
import {
  getOptimizedImageUrl,
  isCloudinaryUrl,
  getBlurDataURL,
} from "@/utils/cloudinaryUtils";
import { GalleryImage } from "@/lib/api";
import { Calendar, MapPin, Tag } from "lucide-react";

interface DocumentationCardProps {
  image: GalleryImage;
  index: number;
}

const DocumentationCard = ({ image, index }: DocumentationCardProps) => {
  // Helper to get optimized image source
  const getImageSource = (url: string) => {
    if (isCloudinaryUrl(url)) {
      return getOptimizedImageUrl(url, "card");
    }
    return normalizeImagePath(url);
  };

  // Helper to get image placeholder
  const getImagePlaceholder = (url: string) => {
    return isCloudinaryUrl(url) ? "blur" : "empty";
  };

  // Helper to get blur data URL
  const getImageBlurDataURL = (url: string) => {
    return isCloudinaryUrl(url) ? getBlurDataURL(url) : undefined;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cover":
        return "🖼️";
      case "banner":
        return "🏞️";
      case "gallery":
        return "📸";
      default:
        return "🖼️";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "village":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-400/30";
      case "plantation":
        return "bg-green-500/20 text-green-300 border-green-400/30";
      case "mill":
        return "bg-orange-500/20 text-orange-300 border-orange-400/30";
      case "research":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30";
      case "community":
        return "bg-purple-500/20 text-purple-300 border-purple-400/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className="group documentation-card relative w-full"
      data-aos="fade-up"
      data-aos-delay={100 + index * 50}
      style={{ minHeight: "320px" }}
    >
      <div className="relative w-full aspect-[4/3] min-h-[320px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105">
        {/* Full Background Image Container */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ minHeight: "320px" }}
        >
          <OptimizedImage
            src={getImageSource(image.url)}
            alt={`${image.title} - ${image.village}`}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
            priority={index < 4} // Prioritize first 4 images
            placeholder={getImagePlaceholder(image.url)}
            blurDataURL={getImageBlurDataURL(image.url)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 400px"
          />

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/95 group-hover:via-black/50 transition-all duration-500" />
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
            <span className="text-white text-xs font-semibold">
              {getCategoryIcon(image.category)} {image.category}
            </span>
          </div>
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className={`px-3 py-1.5 rounded-full border backdrop-blur-md shadow-lg ${getTypeColor(
              image.type
            )}`}
          >
            <span className="text-xs font-semibold capitalize">
              {image.type}
            </span>
          </div>
        </div>

        {/* Glass Card Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end z-20">
          <div className="p-6 bg-white/10 backdrop-blur-lg border-t border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-emerald-300 transition-colors duration-300 drop-shadow-lg">
              {image.title}
            </h3>

            {/* Location */}
            <div className="flex items-center text-white/90 text-sm mb-4">
              <MapPin className="w-4 h-4 mr-2 text-emerald-400 flex-shrink-0" />
              <span className="line-clamp-1 drop-shadow-md">
                {image.village}, {image.province}
              </span>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-xs text-white/80">
              <div className="flex items-center bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                <Calendar className="w-3 h-3 mr-1.5" />
                <span>{formatDate(image.createdAt)}</span>
              </div>
              <div className="flex items-center bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                <Tag className="w-3 h-3 mr-1.5" />
                <span>{image.country}</span>
              </div>
            </div>

            {/* Progress Bar Animation */}
            <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </div>
          </div>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-6 left-6 w-3 h-3 bg-emerald-400 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 z-10 shadow-lg" />

        {/* Decorative Elements */}
        <div className="absolute top-8 left-8 w-8 h-8 border-2 border-white/30 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500 opacity-40 group-hover:opacity-70 z-10" />
      </div>
    </div>
  );
};

export default DocumentationCard;
