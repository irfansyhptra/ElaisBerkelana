export interface Country {
  _id: string;
  name: string;
  slug: string;
  image?: {
    url: string;
    publicId: string;
  };
}

export interface Province {
  _id: string;
  name: string;
  slug: string;
  country: string; // ObjectId as string
}

export interface Itinerary {
  day: number;
  activities: string[];
}

export interface Destination {
  _id: string;
  title: string;
  slug: string;
  description: string;
  country: Country;
  province: Province;
  village: string;
  images: string[];
  coverImage?: string;
  price: number;
  rating: number;
  duration: string;
  included: string[];
  itinerary: Itinerary[];
  featured: boolean;
  createdAt: string;
  youtubeUrl?: string;
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
