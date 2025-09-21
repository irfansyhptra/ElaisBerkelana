"use client";
// src/app/destinations/page.tsx
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Destination } from "@/types";

// Mock data - replace with actual API call later
const mockDestinations: Destination[] = [
  {
    _id: "1",
    village: "Desa Gayo",
    province: "Aceh",
    description: "Sebuah desa yang kaya akan budaya dan tradisi kopi.",
    youtubeUrl: "https://www.youtube.com/watch?v=example1",
    coverImage: "/images/desa-gayo.jpg",
    imageGallery: [
      { url: "/images/gayo-1.jpg", caption: "Kebun Kopi" },
      { url: "/images/gayo-2.jpg", caption: "Upacara Tradisional" },
    ],
    timeline: [
      {
        date: "12 Sep 2025",
        title: "Hari Pertama",
        description:
          "Mengunjungi perkebunan kopi dan belajar tentang proses panen.",
      },
      {
        date: "13 Sep 2025",
        title: "Hari Kedua",
        description: "Mengikuti upacara adat dan mengenal budaya lokal.",
      },
    ],
    highlights: [
      "Tradisi pembuatan kopi",
      "Upacara adat",
      "Keramahtamahan penduduk",
    ],
    createdAt: "2025-09-12",
  },
  // Add more mock data as needed
];

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const provinces = [
    "all",
    ...new Set(mockDestinations.map((d) => d.province)),
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredDestinations = mockDestinations.filter((destination) => {
    const matchesSearch = destination.village
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesProvince =
      selectedProvince === "all" || destination.province === selectedProvince;
    return matchesSearch && matchesProvince;
  });

  return (
    <div className="min-h-screen bg-brand-white pt-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] flex items-center justify-center">
        <Image
          src=""
          alt="Destinations Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-0" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Destinasi Perjalanan</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Jelajahi desa-desa yang telah dikunjungi dalam perjalanan Elaies
            Berkelana
          </p>
        </div>
      </div>

      {/* Enhanced Filters Section */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          {/* Search and Filter Container */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Enhanced Search Bar */}
              <div className="flex-grow relative">
                <motion.div
                  className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                    isSearchFocused
                      ? "border-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Search Icon */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <svg
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isSearchFocused ? "text-blue-500" : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Cari destinasi impian Anda..."
                    className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500 border-0 focus:outline-none focus:ring-0 rounded-xl text-lg font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />

                  {/* Animated Background Gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0"
                    animate={{
                      opacity: isSearchFocused ? 1 : 0,
                      background: isSearchFocused
                        ? "linear-gradient(90deg, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 50%, rgba(236,72,153,0.1) 100%)"
                        : "linear-gradient(90deg, transparent 0%, transparent 50%, transparent 100%)",
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Search Results Count */}
                  {searchQuery && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        {filteredDestinations.length}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Enhanced Province Dropdown */}
              <div className="lg:w-80 relative" ref={dropdownRef}>
                <motion.button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    {/* Location Icon */}
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-gray-800 font-medium text-lg">
                      {selectedProvince === "all"
                        ? "Semua Provinsi"
                        : selectedProvince}
                    </span>
                  </div>

                  {/* Dropdown Arrow */}
                  <motion.svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
                    >
                      <div className="max-h-60 overflow-y-auto">
                        {provinces.map((province, index) => (
                          <motion.button
                            key={province}
                            onClick={() => {
                              setSelectedProvince(province);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 border-b border-gray-100 last:border-b-0 ${
                              selectedProvince === province
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                : "text-gray-700 hover:text-gray-900"
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 5 }}
                          >
                            <div className="flex items-center gap-3">
                              {selectedProvince === province && (
                                <motion.svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                  }}
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </motion.svg>
                              )}
                              <span className="font-medium">
                                {province === "all"
                                  ? "Semua Provinsi"
                                  : province}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Filter Stats */}
            <motion.div
              className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{filteredDestinations.length} destinasi ditemukan</span>
              </div>
              {searchQuery && (
                <div className="flex items-center gap-2">
                  <span>untuk pencarian:</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                </div>
              )}
              {selectedProvince !== "all" && (
                <div className="flex items-center gap-2">
                  <span>di provinsi:</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                    {selectedProvince}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Destinations Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, staggerChildren: 0.1 }}
        >
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200"
              >
                <Link href={`/destinations/${destination._id}`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={destination.coverImage}
                      alt={destination.village}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Hover Icon */}
                    <motion.div
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <svg
                        className="w-5 h-5 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {destination.village}
                    </h3>
                    <p className="text-blue-600 mb-3 font-medium flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {destination.province}
                    </p>
                    <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                      {destination.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {destination.highlights
                        .slice(0, 2)
                        .map((highlight, index) => (
                          <motion.span
                            key={index}
                            className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {highlight}
                          </motion.span>
                        ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            // Empty State
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-full flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-8 mb-6">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">
                Tidak ada destinasi ditemukan
              </h3>
              <p className="text-gray-500 max-w-md mb-6">
                Coba ubah kata kunci pencarian atau pilih provinsi yang berbeda
                untuk menemukan destinasi yang Anda cari.
              </p>
              <motion.button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedProvince("all");
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset Filter
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
