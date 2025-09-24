// src/utils/backgroundUtils.ts
import { mockCountries } from "@/data/countries";

/**
 * Mendapatkan background image berdasarkan countryId
 * Fallback ke image default jika tidak ditemukan
 */
export const getCountryBackgroundImage = (countryId: string): string => {
  const country = mockCountries.find((c) => c._id === countryId);

  if (country?.image?.url) {
    return country.image.url;
  }

  // Fallback images berdasarkan ID atau default
  const fallbackMap: Record<string, string> = {
    "1": "/images/destinations/indo.jpg", // Indonesia
    "2": "/images/destinations/gayo.jpg", // Jepang
  };

  return fallbackMap[countryId] || "/images/destinations/indo.jpg";
};

/**
 * Mendapatkan gradient overlay yang sesuai dengan negara
 */
export const getCountryGradientOverlay = (countryId: string): string => {
  const gradientMap: Record<string, string> = {
    "1": "from-red-900/70 via-red-700/40 to-red-800/60", // Indonesia - nuansa merah
    "2": "from-red-900/60 via-red-700/40 to-red-900/50", // Jepang - nuansa merah
  };

  return (
    gradientMap[countryId] ||
    "from-emerald-900/70 via-blue-900/50 to-purple-900/60"
  );
};

/**
 * Mendapatkan accent color berdasarkan negara
 */
export const getCountryAccentColor = (countryId: string): string => {
  const colorMap: Record<string, string> = {
    "1": "from-red-600 via-red-500 to-red-400", // Indonesia - gradient merah
    "2": "from-red-700 via-red-600 to-red-400", // Jepang - gradient merah
  };

  return colorMap[countryId] || "from-yellow-400 via-orange-500 to-red-500";
};
