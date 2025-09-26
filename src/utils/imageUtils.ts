// Image path utilities for consistent image loading
export const normalizeImagePath = (path: string | undefined | null): string => {
  // Handle null, undefined, or empty path
  if (!path || typeof path !== "string" || path.trim() === "") {
    return getImageFallback("");
  }

  // Handle Cloudinary URLs (keep as is)
  if (
    path.includes("cloudinary.com") ||
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  // Remove /public/ prefix if it exists
  if (path.startsWith("/public/")) {
    return path.replace("/public/", "/");
  }

  // Ensure path starts with /
  if (!path.startsWith("/")) {
    return `/${path}`;
  }

  return path;
};

export const validateImagePath = (path: string | undefined | null): boolean => {
  // Check if path is valid and points to a supported image format
  if (!path || typeof path !== "string") {
    return false;
  }

  const supportedFormats = [".jpg", ".jpeg", ".png", ".webp", ".svg"];
  const normalizedPath = normalizeImagePath(path);

  return supportedFormats.some((format) =>
    normalizedPath.toLowerCase().endsWith(format)
  );
};

export const getImageFallback = (
  originalPath: string | undefined | null
): string => {
  // Provide appropriate fallback based on the type of image
  if (originalPath && typeof originalPath === "string") {
    if (originalPath.includes("/destinations/")) {
      return "/images/destinations/gayo.jpg";
    } else if (originalPath.includes("/team/")) {
      return "/images/destinations/indo.jpg";
    } else if (originalPath.includes("/testimonials/")) {
      return "/images/destinations/gayo.jpg";
    }
  }

  // Default fallback
  return "/images/destinations/gayo.jpg";
};

// Available images in the public folder
export const availableImages = {
  destinations: [
    "/images/destinations/gayo.jpg",
    "/images/destinations/indo.jpg",
  ],
  hero: ["/hero-background.png", "/hero-background1.jpg"],
};

// Helper to get a random available image for testing
export const getRandomAvailableImage = (): string => {
  const allImages = [...availableImages.destinations, ...availableImages.hero];
  return allImages[Math.floor(Math.random() * allImages.length)];
};
