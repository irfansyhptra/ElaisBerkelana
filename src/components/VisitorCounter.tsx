// src/components/VisitorCounter.tsx
"use client";
import { Users, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { getVisitorCount, incrementVisitorCount } from "@/lib/api";

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchAndIncrementCount = async () => {
      try {
        await incrementVisitorCount(); // Increment first
        const data = await getVisitorCount(); // Then get the new count
        setVisitorCount(data.count);
      } catch (error) {
        console.error("Failed to update visitor count:", error);
        // Fallback to a static number on error
        setVisitorCount(1357);
      }
    };

    fetchAndIncrementCount();
  }, []);

  return (
    <div className="relative group">
      <div className="glass-card-liquid p-6 flex items-center space-x-4 text-gray-800 hover:scale-105 transition-all duration-300">
        <div className="glass-card-minimal p-3 rounded-full">
          <Users size={24} className="text-green-600" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">
            Total Pengunjung
          </span>
          <span className="text-2xl font-bold text-gray-900 transition-all duration-300">
            {visitorCount !== null &&
            visitorCount !== undefined &&
            typeof visitorCount === "number" ? (
              visitorCount.toLocaleString("id-ID")
            ) : (
              <div className="animate-pulse">...</div>
            )}
          </span>
        </div>
        <div className="glass-card-minimal p-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          <Eye size={16} className="text-orange-500" />
        </div>
      </div>
      <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-400 to-orange-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-sm"></div>
    </div>
  );
};

export default VisitorCounter;
