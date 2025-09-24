// src/data/countries.ts
import { Country } from "@/types";

export const mockCountries: Country[] = [
  {
    _id: "1",
    name: "Indonesia",
    slug: "indonesia",
    image: {
      url: "/images/destinations/indo.jpg",
      publicId: "indo",
    },
  },
  {
    _id: "2",
    name: "Jepang",
    slug: "jepang",
    image: {
      url: "/images/destinations/gayo.jpg", // Using available image
      publicId: "gayo",
    },
  },
];
