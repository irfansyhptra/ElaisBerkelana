"use client";

import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  fill?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  fallbackSrc = "/images/destinations/gayo.jpg", // Default fallback
  priority = false,
  fill = false,
  objectFit = "cover",
  placeholder = "empty",
  blurDataURL,
  sizes,
}: OptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    console.warn(`Failed to load image: ${imageSrc}`);
    setHasError(true);
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  return (
    <div
      className={`relative ${
        fill ? "w-full h-full" : ""
      } ${className} overflow-hidden`}
    >
      {isLoading && (
        <div
          className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse ${
            fill ? "w-full h-full" : ""
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      <Image
        src={imageSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={placeholder === "blur" ? blurDataURL : undefined}
        className={`${fill ? "object-cover" : `object-${objectFit}`} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-all duration-500 ease-out ${
          hasError ? "filter grayscale" : ""
        }`}
        onError={handleError}
        onLoad={handleLoad}
        onLoadingComplete={handleLoad}
        sizes={
          sizes ||
          (fill
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 400px"
            : undefined)
        }
      />

      {hasError && (
        <div className="absolute top-2 right-2 bg-red-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full shadow-lg">
          ⚠️ Fallback
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
