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
    <article className="glass-card-minimal overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
      <div className="relative w-full aspect-video bg-gray-100 overflow-hidden rounded-xl">
        <iframe
          src={getEmbedUrl(post.youtubeUrl)}
          title={post.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        ></iframe>
      </div>
      <div className="p-8">
        <p className="text-sm text-gray-500 mb-4 font-medium tracking-wide uppercase">
          {post.date} • {post.village}
        </p>
        <h3 className="title-medium text-gray-900 mb-4 group-hover:text-black transition-colors leading-tight">
          {post.title}
        </h3>
        <p className="text-gray-600 leading-relaxed font-light text-lg">
          {post.description}
        </p>
      </div>
    </article>
  );
};

export default TravelPost;
