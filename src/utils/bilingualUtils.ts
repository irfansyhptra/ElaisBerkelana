// src/utils/bilingualUtils.ts
// Utility functions for handling bilingual content

import type {
  BilingualPalmOilDestination,
  LocalizedDestination,
  SupportedLanguage,
  BilingualText,
  BilingualArray,
} from "@/types/bilingual";

/**
 * Localize bilingual destination to single language
 * @param destination - Bilingual destination object
 * @param language - Target language ('id' or 'en')
 * @returns Localized destination
 */
export function localizeDestination(
  destination: BilingualPalmOilDestination,
  language: SupportedLanguage = "id"
): LocalizedDestination {
  return {
    _id: destination._id,
    title: getBilingualText(destination.title, language),
    slug: destination.slug,
    description: getBilingualText(destination.description, language),
    country:
      typeof destination.country === "string"
        ? {
            _id: destination.country,
            name: "",
            slug: "",
          }
        : {
            _id: destination.country._id,
            name: getBilingualText(destination.country.name, language),
            slug: destination.country.slug,
            image: destination.country.image,
          },
    province:
      typeof destination.province === "string"
        ? {
            _id: destination.province,
            name: "",
            slug: "",
            country: "",
          }
        : {
            _id: destination.province._id,
            name: getBilingualText(destination.province.name, language),
            slug: destination.province.slug,
            country: destination.province.country,
          },
    village: getBilingualText(destination.village, language),
    images: destination.images,
    coverImage: destination.coverImage,
    banner: destination.banner,
    type: destination.type,
    socialImpactScore: destination.socialImpactScore,
    programDuration: getBilingualText(destination.programDuration, language),
    beneficiaries: getBilingualArray(destination.beneficiaries, language),
    challenges: destination.challenges
      ? getBilingualArray(destination.challenges, language)
      : undefined,
    requirements: destination.requirements
      ? getBilingualArray(destination.requirements, language)
      : undefined,
    impactLevel: destination.impactLevel,
    establishedYear: destination.establishedYear,
    programs: destination.programs.map((program) => ({
      day: program.day,
      title: getBilingualText(program.title, language),
      activities: getBilingualArray(program.activities, language),
      images: program.images,
      videos: program.videos,
      benefits: program.benefits
        ? getBilingualArray(program.benefits, language)
        : undefined,
      socialImpact: program.socialImpact
        ? getBilingualText(program.socialImpact, language)
        : undefined,
      economicImpact: program.economicImpact
        ? getBilingualText(program.economicImpact, language)
        : undefined,
      environmentalImpact: program.environmentalImpact
        ? getBilingualText(program.environmentalImpact, language)
        : undefined,
      notes: program.notes
        ? getBilingualText(program.notes, language)
        : undefined,
    })),
    socialMedia: destination.socialMedia,
    resources: destination.resources
      ? {
          research: destination.resources.research
            ? getBilingualArray(destination.resources.research, language)
            : undefined,
          documentation: destination.resources.documentation
            ? getBilingualArray(destination.resources.documentation, language)
            : undefined,
          training: destination.resources.training
            ? getBilingualArray(destination.resources.training, language)
            : undefined,
          equipment: destination.resources.equipment
            ? getBilingualArray(destination.resources.equipment, language)
            : undefined,
          community: destination.resources.community
            ? getBilingualArray(destination.resources.community, language)
            : undefined,
          sustainability: destination.resources.sustainability
            ? getBilingualArray(destination.resources.sustainability, language)
            : undefined,
          certification: destination.resources.certification
            ? getBilingualArray(destination.resources.certification, language)
            : undefined,
          monitoring: destination.resources.monitoring
            ? getBilingualArray(destination.resources.monitoring, language)
            : undefined,
          education: destination.resources.education
            ? getBilingualArray(destination.resources.education, language)
            : undefined,
          development: destination.resources.development
            ? getBilingualArray(destination.resources.development, language)
            : undefined,
          other: destination.resources.other
            ? getBilingualArray(destination.resources.other, language)
            : undefined,
        }
      : undefined,
    keyBenefits: destination.keyBenefits
      ? getBilingualArray(destination.keyBenefits, language)
      : undefined,
    testimonials: destination.testimonials?.map((testimonial) => ({
      name: testimonial.name,
      role: testimonial.role
        ? getBilingualText(testimonial.role, language)
        : undefined,
      avatar: testimonial.avatar,
      comment: getBilingualText(testimonial.comment, language),
      rating: testimonial.rating,
      date: testimonial.date,
      verified: testimonial.verified,
      location: testimonial.location,
    })),
    gallery: destination.gallery?.map((item) => ({
      url: item.url,
      caption: getBilingualText(item.caption, language),
      type: item.type,
      featured: item.featured,
    })),
    coordinates: destination.coordinates,
    featured: destination.featured,
    createdAt: destination.createdAt,
    partnerOrganizations: destination.partnerOrganizations
      ? getBilingualArray(destination.partnerOrganizations, language)
      : undefined,
    sustainabilityCertifications: destination.sustainabilityCertifications
      ? getBilingualArray(destination.sustainabilityCertifications, language)
      : undefined,
    currentLanguage: language,
  };
}

/**
 * Extract text from bilingual object
 * @param bilingualText - Object with 'id' and 'en' properties
 * @param language - Target language
 * @returns Localized text
 */
export function getBilingualText(
  bilingualText: BilingualText | string,
  language: SupportedLanguage = "id"
): string {
  if (typeof bilingualText === "string") {
    return bilingualText; // Backward compatibility
  }
  return bilingualText[language] || bilingualText.id || "";
}

/**
 * Extract array from bilingual object
 * @param bilingualArray - Object with 'id' and 'en' arrays
 * @param language - Target language
 * @returns Localized array
 */
export function getBilingualArray(
  bilingualArray: BilingualArray | string[],
  language: SupportedLanguage = "id"
): string[] {
  if (Array.isArray(bilingualArray)) {
    return bilingualArray; // Backward compatibility
  }
  return bilingualArray[language] || bilingualArray.id || [];
}

/**
 * Create bilingual text object
 * @param indonesianText - Indonesian version
 * @param englishText - English version
 * @returns BilingualText object
 */
export function createBilingualText(
  indonesianText: string,
  englishText: string
): BilingualText {
  return {
    id: indonesianText,
    en: englishText,
  };
}

/**
 * Create bilingual array object
 * @param indonesianArray - Indonesian version array
 * @param englishArray - English version array
 * @returns BilingualArray object
 */
export function createBilingualArray(
  indonesianArray: string[],
  englishArray: string[]
): BilingualArray {
  return {
    id: indonesianArray,
    en: englishArray,
  };
}

/**
 * Validate if bilingual text has both languages
 * @param bilingualText - Text to validate
 * @returns True if both languages exist
 */
export function isCompleteBilingualText(
  bilingualText: BilingualText | string
): boolean {
  if (typeof bilingualText === "string") return false;
  return !!(bilingualText.id && bilingualText.en);
}

/**
 * Validate if bilingual array has both languages
 * @param bilingualArray - Array to validate
 * @returns True if both languages exist
 */
export function isCompleteBilingualArray(
  bilingualArray: BilingualArray | string[]
): boolean {
  if (Array.isArray(bilingualArray)) return false;
  return !!(bilingualArray.id?.length > 0 && bilingualArray.en?.length > 0);
}

/**
 * Get missing languages from bilingual content
 * @param destination - Bilingual destination
 * @returns Array of missing languages
 */
export function getMissingLanguages(
  destination: BilingualPalmOilDestination
): SupportedLanguage[] {
  const missing: SupportedLanguage[] = [];

  // Check title
  if (!destination.title.id) missing.push("id");
  if (!destination.title.en) missing.push("en");

  return [...new Set(missing)]; // Remove duplicates
}

/**
 * Check if destination has complete translations
 * @param destination - Bilingual destination
 * @returns True if all required fields are translated
 */
export function hasCompleteTranslations(
  destination: BilingualPalmOilDestination
): boolean {
  return (
    isCompleteBilingualText(destination.title) &&
    isCompleteBilingualText(destination.description) &&
    isCompleteBilingualText(destination.village)
  );
}

/**
 * Get translation completion percentage
 * @param destination - Bilingual destination
 * @param language - Target language
 * @returns Percentage (0-100)
 */
export function getTranslationCompleteness(
  destination: BilingualPalmOilDestination,
  language: SupportedLanguage
): number {
  let total = 0;
  let completed = 0;

  // Check required fields
  const requiredFields = [
    destination.title,
    destination.description,
    destination.village,
    destination.programDuration,
  ];

  requiredFields.forEach((field) => {
    total++;
    if (typeof field !== "string" && field[language]) {
      completed++;
    }
  });

  // Check programs
  destination.programs.forEach((program) => {
    total += 2; // title + activities
    if (typeof program.title !== "string" && program.title[language]) {
      completed++;
    }
    if (
      !Array.isArray(program.activities) &&
      program.activities[language]?.length > 0
    ) {
      completed++;
    }
  });

  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

/**
 * Merge two language versions into bilingual destination
 * @param indonesianVersion - Indonesian content
 * @param englishVersion - English content
 * @returns Merged bilingual destination
 */
export function mergeToBilingualDestination(
  indonesianVersion: LocalizedDestination,
  englishVersion: LocalizedDestination
): Partial<BilingualPalmOilDestination> {
  return {
    _id: indonesianVersion._id,
    title: createBilingualText(indonesianVersion.title, englishVersion.title),
    slug: indonesianVersion.slug,
    description: createBilingualText(
      indonesianVersion.description,
      englishVersion.description
    ),
    village: createBilingualText(
      indonesianVersion.village,
      englishVersion.village
    ),
    images: indonesianVersion.images,
    coverImage: indonesianVersion.coverImage,
    banner: indonesianVersion.banner,
    type: indonesianVersion.type,
    socialImpactScore: indonesianVersion.socialImpactScore,
    programDuration: createBilingualText(
      indonesianVersion.programDuration,
      englishVersion.programDuration
    ),
    beneficiaries: createBilingualArray(
      indonesianVersion.beneficiaries,
      englishVersion.beneficiaries
    ),
    // Add more fields as needed...
  };
}
