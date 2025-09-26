// src/components/YouTubeSection.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, MapPin, Calendar, ExternalLink } from "lucide-react";
import { getYouTubeVideos, MediaItem } from "@/lib/api";

interface YouTubeSectionProps {
  className?: string;
}

const YouTubeSection = ({ className = "" }: YouTubeSectionProps) => {
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const data = await getYouTubeVideos({ limit: 6 });
        setVideos(data);
        if (data.length > 0) {
          setSelectedVideo(data[0]); // Set first video as default
        }
      } catch (err) {
        console.error("Failed to load YouTube videos:", err);
        setError("Gagal memuat video dokumentasi");
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getYouTubeThumbnail = (
    videoId: string,
    quality: string = "maxresdefault"
  ) => {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  if (loading) {
    return (
      <div className={`py-20 ${className}`}>
        <div className="flex items-center justify-center">
          <div className="glass-card flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
            <span className="text-gray-700 text-lg">
              Memuat video dokumentasi...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error || videos.length === 0) {
    return (
      <div className={`py-20 ${className}`}>
        <div className="flex items-center justify-center">
          <div className="glass-card text-center border-red-500/30 bg-red-500/10">
            <div className="text-4xl mb-4">📹</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {error || "Belum Ada Video Dokumentasi"}
            </h3>
            <p className="text-gray-600">
              Video dokumentasi akan muncul di sini setelah diupload melalui
              admin panel.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="responsive-container">
        {/* Main Video Player */}
        {selectedVideo && (
          <div className="mb-12" data-aos="fade-up">
            <div className="glass-card-liquid overflow-hidden">
              {/* Video Iframe */}
              <div className="relative aspect-video bg-black rounded-t-2xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtube?.videoId}?autoplay=0&rel=0&modestbranding=1`}
                  title={selectedVideo.caption || "Video Dokumentasi"}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="responsive-padding">
                <h3 className="responsive-text-lg font-bold text-gray-900 mb-3">
                  {selectedVideo.caption || "Video Dokumentasi"}
                </h3>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-600 mb-4 text-sm sm:text-base">
                  {selectedVideo.desa && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span>{selectedVideo.desa.name}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{formatDate(selectedVideo.createdAt)}</span>
                  </div>
                  {selectedVideo.youtube?.originalUrl && (
                    <a
                      href={selectedVideo.youtube.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Lihat di YouTube</span>
                    </a>
                  )}
                </div>
                {selectedVideo.tags && selectedVideo.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedVideo.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Video Thumbnails Grid */}
        {videos.length > 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {videos.map((video, index) => (
              <div
                key={video._id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedVideo?._id === video._id
                    ? "ring-4 ring-red-500 scale-105"
                    : "hover:scale-105 hover:shadow-lg"
                }`}
                onClick={() => setSelectedVideo(video)}
              >
                <div className="glass-card-minimal overflow-hidden">
                  <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={getYouTubeThumbnail(video.youtube?.videoId || "")}
                      alt={video.caption || "Video thumbnail"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="p-2 sm:p-3">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                      {video.caption || "Video Dokumentasi"}
                    </h4>
                    {video.desa && (
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{video.desa.name}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeSection;
