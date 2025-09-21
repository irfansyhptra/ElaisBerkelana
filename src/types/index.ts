// src/types/index.ts
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

export interface Timeline {
  date: string;
  title: string;
  description: string;
}

export interface Destination {
  _id: string;
  village: string;
  province: string;
  description: string;
  youtubeUrl: string;
  coverImage: string;
  imageGallery: ImageGallery[];
  timeline: Timeline[];
  highlights: string[];
  createdAt: string;
}
