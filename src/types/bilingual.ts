// src/types/bilingual.ts
// Bilingual support types for multi-language content

export type SupportedLanguage = "id" | "en";

export interface BilingualText {
  id: string; // Indonesian
  en: string; // English
}

export interface BilingualArray {
  id: string[]; // Indonesian array
  en: string[]; // English array
}

// Bilingual version of core types
export interface BilingualCountry {
  _id: string;
  name: BilingualText;
  slug: string; // Slug is language-neutral
  image?: {
    url: string;
    publicId: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface BilingualProvince {
  _id: string;
  name: BilingualText;
  slug: string;
  country: string; // ObjectId reference
  createdAt?: string;
  updatedAt?: string;
}

export interface BilingualPalmOilProgram {
  day: number;
  title: BilingualText;
  activities: BilingualArray;
  images?: string[]; // Images are language-neutral
  videos?: string[]; // Videos are language-neutral
  benefits?: BilingualArray;
  socialImpact?: BilingualText;
  economicImpact?: BilingualText;
  environmentalImpact?: BilingualText;
  notes?: BilingualText;
}

export interface BilingualSocialMedia {
  youtube?: string[];
  instagram?: string[];
  tiktok?: string[];
  // Social media links are language-neutral
}

export interface BilingualPalmOilResources {
  research?: BilingualArray;
  documentation?: BilingualArray;
  training?: BilingualArray;
  equipment?: BilingualArray;
  community?: BilingualArray;
  sustainability?: BilingualArray;
  certification?: BilingualArray;
  monitoring?: BilingualArray;
  education?: BilingualArray;
  development?: BilingualArray;
  other?: BilingualArray;
}

export interface BilingualGalleryItem {
  url: string;
  caption: BilingualText;
  type: "image" | "video";
  featured?: boolean;
}

export interface BilingualCommunityTestimonial {
  name: string; // Name is language-neutral
  role?: BilingualText;
  avatar?: string;
  comment: BilingualText;
  rating: number;
  date: string;
  verified?: boolean;
  location?: string;
}

export interface BilingualPalmOilDestination {
  _id: string;
  title: BilingualText;
  slug: string; // Slug is language-neutral
  description: BilingualText;
  country: BilingualCountry | string; // Can be populated or just ID
  province: BilingualProvince | string; // Can be populated or just ID
  village: BilingualText;
  images: string[]; // Image URLs are language-neutral
  coverImage?: string;
  banner?: string;
  type: "village" | "plantation" | "mill" | "research" | "community";
  socialImpactScore: number;
  programDuration: BilingualText;
  beneficiaries: BilingualArray;
  challenges?: BilingualArray;
  requirements?: BilingualArray;
  impactLevel?: "Low" | "Moderate" | "High" | "Very High";
  establishedYear?: string;
  programs: BilingualPalmOilProgram[];
  socialMedia?: BilingualSocialMedia;
  resources?: BilingualPalmOilResources;
  keyBenefits?: BilingualArray;
  testimonials?: BilingualCommunityTestimonial[];
  gallery?: BilingualGalleryItem[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  featured: boolean;
  createdAt: string;
  updatedAt?: string;
  partnerOrganizations?: BilingualArray;
  sustainabilityCertifications?: BilingualArray;

  // Language metadata
  availableLanguages?: SupportedLanguage[];
  defaultLanguage?: SupportedLanguage;
}

// Helper type to extract single language content
export type LocalizedDestination = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  country: {
    _id: string;
    name: string;
    slug: string;
    image?: { url: string; publicId: string };
  };
  province: {
    _id: string;
    name: string;
    slug: string;
    country: string;
  };
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
  programs: Array<{
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
  }>;
  socialMedia?: BilingualSocialMedia;
  resources?: {
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
  };
  keyBenefits?: string[];
  testimonials?: Array<{
    name: string;
    role?: string;
    avatar?: string;
    comment: string;
    rating: number;
    date: string;
    verified?: boolean;
    location?: string;
  }>;
  gallery?: Array<{
    url: string;
    caption: string;
    type: "image" | "video";
    featured?: boolean;
  }>;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  featured: boolean;
  createdAt: string;
  partnerOrganizations?: string[];
  sustainabilityCertifications?: string[];
  currentLanguage: SupportedLanguage;
};

// Utility type for form data
export interface BilingualFormData {
  // Common fields
  slug: string;
  type: "village" | "plantation" | "mill" | "research" | "community";
  socialImpactScore: number;
  impactLevel?: "Low" | "Moderate" | "High" | "Very High";
  establishedYear?: string;
  featured: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };

  // Images (language-neutral)
  images: string[];
  coverImage?: string;
  banner?: string;

  // Social media (language-neutral)
  socialMedia?: BilingualSocialMedia;

  // Bilingual fields - Indonesian
  id: {
    title: string;
    description: string;
    village: string;
    programDuration: string;
    beneficiaries: string[];
    challenges?: string[];
    requirements?: string[];
    keyBenefits?: string[];
    partnerOrganizations?: string[];
    sustainabilityCertifications?: string[];
    programs: Array<{
      day: number;
      title: string;
      activities: string[];
      benefits?: string[];
      socialImpact?: string;
      economicImpact?: string;
      environmentalImpact?: string;
      notes?: string;
      images?: string[];
      videos?: string[];
    }>;
    resources?: {
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
    };
    testimonials?: Array<{
      name: string;
      role?: string;
      avatar?: string;
      comment: string;
      rating: number;
      date: string;
      verified?: boolean;
      location?: string;
    }>;
    gallery?: Array<{
      url: string;
      caption: string;
      type: "image" | "video";
      featured?: boolean;
    }>;
  };

  // Bilingual fields - English
  en: {
    title: string;
    description: string;
    village: string;
    programDuration: string;
    beneficiaries: string[];
    challenges?: string[];
    requirements?: string[];
    keyBenefits?: string[];
    partnerOrganizations?: string[];
    sustainabilityCertifications?: string[];
    programs: Array<{
      day: number;
      title: string;
      activities: string[];
      benefits?: string[];
      socialImpact?: string;
      economicImpact?: string;
      environmentalImpact?: string;
      notes?: string;
      images?: string[];
      videos?: string[];
    }>;
    resources?: {
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
    };
    testimonials?: Array<{
      name: string;
      role?: string;
      avatar?: string;
      comment: string;
      rating: number;
      date: string;
      verified?: boolean;
      location?: string;
    }>;
    gallery?: Array<{
      url: string;
      caption: string;
      type: "image" | "video";
      featured?: boolean;
    }>;
  };

  // References
  country: string; // ObjectId
  province: string; // ObjectId
}
