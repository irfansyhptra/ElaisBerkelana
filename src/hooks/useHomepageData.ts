// src/hooks/useHomepageData.ts
"use client";

import { useState, useEffect } from "react";
import { getDestinations, getYouTubeVideos, MediaItem } from "@/lib/api";
import { Destination } from "@/types";

interface HomepageData {
  featuredDestinations: Destination[];
  youtubeVideos: MediaItem[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export const useHomepageData = (): HomepageData => {
  const [featuredDestinations, setFeaturedDestinations] = useState<
    Destination[]
  >([]);
  const [youtubeVideos, setYoutubeVideos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load featured destinations and YouTube videos in parallel
      const [destinations, videos] = await Promise.all([
        getDestinations({ featured: true }),
        getYouTubeVideos({ limit: 6 }),
      ]);

      setFeaturedDestinations(destinations.slice(0, 3)); // Show only 3 featured
      setYoutubeVideos(videos);
    } catch (err) {
      console.error("Failed to load homepage data:", err);
      setError(err instanceof Error ? err.message : "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    featuredDestinations,
    youtubeVideos,
    loading,
    error,
    refreshData,
  };
};
