// src/components/TravelPost.tsx
import { Post } from "@/types";

interface TravelPostProps {
  post: Post;
}

const TravelPost = ({ post }: TravelPostProps) => {
  // Mengubah URL YouTube biasa menjadi URL embed
  const getEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <article className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="relative w-full h-64 bg-gray-200">
        <iframe
          src={getEmbedUrl(post.youtubeUrl)}
          title={post.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        ></iframe>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2 font-medium">
          {post.date} • {post.village}
        </p>
        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-700 leading-relaxed">{post.description}</p>
      </div>
    </article>
  );
};

export default TravelPost;
