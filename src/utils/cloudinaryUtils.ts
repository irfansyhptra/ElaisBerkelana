// src/utils/cloudinaryUtils.ts
// Utility functions for handling Cloudinary images

/**
 * Generate Cloudinary URL from public ID with transformations
 */
export const getCloudinaryUrl = (
  publicId: string,
  transformations?: {
    width?: number;
    height?: number;
    quality?: "auto" | "auto:low" | "auto:good" | "auto:best" | number;
    format?: "auto" | "webp" | "jpg" | "png";
    crop?: "fill" | "fit" | "limit" | "scale" | "crop";
    gravity?: "auto" | "face" | "center" | "north" | "south" | "east" | "west";
  }
): string => {
  if (!publicId) return "";

  // If it's already a full URL, return as is
  if (publicId.startsWith("http")) {
    return publicId;
  }

  const cloudName = "djtmjbgx6"; // Your Cloudinary cloud name
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

  // Build transformation string
  let transformString = "";
  if (transformations) {
    const transforms = [];

    if (transformations.width) transforms.push(`w_${transformations.width}`);
    if (transformations.height) transforms.push(`h_${transformations.height}`);
    if (transformations.quality)
      transforms.push(`q_${transformations.quality}`);
    if (transformations.format) transforms.push(`f_${transformations.format}`);
    if (transformations.crop) transforms.push(`c_${transformations.crop}`);
    if (transformations.gravity)
      transforms.push(`g_${transformations.gravity}`);

    if (transforms.length > 0) {
      transformString = `/${transforms.join(",")}`;
    }
  }

  // Ensure publicId starts with folder if not present
  const fullPublicId = publicId.startsWith("elaeis-berkelana/")
    ? publicId
    : `elaeis-berkelana/${publicId}`;

  return `${baseUrl}${transformString}/${fullPublicId}`;
};

/**
 * Extract public ID from Cloudinary URL
 */
export const extractPublicId = (cloudinaryUrl: string): string => {
  if (!cloudinaryUrl || !cloudinaryUrl.includes("cloudinary.com")) {
    return cloudinaryUrl; // Return as is if not a Cloudinary URL
  }

  try {
    // Match pattern: /elaeis-berkelana/filename.extension
    const match = cloudinaryUrl.match(
      /\/elaeis-berkelana\/([^\/]+?)(?:\.[^.\/]+)?$/
    );
    if (match) {
      return `elaeis-berkelana/${match[1]}`;
    }

    // Fallback: extract from URL structure
    const parts = cloudinaryUrl.split("/");
    const uploadIndex = parts.findIndex((part) => part === "upload");
    if (uploadIndex !== -1 && uploadIndex + 1 < parts.length) {
      // Skip transformation parameters
      let startIndex = uploadIndex + 1;
      while (startIndex < parts.length && parts[startIndex].includes("_")) {
        startIndex++;
      }

      if (startIndex < parts.length) {
        const pathParts = parts.slice(startIndex);
        const filename = pathParts[pathParts.length - 1];
        const filenameWithoutExt = filename.split(".")[0];

        if (pathParts.length > 1) {
          return pathParts.slice(0, -1).join("/") + "/" + filenameWithoutExt;
        }
        return filenameWithoutExt;
      }
    }

    return cloudinaryUrl;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return cloudinaryUrl;
  }
};

/**
 * Generate optimized image URL for different use cases
 */
export const getOptimizedImageUrl = (
  publicIdOrUrl: string,
  size: "thumbnail" | "card" | "banner" | "full" = "card"
): string => {
  const sizeConfigs = {
    thumbnail: {
      width: 150,
      height: 150,
      crop: "fill" as const,
      quality: "auto:good" as const,
      format: "auto" as const,
    },
    card: {
      width: 400,
      height: 300,
      crop: "fill" as const,
      quality: "auto:good" as const,
      format: "auto" as const,
    },
    banner: {
      width: 1200,
      height: 400,
      crop: "fill" as const,
      quality: "auto:good" as const,
      format: "auto" as const,
    },
    full: {
      width: 1200,
      height: 800,
      crop: "limit" as const,
      quality: "auto:good" as const,
      format: "auto" as const,
    },
  };

  return getCloudinaryUrl(publicIdOrUrl, sizeConfigs[size]);
};

/**
 * Check if a URL is a Cloudinary URL
 */
export const isCloudinaryUrl = (url: string): boolean => {
  return url.includes("res.cloudinary.com") || url.includes("cloudinary.com");
};

/**
 * Generate blur placeholder URL (low quality version)
 */
export const getBlurDataURL = (publicIdOrUrl: string): string => {
  if (
    !isCloudinaryUrl(publicIdOrUrl) &&
    !publicIdOrUrl.startsWith("elaeis-berkelana")
  ) {
    return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";
  }

  return getCloudinaryUrl(publicIdOrUrl, {
    width: 10,
    height: 10,
    crop: "fill",
    quality: "auto:low",
    format: "auto",
  });
};
