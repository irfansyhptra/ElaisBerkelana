// src/components/SocialEmbed.tsx
interface SocialEmbedProps {
  youtubeUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

const SocialEmbed = ({
  youtubeUrl,
  instagramUrl,
  tiktokUrl,
}: SocialEmbedProps) => {
  const getYoutubeEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="space-y-6">
      {youtubeUrl && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Video Perjalanan
          </h3>
          <div className="aspect-video">
            <iframe
              src={getYoutubeEmbedUrl(youtubeUrl)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
      {/* Tambahkan embed untuk Instagram dan TikTok di sini jika diperlukan */}
    </div>
  );
};

export default SocialEmbed;
