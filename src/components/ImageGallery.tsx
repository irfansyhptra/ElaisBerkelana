"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: {
    url: string;
    caption: string;
  }[];
  onImageClick?: (index: number) => void;
}

export default function ImageGallery({
  images,
  onImageClick,
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setActiveIndex(index);
    if (onImageClick) {
      onImageClick(index);
    }
  };

  // Guard clause for empty images
  if (!images || images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Tidak ada gambar tersedia</p>
        </div>
      </div>
    );
  }

  // Ensure activeIndex is within bounds
  const safeActiveIndex = Math.min(activeIndex, images.length - 1);
  const currentImage = images[safeActiveIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Image
          src={currentImage.url}
          alt={currentImage.caption}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-sm">
          <p className="text-white/90 text-sm">{currentImage.caption}</p>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(index)}
            className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
              activeIndex === index ? "ring-2 ring-primary" : ""
            }`}
          >
            <Image
              src={image.url}
              alt={image.caption}
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
