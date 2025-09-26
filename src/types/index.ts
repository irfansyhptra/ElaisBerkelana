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

export interface PalmOilProgram {
  day: number;
  title: string;
  activities: string[];
  images?: string[];
  videos?: string[];
  benefits?: string[];
  socialImpact?: string;
  economicImpact?: string;
  environmentalImpact?: string;
  notes?: string;
}

export interface SocialMedia {
  youtube?: string[];
  instagram?: string[];
  tiktok?: string[];
}

export interface PalmOilResources {
  research?: string[];
  documentation?: string[];
  training?: string[];
  equipment?: string[];
  community?: string[];
  sustainability?: string[];
  certification?: string[];
  monitoring?: string[];
  education?: string[];
  development?: string[];
  other?: string[];
}

export interface GalleryItem {
  url: string;
  caption: string;
  type: "image" | "video";
  featured?: boolean;
}

export interface CommunityTestimonial {
  name: string;
  role?: string;
  avatar?: string;
  comment: string;
  rating: number;
  date: string;
  verified?: boolean;
  location?: string;
}

export interface PalmOilDestination {
  _id: string;
  title: string;
  slug: string;
  description: string;
  country: Country;
  province: Province;
  village: string;
  images: string[];
  coverImage?: string;
  banner?: string;
  type: "village" | "plantation" | "mill" | "research" | "community";
  socialImpactScore: number;
  programDuration: string;
  beneficiaries: string[];
  challenges?: string[];
  requirements?: string[];
  impactLevel?: "Low" | "Moderate" | "High" | "Very High";
  establishedYear?: string;
  programs: PalmOilProgram[];
  socialMedia?: SocialMedia;
  resources?: PalmOilResources;
  keyBenefits?: string[];
  testimonials?: CommunityTestimonial[];
  gallery?: GalleryItem[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  featured: boolean;
  createdAt: string;
  partnerOrganizations?: string[];
  sustainabilityCertifications?: string[];
}

// Aliases for backward compatibility
export type Destination = PalmOilDestination;
export type Itinerary = PalmOilProgram;
export type Facilities = PalmOilResources;
export type DestinationTestimonial = CommunityTestimonial;

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

export interface Post {
  title: string;
  description: string;
  youtubeUrl: string;
  date: string;
  village: string;
}
