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

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  destination: string;
  comment: string;
  date: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  excerpt: string;
}
