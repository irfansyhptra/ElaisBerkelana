// src/components/VisitorCounter.tsx
"use client";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

const VisitorCounter = () => {
  // State untuk menyimpan jumlah pengunjung
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // --- SIMULASI PENGAMBILAN DATA DARI BACKEND ---
    // Di sini Anda akan memanggil API backend Anda.
    // Contoh: fetch('https://your-backend.com/api/visits')
    //         .then(res => res.json())
    //         .then(data => setVisitorCount(data.count));

    // Untuk sekarang, kita gunakan angka dummy
    const fetchCount = async () => {
      // Simulasi delay jaringan
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setVisitorCount(1357); // Angka contoh
    };

    fetchCount();
  }, []);

  return (
    <div className="glassmorphism p-3 rounded-lg flex items-center space-x-2 text-white">
      <Users size={20} />
      <span className="font-medium">
        {visitorCount !== null ? visitorCount.toLocaleString("id-ID") : "..."}{" "}
        Pengunjung
      </span>
    </div>
  );
};

export default VisitorCounter;
