// src/hooks/useBilingualData.ts
// Custom hooks for automatic bilingual data fetching based on Redux language state

import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import type {
  LocalizedDestination,
  SupportedLanguage,
} from "@/types/bilingual";
import {
  getBilingualDestination,
  getBilingualDestinations,
} from "@/lib/bilingualApi";

interface UseBilingualDestinationResult {
  destination: LocalizedDestination | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface UseBilingualDestinationsResult {
  destinations: LocalizedDestination[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook untuk fetch single destination dengan language otomatis dari Redux
 * @param slug - Destination slug
 * @returns Destination data, loading state, error, dan refetch function
 */
export function useBilingualDestination(
  slug: string
): UseBilingualDestinationResult {
  const language = useSelector(
    (state: RootState) => state.i18n.currentLanguage as SupportedLanguage
  );
  const [destination, setDestination] = useState<LocalizedDestination | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDestination = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBilingualDestination(slug, language);
      setDestination(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [slug, language]);

  useEffect(() => {
    if (slug) {
      fetchDestination();
    }
  }, [slug, fetchDestination]);

  return {
    destination,
    loading,
    error,
    refetch: fetchDestination,
  };
}

/**
 * Hook untuk fetch multiple destinations dengan language otomatis dari Redux
 * @param filters - Optional filters (provinceSlug, countrySlug, featured)
 * @returns Array of destinations, loading state, error, dan refetch function
 */
export function useBilingualDestinations(
  filters: {
    provinceSlug?: string;
    countrySlug?: string;
    featured?: boolean;
  } = {}
): UseBilingualDestinationsResult {
  const language = useSelector(
    (state: RootState) => state.i18n.currentLanguage as SupportedLanguage
  );
  const [destinations, setDestinations] = useState<LocalizedDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDestinations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBilingualDestinations(language, filters);
      setDestinations(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [language, filters]);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  return {
    destinations,
    loading,
    error,
    refetch: fetchDestinations,
  };
}

/**
 * Hook untuk fetch featured destinations
 * Shorthand untuk useBilingualDestinations dengan featured: true
 */
export function useFeaturedDestinations(): UseBilingualDestinationsResult {
  return useBilingualDestinations({ featured: true });
}

/**
 * Hook untuk fetch destinations by province
 * @param provinceSlug - Province slug
 */
export function useDestinationsByProvince(
  provinceSlug: string
): UseBilingualDestinationsResult {
  return useBilingualDestinations({ provinceSlug });
}

/**
 * Hook untuk fetch destinations by country
 * @param countrySlug - Country slug
 */
export function useDestinationsByCountry(
  countrySlug: string
): UseBilingualDestinationsResult {
  return useBilingualDestinations({ countrySlug });
}

/**
 * Hook untuk mendapatkan language saat ini dari Redux
 * Utility hook untuk komponen yang perlu tahu language tanpa fetch data
 */
export function useCurrentLanguage(): SupportedLanguage {
  return useSelector(
    (state: RootState) => state.i18n.currentLanguage as SupportedLanguage
  );
}

/**
 * Hook untuk check apakah sedang dalam bahasa Indonesia
 */
export function useIsIndonesian(): boolean {
  const language = useCurrentLanguage();
  return language === "id";
}

/**
 * Hook untuk check apakah sedang dalam bahasa Inggris
 */
export function useIsEnglish(): boolean {
  const language = useCurrentLanguage();
  return language === "en";
}
