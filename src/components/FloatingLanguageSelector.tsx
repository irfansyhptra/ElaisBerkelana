// src/components/FloatingLanguageSelector.tsx
"use client";

import LanguageSelector from "@/components/LanguageSelector";
import { useState, useEffect } from "react";

const FloatingLanguageSelector = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-40 lg:hidden">
      <LanguageSelector variant="floating" />
    </div>
  );
};

export default FloatingLanguageSelector;
