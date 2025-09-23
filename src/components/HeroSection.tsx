"use client";

import VisitorCounter from "./VisitorCounter";
import Image from "next/image";
import SplitText from "./SplitText";
import { useEffect, useState } from "react";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

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

      {/* Floating Glass Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 backdrop-blur-sm rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-500/10 backdrop-blur-sm rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-orange-500/10 backdrop-blur-sm rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-blue-500/10 backdrop-blur-sm rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Content container with enhanced glass effect */}
      <div className="parallax-content text-center text-white px-4 max-w-6xl mx-auto">
        <div className="text-center p-12 mb-8">
          <SplitText
            text="ELAEIS "
            className="title-large text-green-500 mb-5 leading-none"
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
            text="BERKELANA"
            className="title-large text-yellow-400 leading-none"
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
        <div className="glass-card-minimal mb-8 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Dokumentasi perjalanan sosial mengeksplorasi dampak positif industri 
            kelapa sawit terhadap pemberdayaan masyarakat dan pembangunan berkelanjutan 
            di berbagai desa Indonesia.
          </p>
        </div>

        {/* Enhanced button layout */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button className="btn-primary text-lg px-12 py-5">
            Mulai Eksplorasi
          </button>
          <button className="btn-secondary text-lg px-12 py-5">
            Pelajari Lebih Lanjut
          </button>
        </div>

        {/* Visitor counter with glass effect */}
        <div className="flex justify-center">
            <VisitorCounter />
        </div>
      </div>
    </section>
  );
}
