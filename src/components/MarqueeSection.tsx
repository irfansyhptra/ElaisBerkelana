// src/components/MarqueeSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import DocumentationCard from "./DocumentationCard";
import { GalleryImage } from "@/lib/api";

interface MarqueeSectionProps {
  images: GalleryImage[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

const MarqueeSection = ({
  images,
  direction = "left",
  speed = 30,
  className = "",
}: MarqueeSectionProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    if (!marqueeElement || images.length === 0) return;

    // Calculate dimensions
    const cardWidth = 320; // w-80 = 320px
    const gap = 24; // gap-6 = 24px
    const totalWidth = (cardWidth + gap) * images.length;

    // Start animation after card roll animations complete
    const startDelay = setTimeout(() => {
      setIsAnimating(true);

      // Create smooth infinite scroll
      const keyframes =
        direction === "left"
          ? [
              { transform: "translateX(0px)" },
              { transform: `translateX(-${totalWidth}px)` },
            ]
          : [
              { transform: `translateX(-${totalWidth}px)` },
              { transform: "translateX(0px)" },
            ];

      const animation = marqueeElement.animate(keyframes, {
        duration: Math.max(totalWidth * speed, 15000), // Minimum 15s duration for smooth scroll
        iterations: Infinity,
        easing: "linear",
      });

      // Store animation reference for cleanup
      marqueeElement.setAttribute("data-animation", "active");

      return () => {
        if (animation) {
          animation.cancel();
        }
        marqueeElement.removeAttribute("data-animation");
      };
    }, images.length * 150 + 500); // Wait for all roll animations to start

    return () => {
      clearTimeout(startDelay);
      setIsAnimating(false);
    };
  }, [images.length, direction, speed]);

  if (images.length === 0) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Main marquee container */}
      <div
        ref={marqueeRef}
        className="flex gap-6 w-max transition-opacity duration-1000"
        style={{
          willChange: "transform",
          transform: isAnimating ? undefined : "translateX(0px)",
          opacity: isAnimating ? 1 : 0.8,
        }}
      >
        {/* First set of images with staggered roll animation */}
        {images.map((image, index) => (
          <div
            key={`${image.id}-1`}
            className={`w-80 flex-shrink-0 marquee-card ${
              direction === "left"
                ? "animate-roll-in-left"
                : "animate-roll-in-right"
            }`}
            style={{
              animationDelay: `${index * 0.15}s`,
              animationFillMode: "both",
            }}
          >
            <DocumentationCard image={image} index={index} />
          </div>
        ))}

        {/* Duplicate set for seamless loop */}
        {images.map((image, index) => (
          <div
            key={`${image.id}-2`}
            className="w-80 flex-shrink-0 marquee-card"
          >
            <DocumentationCard image={image} index={index + images.length} />
          </div>
        ))}
      </div>

      {/* Enhanced gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black/30 via-black/10 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black/30 via-black/10 to-transparent pointer-events-none z-10" />

      {/* Optional pause on hover */}
      <div
        className="absolute inset-0 z-20 opacity-0 hover:opacity-100 transition-opacity duration-300"
        onMouseEnter={() => {
          const element = marqueeRef.current;
          if (element) {
            element.style.animationPlayState = "paused";
          }
        }}
        onMouseLeave={() => {
          const element = marqueeRef.current;
          if (element) {
            element.style.animationPlayState = "running";
          }
        }}
      />
    </div>
  );
};

export default MarqueeSection;
