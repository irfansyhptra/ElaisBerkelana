// src/components/SocialEmbed.tsx (Diperbaiki)
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

      {/* Placeholder untuk Instagram dan TikTok */}
      {instagramUrl && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Postingan Instagram
          </h3>
          <div className="bg-white/10 p-4 rounded-lg text-center text-white/70">
            <p>Embed Instagram akan ditampilkan di sini.</p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Lihat Postingan
            </a>
          </div>
        </div>
      )}

      {tiktokUrl && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Video TikTok
          </h3>
          <div className="bg-white/10 p-4 rounded-lg text-center text-white/70">
            <p>Embed TikTok akan ditampilkan di sini.</p>
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Lihat Video
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialEmbed;
