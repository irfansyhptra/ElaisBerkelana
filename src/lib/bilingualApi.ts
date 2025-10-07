// src/lib/bilingualApi.ts
// API utilities for bilingual content fetching

import type {
  BilingualPalmOilDestination,
  LocalizedDestination,
  SupportedLanguage,
} from "@/types/bilingual";
import { localizeDestination } from "@/utils/bilingualUtils";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || "supersecret123";

// Helper untuk menangani respons API
async function handleResponse(res: Response) {
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Terjadi kesalahan pada server.");
  }
  return data.data;
}

/**
 * Fetch destination with bilingual support
 * @param slug - Destination slug
 * @param language - Preferred language ('id' or 'en'), default 'id'
 * @returns Localized destination
 */
export async function getBilingualDestination(
  slug: string,
  language: SupportedLanguage = "id"
): Promise<LocalizedDestination> {
  try {
    const res = await fetch(`${API_URL}/destinations/bilingual/${slug}`, {
      headers: {
        "x-admin-key": ADMIN_KEY,
        "Accept-Language": language,
      },
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    const bilingualData: BilingualPalmOilDestination = await handleResponse(
      res
    );
    return localizeDestination(bilingualData, language);
  } catch (error) {
    console.error("Error fetching bilingual destination:", error);
    throw error;
  }
}

/**
 * Fetch all destinations with bilingual support
 * @param language - Preferred language
 * @param filters - Optional filters
 * @returns Array of localized destinations
 */
export async function getBilingualDestinations(
  language: SupportedLanguage = "id",
  filters: {
    provinceSlug?: string;
    countrySlug?: string;
    featured?: boolean;
  } = {}
): Promise<LocalizedDestination[]> {
  try {
    const params = new URLSearchParams();
    if (filters.provinceSlug)
      params.append("provinceSlug", filters.provinceSlug);
    if (filters.countrySlug) params.append("countrySlug", filters.countrySlug);
    if (filters.featured) params.append("featured", "true");

    const res = await fetch(
      `${API_URL}/destinations/bilingual?${params.toString()}`,
      {
        headers: {
          "x-admin-key": ADMIN_KEY,
          "Accept-Language": language,
        },
        next: { revalidate: 60 },
      }
    );

    const bilingualDataArray: BilingualPalmOilDestination[] =
      await handleResponse(res);
    return bilingualDataArray.map((item) =>
      localizeDestination(item, language)
    );
  } catch (error) {
    console.error("Error fetching bilingual destinations:", error);
    throw error;
  }
}

/**
 * Fetch raw bilingual destination (for admin)
 * @param slug - Destination slug
 * @returns Full bilingual destination object
 */
export async function getRawBilingualDestination(
  slug: string
): Promise<BilingualPalmOilDestination> {
  try {
    const res = await fetch(`${API_URL}/destinations/bilingual/${slug}/raw`, {
      headers: { "x-admin-key": ADMIN_KEY },
    });

    return await handleResponse(res);
  } catch (error) {
    console.error("Error fetching raw bilingual destination:", error);
    throw error;
  }
}

/**
 * Create or update bilingual destination
 * @param data - Bilingual destination data
 * @param method - HTTP method ('POST' or 'PUT')
 * @returns Created/updated destination
 */
export async function saveBilingualDestination(
  data: Partial<BilingualPalmOilDestination>,
  method: "POST" | "PUT" = "POST"
): Promise<BilingualPalmOilDestination> {
  try {
    const endpoint =
      method === "PUT"
        ? `${API_URL}/destinations/bilingual/${data._id}`
        : `${API_URL}/destinations/bilingual`;

    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": ADMIN_KEY,
      },
      body: JSON.stringify(data),
    });

    return await handleResponse(res);
  } catch (error) {
    console.error("Error saving bilingual destination:", error);
    throw error;
  }
}

/**
 * Delete bilingual destination
 * @param id - Destination ID
 */
export async function deleteBilingualDestination(id: string): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/destinations/bilingual/${id}`, {
      method: "DELETE",
      headers: { "x-admin-key": ADMIN_KEY },
    });

    await handleResponse(res);
  } catch (error) {
    console.error("Error deleting bilingual destination:", error);
    throw error;
  }
}

/**
 * Get translation completeness for a destination
 * @param slug - Destination slug
 * @returns Object with completeness percentage for each language
 */
export async function getTranslationStatus(slug: string): Promise<{
  id: number;
  en: number;
  overall: number;
}> {
  try {
    const res = await fetch(
      `${API_URL}/destinations/bilingual/${slug}/translation-status`,
      {
        headers: { "x-admin-key": ADMIN_KEY },
      }
    );

    return await handleResponse(res);
  } catch (error) {
    console.error("Error fetching translation status:", error);
    throw error;
  }
}

/**
 * Switch language for client-side data fetching
 * This function is used with React hooks for dynamic language switching
 */
export function createBilingualFetcher(language: SupportedLanguage) {
  return {
    getDestination: (slug: string) => getBilingualDestination(slug, language),
    getDestinations: (filters?: {
      provinceSlug?: string;
      countrySlug?: string;
      featured?: boolean;
    }) => getBilingualDestinations(language, filters),
    getTranslationStatus: (slug: string) => getTranslationStatus(slug),
  };
}
