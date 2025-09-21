// src/components/YouTubePlayer.tsx
import React from "react";
import YouTube from "react-youtube";

interface YouTubePlayerProps {
  videoUrl: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoUrl }) => {
  // Extract video ID from URL
  const getVideoId = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : "";
  };

  const videoId = getVideoId(videoUrl);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="relative pt-[56.25%]">
      <div className="absolute top-0 left-0 w-full h-full">
        <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
      </div>
    </div>
  );
};

export default YouTubePlayer;
