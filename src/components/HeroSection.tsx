"use client";

import VisitorCounter from "./VisitorCounter";
import Image from "next/image";
import SplitText from "./SplitText";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with original overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-background.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content container - back to original layout */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Keep the new typography for ELAEIS BERKELANA */}
        <div className="mb-8">
          <SplitText
            text="ELAEIS"
            className="title-massive text-white mb-4 leading-none"
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
            className="title-large text-white/90 leading-none"
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

        {/* Back to original subtitle style */}
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
          Embark on an unforgettable journey through Indonesia&apos;s most
          stunning landscapes, rich cultures, and hidden gems that await your
          exploration.
        </p>

        {/* Back to original button layout */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="btn-primary">Start Your Adventure</button>
          <button className="btn-secondary">Learn More</button>
        </div>

        {/* Back to original visitor counter */}
        <div className="flex justify-center">
          <VisitorCounter />
        </div>
      </div>
    </section>
  );
}
