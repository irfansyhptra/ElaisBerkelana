// src/types/index.ts

export interface Country {
  _id: string;
  name: string;
  slug: string;
  imageUrl: string;
}

export interface Province {
  _id: string;
  name: string;
  slug: string;
  countryId: string;
}

// Tipe Post ditambahkan kembali untuk memperbaiki error di page.tsx
export interface Post {
  _id: string;
  title: string;
  village: string;
  date: string;
  description: string;
  youtubeUrl: string;
  imageUrl: string;
}

export interface ImageGallery {
  url: string;
  caption: string;
}

export interface TimelineItem {
  time: string;
  activity: string;
  notes: string;
  imageUrl?: string;
}

export interface Destination {
  _id: string;
  slug: string;
  countryId: string;
  provinceId: string;
  village: string;
  province: string;
  country: string;
  description: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  coverImage: string;
  imageGallery: ImageGallery[];
  timeline: TimelineItem[];
  highlights: string[];
  createdAt: string;
}
