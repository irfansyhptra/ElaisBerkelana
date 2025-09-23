// Image path utilities for consistent image loading
export const normalizeImagePath = (path: string): string => {
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

export const validateImagePath = (path: string): boolean => {
  // Check if path is valid and points to a supported image format
  const supportedFormats = [".jpg", ".jpeg", ".png", ".webp", ".svg"];
  const normalizedPath = normalizeImagePath(path);

  return supportedFormats.some((format) =>
    normalizedPath.toLowerCase().endsWith(format)
  );
};

export const getImageFallback = (originalPath: string): string => {
  // Provide appropriate fallback based on the type of image
  if (originalPath.includes("/destinations/")) {
    return "/images/destinations/gayo.jpg";
  } else if (originalPath.includes("/team/")) {
    return "/images/destinations/indo.jpg";
  } else if (originalPath.includes("/testimonials/")) {
    return "/images/destinations/gayo.jpg";
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
