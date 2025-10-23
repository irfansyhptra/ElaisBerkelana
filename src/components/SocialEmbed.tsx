// src/components/SocialEmbed.tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SocialMedia } from "@/types";

// Extend window object for Instagram and TikTok embed scripts
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
    tiktokEmbed?: {
      load: () => void;
    };
  }
}

interface SocialEmbedProps {
  socialMedia?: SocialMedia;
}

const SocialEmbed = ({ socialMedia }: SocialEmbedProps) => {
  const [activeTab, setActiveTab] = useState<
    "youtube" | "instagram" | "tiktok" | null
  >(null);

  useEffect(() => {
    // Set active tab to first available social media
    if (socialMedia?.youtube?.length) {
      setActiveTab("youtube");
    } else if (socialMedia?.instagram?.length) {
      setActiveTab("instagram");
    } else if (socialMedia?.tiktok?.length) {
      setActiveTab("tiktok");
    }
  }, [socialMedia]);

  // Load Instagram script when Instagram tab becomes active
  useEffect(() => {
    if (activeTab === "instagram") {
      const timer = setTimeout(() => {
        loadInstagramScript();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  // Load TikTok script when TikTok tab becomes active
  useEffect(() => {
    if (activeTab === "tiktok") {
      const timer = setTimeout(() => {
        loadTikTokScript();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const getYoutubeEmbedUrl = (url: string) => {
    // Handle various YouTube URL formats
    let videoId = "";
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("/embed/")) {
      videoId = url.split("/embed/")[1]?.split("?")[0];
    }
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
      : url;
  };

  const getInstagramPostId = (url: string) => {
    // Extract post ID from Instagram URL (both /p/ for posts and /reel/ for reels)
    const postMatch = url.match(/\/p\/([A-Za-z0-9_-]+)/);
    const reelMatch = url.match(/\/reel\/([A-Za-z0-9_-]+)/);
    const reelsMatch = url.match(/\/reels\/([A-Za-z0-9_-]+)/); // Handle /reels/ variant
    return postMatch
      ? postMatch[1]
      : reelMatch
      ? reelMatch[1]
      : reelsMatch
      ? reelsMatch[1]
      : null;
  };

  const isInstagramReel = (url: string) => {
    // Check if URL is an Instagram Reel (handle both /reel/ and /reels/)
    return url.includes("/reel/") || url.includes("/reels/");
  };

  const getTikTokVideoId = (url: string) => {
    // Extract TikTok video ID from URL
    const match = url.match(/\/video\/(\d+)/);
    return match ? match[1] : null;
  };

  const loadInstagramScript = () => {
    if (
      !window.instgrm &&
      !document.querySelector('script[src*="instagram.com/embed.js"]')
    ) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  };

  const loadTikTokScript = () => {
    if (
      !window.tiktokEmbed &&
      !document.querySelector('script[src*="tiktok.com/embed.js"]')
    ) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  };

  if (
    !socialMedia ||
    (!socialMedia.youtube?.length &&
      !socialMedia.instagram?.length &&
      !socialMedia.tiktok?.length)
  ) {
    return null;
  }

  const tabs = [
    {
      key: "youtube",
      label: "🎥 YouTube",
      count: socialMedia.youtube?.length || 0,
    },
    {
      key: "instagram",
      label: "📸 Instagram",
      count: socialMedia.instagram?.length || 0,
    },
    {
      key: "tiktok",
      label: "🎵 TikTok",
      count: socialMedia.tiktok?.length || 0,
    },
  ].filter((tab) => tab.count > 0);

  return (
    <div className="glass-card p-4 sm:p-6 lg:p-8">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
        📱 Media Sosial
      </h3>

      {/* Tab Navigation - More responsive */}
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() =>
              setActiveTab(tab.key as "youtube" | "instagram" | "tiktok")
            }
            className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 touch-manipulation ${
              activeTab === tab.key
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25 scale-105"
                : "bg-white/10 text-white/70 hover:bg-white/20 active:scale-95"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "youtube" && socialMedia.youtube && (
          <motion.div
            key="youtube"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3 sm:space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              {socialMedia.youtube.map((url, index) => (
                <div
                  key={index}
                  className="relative w-full"
                  style={{ paddingBottom: "56.25%" }} // 16:9 aspect ratio
                >
                  <iframe
                    src={getYoutubeEmbedUrl(url)}
                    title={`YouTube video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "instagram" && socialMedia.instagram && (
          <motion.div
            key="instagram"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3 sm:space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {socialMedia.instagram.map((url, index) => {
                const postId = getInstagramPostId(url);
                const isReel = isInstagramReel(url);

                return (
                  <div key={index} className="w-full mx-auto">
                    {isReel ? (
                      // Instagram Reels - Show button to redirect (Responsive)
                      <div
                        className="relative w-full mx-auto bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
                        style={{ paddingBottom: "177.78%" }} // 9:16 aspect ratio
                      >
                        {/* Instagram gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-orange-600/20 backdrop-blur-sm"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
                          {/* Instagram Reels Icon */}
                          <div className="mb-4 sm:mb-6">
                            <svg
                              className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-lg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12.823 1l2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.027L8.55 1zm2.327 0h.298c3.06 0 4.468.754 5.64 1.887a6.007 6.007 0 011.596 2.82l.07.295h-4.629zm3.2 7.988a5.008 5.008 0 01.303-.27c.556-.453 1.126-.808 1.747-1.06l.677-.27v11.364l-.942-1.675c-1.046-1.858-2.015-2.843-3.494-3.548zm-1.673 1.012H7.227c-.012 1.965-.03 3.61-.025 5.038.01 1.985.082 3.487.312 4.623.22 1.076.558 1.885 1.146 2.663C9.426 23.116 10.82 24 12.867 24c.58 0 1.075-.066 1.522-.19.924-.255 1.628-.745 2.15-1.425.577-.753.98-1.73 1.24-2.94.286-1.314.409-2.86.412-4.662.002-1.348-.006-2.857-.017-4.538zm-8.835-2.007l.002-.02h-.018l.016.02zm8.835 2.007zm6.724-3.012h-4.23l2.117-3.77c.447.46.84.968 1.14 1.48-.013.016-.022.033-.036.048a6.658 6.658 0 01-1.166.958c-.374.252-.752.475-1.127.684l-1.675-.348h-2.01l3.986-7.014h2.01l2.117 3.77a9.96 9.96 0 01-.606 1.512 7.473 7.473 0 01-.52.83z" />
                            </svg>
                          </div>

                          {/* Title */}
                          <h4 className="text-white font-bold text-lg sm:text-xl mb-2 drop-shadow-md">
                            Instagram Reels
                          </h4>

                          {/* Description */}
                          <p className="text-white/90 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed drop-shadow px-2">
                            Klik tombol di bawah untuk menonton Reels ini di
                            Instagram
                          </p>

                          {/* Button - More responsive */}
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-900 font-bold text-sm sm:text-base rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 touch-manipulation"
                          >
                            {/* Button glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>

                            {/* Instagram icon */}
                            <svg
                              className="w-5 h-5 sm:w-6 sm:h-6 relative flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>

                            <span className="relative whitespace-nowrap">
                              Buka di Instagram
                            </span>

                            {/* Arrow icon */}
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 relative group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </a>

                          {/* Small info text */}
                          <p className="text-white/60 text-xs mt-3 sm:mt-4 drop-shadow">
                            Reels #{index + 1}
                          </p>
                        </div>

                        {/* Decorative elements - Responsive */}
                        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-12 sm:w-20 h-12 sm:h-20 bg-white/10 rounded-full blur-xl sm:blur-2xl"></div>
                        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-10 sm:w-16 h-10 sm:h-16 bg-pink-500/20 rounded-full blur-lg sm:blur-xl"></div>
                      </div>
                    ) : postId ? (
                      // Regular Instagram Post - Show embed (Responsive)
                      <div className="w-full">
                        <blockquote
                          className="instagram-media"
                          data-instgrm-permalink={url}
                          data-instgrm-version="14"
                          style={{
                            background: "#FFF",
                            border: "0",
                            borderRadius: "12px",
                            boxShadow:
                              "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                            margin: "0 auto",
                            maxWidth: "540px",
                            minWidth: "280px",
                            padding: "0",
                            width: "100%",
                          }}
                        >
                          <div style={{ padding: "16px" }}>
                            <a
                              href={url}
                              style={{
                                background: "#FFFFFF",
                                lineHeight: "0",
                                padding: "0 0",
                                textAlign: "center",
                                textDecoration: "none",
                                width: "100%",
                              }}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Lihat postingan ini di Instagram
                            </a>
                          </div>
                        </blockquote>
                      </div>
                    ) : (
                      // Invalid URL
                      <div
                        className="w-full bg-gray-800 rounded-lg flex items-center justify-center p-8"
                        style={{ paddingBottom: "100%" }}
                      >
                        <p className="text-white/60 absolute">
                          Invalid Instagram URL
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === "tiktok" && socialMedia.tiktok && (
          <motion.div
            key="tiktok"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3 sm:space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {socialMedia.tiktok.map((url, index) => {
                const videoId = getTikTokVideoId(url);
                const username = url.match(/@([^/]+)/)?.[1];
                return (
                  <div key={index} className="w-full mx-auto">
                    {videoId && username ? (
                      <div className="w-full max-w-md mx-auto">
                        <blockquote
                          className="tiktok-embed"
                          cite={url}
                          data-video-id={videoId}
                          data-embed-from="oembed"
                          style={{
                            maxWidth: "100%",
                            minWidth: "280px",
                            margin: "0 auto",
                          }}
                        >
                          <section>
                            <a
                              target="_blank"
                              title={`@${username}`}
                              href={`https://www.tiktok.com/@${username}?refer=embed`}
                              rel="noopener noreferrer"
                            >
                              @{username}
                            </a>
                            <p>
                              <a
                                target="_blank"
                                title="♬ original sound"
                                href={url}
                                rel="noopener noreferrer"
                              >
                                Lihat video TikTok ini
                              </a>
                            </p>
                          </section>
                        </blockquote>
                      </div>
                    ) : (
                      <div
                        className="w-full bg-gray-800 rounded-lg flex items-center justify-center p-8 relative"
                        style={{ paddingBottom: "177.78%" }}
                      >
                        <p className="text-white/60 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          Invalid TikTok URL
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialEmbed;
