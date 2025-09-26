// src/hooks/useGalleryImages.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllDestinationImages, GalleryImage } from "@/lib/api";

interface UseGalleryImagesReturn {
  images: GalleryImage[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  lastUpdated: Date | null;
}

export const useGalleryImages = (
  refreshInterval: number = 30000 // 30 seconds default
): UseGalleryImagesReturn => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchImages = useCallback(async () => {
    try {
      setError(null);
      let fetchedImages: GalleryImage[] = [];

      try {
        fetchedImages = await getAllDestinationImages();
      } catch (apiError) {
        // Fallback to dummy data for testing
        console.warn("API not available, using dummy data:", apiError);
        fetchedImages = [
          {
            id: "dummy_1",
            url: "https://res.cloudinary.com/djtmjbgx6/image/upload/v1/elaeis-berkelana/test_image_1",
            title: "Gayo Highland Palm Oil Village",
            village: "Takengon",
            country: "Indonesia",
            province: "Aceh",
            type: "village",
            createdAt: new Date().toISOString(),
            category: "cover",
            destinationId: "dummy_dest_1",
          },
          {
            id: "dummy_2",
            url: "https://res.cloudinary.com/djtmjbgx6/image/upload/v1/elaeis-berkelana/test_image_2",
            title: "Sustainable Palm Oil Plantation",
            village: "Medan",
            country: "Indonesia",
            province: "North Sumatra",
            type: "plantation",
            createdAt: new Date().toISOString(),
            category: "banner",
            destinationId: "dummy_dest_2",
          },
          {
            id: "dummy_3",
            url: "https://res.cloudinary.com/djtmjbgx6/image/upload/v1/elaeis-berkelana/test_image_3",
            title: "Palm Oil Research Center",
            village: "Bogor",
            country: "Indonesia",
            province: "West Java",
            type: "research",
            createdAt: new Date().toISOString(),
            category: "gallery",
            destinationId: "dummy_dest_3",
          },
          {
            id: "dummy_4",
            url: "https://res.cloudinary.com/djtmjbgx6/image/upload/v1/elaeis-berkelana/test_image_4",
            title: "Community Development Program",
            village: "Pontianak",
            country: "Indonesia",
            province: "West Kalimantan",
            type: "community",
            createdAt: new Date().toISOString(),
            category: "cover",
            destinationId: "dummy_dest_4",
          },
          {
            id: "dummy_5",
            url: "https://res.cloudinary.com/djtmjbgx6/image/upload/v1/elaeis-berkelana/test_image_5",
            title: "Modern Palm Oil Mill",
            village: "Dumai",
            country: "Indonesia",
            province: "Riau",
            type: "mill",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            category: "banner",
            destinationId: "dummy_dest_5",
          },
          {
            id: "dummy_6",
            url: "https://res.cloudinary.com/djtmjbgx6/image/upload/v1/elaeis-berkelana/test_image_6",
            title: "Eco-Friendly Plantation",
            village: "Pekanbaru",
            country: "Indonesia",
            province: "Riau",
            type: "plantation",
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            category: "gallery",
            destinationId: "dummy_dest_6",
          },
          {
            id: "dummy_7",
            url: "https://res.cloudinary.com/djtmjbgx6/image/upload/v1/elaeis-berkelana/test_image_7",
            title: "Sustainable Agriculture Program",
            village: "Jambi City",
            country: "Indonesia",
            province: "Jambi",
            type: "research",
            createdAt: new Date(Date.now() - 259200000).toISOString(),
            category: "cover",
            destinationId: "dummy_dest_7",
          },
          {
            id: "dummy_8",
            url: "https://res.cloudinary.com/djtmjbgx6/image/upload/v1/elaeis-berkelana/test_image_8",
            title: "Community Training Center",
            village: "Palembang",
            country: "Indonesia",
            province: "South Sumatra",
            type: "community",
            createdAt: new Date(Date.now() - 345600000).toISOString(),
            category: "banner",
            destinationId: "dummy_dest_8",
          },
          {
            id: "dummy_9",
            url: "https://res.cloudinary.com/djtmjbgx6/image/upload/v1/elaeis-berkelana/test_image_9",
            title: "Traditional Village Empowerment",
            village: "Bengkulu",
            country: "Indonesia",
            province: "Bengkulu",
            type: "village",
            createdAt: new Date(Date.now() - 432000000).toISOString(),
            category: "gallery",
            destinationId: "dummy_dest_9",
          },
          {
            id: "dummy_10",
            url: "https://res.cloudinary.com/djtmjbgx6/image/upload/v1/elaeis-berkelana/test_image_10",
            title: "Digital Innovation Hub",
            village: "Lampung",
            country: "Indonesia",
            province: "Lampung",
            type: "research",
            createdAt: new Date(Date.now() - 518400000).toISOString(),
            category: "cover",
            destinationId: "dummy_dest_10",
          },
          {
            id: "dummy_11",
            url: "https://res.cloudinary.com/djtmjbgx6/image/upload/v1/elaeis-berkelana/test_image_11",
            title: "Smallholder Farmer Program",
            village: "Bandar Lampung",
            country: "Indonesia",
            province: "Lampung",
            type: "community",
            createdAt: new Date(Date.now() - 604800000).toISOString(),
            category: "gallery",
            destinationId: "dummy_dest_11",
          },
          {
            id: "dummy_12",
            url: "https://res.cloudinary.com/djtmjbgx6/image/upload/v1/elaeis-berkelana/test_image_12",
            title: "Zero Waste Processing Plant",
            village: "Pontianak",
            country: "Indonesia",
            province: "West Kalimantan",
            type: "mill",
            createdAt: new Date(Date.now() - 691200000).toISOString(),
            category: "banner",
            destinationId: "dummy_dest_12",
          },
        ];
      }

      // Only update if data has changed to prevent unnecessary re-renders
      setImages((prevImages) => {
        const hasChanged =
          prevImages.length !== fetchedImages.length ||
          prevImages.some(
            (img, index) =>
              !fetchedImages[index] || img.id !== fetchedImages[index].id
          );

        if (hasChanged) {
          setLastUpdated(new Date());
        }

        return hasChanged ? fetchedImages : prevImages;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load images");
      console.error("Error fetching gallery images:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    await fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    // Initial fetch
    fetchImages();

    // Set up interval for auto-refresh
    if (refreshInterval > 0) {
      const interval = setInterval(fetchImages, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchImages, refreshInterval]);

  return {
    images,
    loading,
    error,
    refresh,
    lastUpdated,
  };
};
