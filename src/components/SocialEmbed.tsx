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
    // Extract post ID from Instagram URL
    const match = url.match(/\/p\/([A-Za-z0-9_-]+)/);
    return match ? match[1] : null;
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
    <div className="glass-card p-6">
      <h3 className="text-2xl font-bold text-white mb-6">📱 Media Sosial</h3>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() =>
              setActiveTab(tab.key as "youtube" | "instagram" | "tiktok")
            }
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === tab.key
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                : "bg-white/10 text-white/70 hover:bg-white/20"
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
            className="space-y-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {socialMedia.youtube.map((url, index) => (
                <div key={index} className="aspect-video">
                  <iframe
                    src={getYoutubeEmbedUrl(url)}
                    title={`YouTube video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg shadow-lg"
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
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {socialMedia.instagram.map((url, index) => {
                const postId = getInstagramPostId(url);
                return (
                  <div key={index} className="max-w-sm mx-auto">
                    {postId ? (
                      <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={url}
                        data-instgrm-version="14"
                        style={{
                          background: "#FFF",
                          border: "0",
                          borderRadius: "3px",
                          boxShadow:
                            "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                          margin: "1px",
                          maxWidth: "540px",
                          minWidth: "326px",
                          padding: "0",
                          width: "99.375%",
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
                    ) : (
                      <div className="aspect-square max-w-sm mx-auto bg-gray-800 rounded-lg flex items-center justify-center">
                        <p className="text-white/60">Invalid Instagram URL</p>
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
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {socialMedia.tiktok.map((url, index) => {
                const videoId = getTikTokVideoId(url);
                const username = url.match(/@([^/]+)/)?.[1];
                return (
                  <div key={index} className="max-w-xs mx-auto">
                    {videoId && username ? (
                      <blockquote
                        className="tiktok-embed"
                        cite={url}
                        data-video-id={videoId}
                        data-embed-from="oembed"
                        style={{
                          maxWidth: "605px",
                          minWidth: "325px",
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
                    ) : (
                      <div className="aspect-[9/16] max-w-xs mx-auto bg-gray-800 rounded-lg flex items-center justify-center">
                        <p className="text-white/60 text-center">
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
