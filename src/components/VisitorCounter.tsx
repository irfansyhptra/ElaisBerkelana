// src/components/VisitorCounter.tsx
"use client";
import { Users, Eye } from "lucide-react";
import { useEffect, useState } from "react";

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      // Simulasi delay jaringan
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsAnimating(true);
      setVisitorCount(1357); // Angka contoh
      setTimeout(() => setIsAnimating(false), 500);
    };

    fetchCount();
  }, []);

  return (
    <div className="relative group">
      {/* Main counter with enhanced glass effect */}
      <div className="glass-card-liquid p-6 flex items-center space-x-4 text-gray-800 hover:scale-105 transition-all duration-300">
        {/* Icon with glass background */}
        <div className="glass-card-minimal p-3 rounded-full">
          <Users size={24} className="text-green-600" />
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">
            Total Pengunjung
          </span>
          <span
            className={`text-2xl font-bold text-gray-900 transition-all duration-300 ${
              isAnimating ? "scale-110" : ""
            }`}
          >
            {visitorCount !== null ? (
              visitorCount.toLocaleString("id-ID")
            ) : (
              <div className="animate-pulse">...</div>
            )}
          </span>
        </div>

        {/* Eye icon for additional visual */}
        <div className="glass-card-minimal p-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          <Eye size={16} className="text-orange-500" />
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-400 to-orange-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-sm"></div>
    </div>
  );
};

export default VisitorCounter;
