"use client";

import VisitorCounter from "./VisitorCounter";
import Image from "next/image";
import SplitText from "./SplitText";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState } from "react";
import Link from "next/link";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="parallax-hero min-h-screen flex items-center justify-center">
      {/* Parallax Background */}
      <div
        className="parallax-bg"
        style={{
          transform: `translate3d(0, ${scrollY * 0.5}px, 0) scale(${
            1 + scrollY * 0.0002
          })`,
        }}
      >
        <Image
          src="/hero-background.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Enhanced Parallax Overlay */}
      <div className="parallax-overlay"></div>

      {/* Floating Glass Elements - Responsive */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-white/5 backdrop-blur-sm rounded-full animate-pulse"></div>
        <div className="absolute top-32 sm:top-40 right-4 sm:right-20 w-12 sm:w-18 md:w-24 h-12 sm:h-18 md:h-24 bg-green-500/10 backdrop-blur-sm rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-24 sm:bottom-32 left-4 sm:left-20 w-10 sm:w-16 md:w-20 h-10 sm:h-16 md:h-20 bg-orange-500/10 backdrop-blur-sm rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 w-14 sm:w-20 md:w-28 h-14 sm:h-20 md:h-28 bg-blue-500/10 backdrop-blur-sm rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Content container with enhanced glass effect - Mobile Responsive */}
      <div className="parallax-content text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mobile-safe-area">
        <div className="text-center p-6 sm:p-8 md:p-12 mb-6 sm:mb-8">
          <SplitText
            text={`${t("hero.title1")} `}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-green-500 mb-3 sm:mb-5 leading-none"
            delay={100}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 100, rotateX: -90 }}
            to={{ opacity: 1, y: 0, rotateX: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
          <SplitText
            text={t("hero.title2")}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-yellow-400 leading-none"
            delay={150}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 80, rotateX: -90 }}
            to={{ opacity: 1, y: 0, rotateX: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>

        {/* Subtitle with glass background */}
        <div className="mb-8 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-white-700 leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Enhanced button layout */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Link href="/destinations">
            <button className="btn-primary text-lg px-12 py-5">
              {t("hero.cta.primary")}
            </button>
          </Link>
          <Link href="/about">
            <button className="btn-secondary text-lg px-12 py-5">
              {t("hero.cta.secondary")}
            </button>
          </Link>
        </div>

        {/* Visitor counter with glass effect */}
        <div className="flex justify-center">
          <VisitorCounter />
        </div>
      </div>
    </section>
  );
}
