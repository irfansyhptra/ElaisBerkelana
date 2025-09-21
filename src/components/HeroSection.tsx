"use client";

import VisitorCounter from "./VisitorCounter";
import Image from "next/image";
import SplitText from "./SplitText";
import TextType from "./TextType";
import { ShinyButton } from "./ShinyButton";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-background.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <SplitText
          text="ELAIS BERKELANA"
          className="text-8xl font-semibold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
          Embark on an unforgettable journey through Indonesia&apos;s most
          stunning landscapes, rich cultures, and hidden gems that await your
          exploration.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <ShinyButton className="px-8 py-4 text-lg font-semibold">
            Start Your Adventure
          </ShinyButton>
          <ShinyButton className="px-8 py-4 text-lg font-semibold">
            Learn More
          </ShinyButton>
        </div>
        <div className="flex justify-center">
          <VisitorCounter />
        </div>
      </div>
    </section>
  );
}
