// src/lib/api.ts
import { Country, Province, Destination } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || "supersecret123";

// Helper untuk menangani respons API
async function handleResponse(res: Response) {
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Terjadi kesalahan pada server.");
  }
  return data.data;
}

// --- Public API ---
export const getCountries = async (): Promise<Country[]> => {
  const res = await fetch(`${API_URL}/countries`, {
    headers: { "x-admin-key": ADMIN_KEY },
  });
  return handleResponse(res);
};

export const getProvincesByCountry = async (
  countryId: string
): Promise<Province[]> => {
  const res = await fetch(`${API_URL}/provinces?countryId=${countryId}`, {
    headers: { "x-admin-key": ADMIN_KEY },
  });
  return handleResponse(res);
};

export const getDestinations = async (
  filters: {
    provinceSlug?: string;
    countrySlug?: string;
    featured?: boolean;
  } = {}
): Promise<Destination[]> => {
  const params = new URLSearchParams();
  if (filters.provinceSlug) params.append("provinceSlug", filters.provinceSlug);
  if (filters.countrySlug) params.append("countrySlug", filters.countrySlug);
  if (filters.featured) params.append("featured", "true");

  const res = await fetch(`${API_URL}/destinations?${params.toString()}`, {
    headers: { "x-admin-key": ADMIN_KEY },
  });
  const data = await res.json();
  if (!res.ok || !data.success)
    throw new Error(data.message || "Gagal mengambil data destinasi.");
  return data.data.items;
};

export const getDestinationBySlug = async (
  slug: string
): Promise<Destination> => {
  const res = await fetch(`${API_URL}/destinations/${slug}`, {
    headers: { "x-admin-key": ADMIN_KEY },
  });
  return handleResponse(res);
};

export const getVisitorCount = async (): Promise<{ count: number }> => {
  const res = await fetch(`${API_URL}/visitors`);
  return res.json();
};

export const incrementVisitorCount = async (): Promise<{ count: number }> => {
  const res = await fetch(`${API_URL}/visitors/increment`, { method: "PATCH" });
  return res.json();
};

// --- Admin API ---
export const createCountry = async (formData: FormData): Promise<Country> => {
  const res = await fetch(`${API_URL}/countries`, {
    method: "POST",
    headers: { "x-admin-key": ADMIN_KEY },
    body: formData,
  });
  return handleResponse(res);
};

export const createProvince = async (
  data: Partial<Province>
): Promise<Province> => {
  const res = await fetch(`${API_URL}/provinces`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-admin-key": ADMIN_KEY },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const createDestination = async (
  data: Partial<Destination> | Record<string, unknown>
): Promise<Destination> => {
  const res = await fetch(`${API_URL}/destinations`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-admin-key": ADMIN_KEY },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

// --- Contact API ---
export const createContact = async (data: {
  name: string;
  email: string;
  message: string;
}): Promise<{ message: string }> => {
  const res = await fetch(`${API_URL}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await handleResponse(res);
  return { message: result.message || "Pesan berhasil terkirim!" };
};

// Delete destination
export const deleteDestination = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/destinations/${id}`, {
    method: "DELETE",
    headers: { "x-admin-key": ADMIN_KEY },
  });
  await handleResponse(res);
};

// Update destination
export const updateDestination = async (
  id: string,
  data: Partial<Destination> | Record<string, unknown>
): Promise<Destination> => {
  const res = await fetch(`${API_URL}/destinations/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "x-admin-key": ADMIN_KEY },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const getContacts = async (
  filters: {
    status?: string;
    page?: number;
    limit?: number;
  } = {}
): Promise<{
  contacts: Array<{
    _id: string;
    name: string;
    email: string;
    message: string;
    status: string;
    createdAt: string;
  }>;
  pagination: {
    page: number;
    total: number;
    pages: number;
  };
}> => {
  const params = new URLSearchParams();
  if (filters.status) params.append("status", filters.status);
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());

  const res = await fetch(`${API_URL}/contacts?${params.toString()}`, {
    headers: { "x-admin-key": ADMIN_KEY },
  });
  return handleResponse(res);
};

// --- Upload API ---
export interface UploadResult {
  publicId: string;
  url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export const uploadImage = async (file: File): Promise<UploadResult> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_URL}/upload/image`, {
    method: "POST",
    headers: { "x-admin-key": ADMIN_KEY },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Gagal mengunggah gambar.");
  }
  return data.data;
};

export const uploadMultipleImages = async (
  files: File[]
): Promise<UploadResult[]> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  const res = await fetch(`${API_URL}/upload/images`, {
    method: "POST",
    headers: { "x-admin-key": ADMIN_KEY },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Gagal mengunggah gambar.");
  }
  return data.data;
};

export const deleteImage = async (publicId: string): Promise<void> => {
  const res = await fetch(
    `${API_URL}/upload/image/${encodeURIComponent(publicId)}`,
    {
      method: "DELETE",
      headers: { "x-admin-key": ADMIN_KEY },
    }
  );

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Gagal menghapus gambar.");
  }
};

// --- Gallery API ---
export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  village: string;
  country: string;
  province: string;
  type: string;
  createdAt: string;
  category: "cover" | "banner" | "gallery";
  destinationId: string;
  imageIndex?: number;
}

export interface GalleryResponse {
  success: boolean;
  count: number;
  total?: number;
  totalPages?: number;
  currentPage?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
  data: GalleryImage[];
  destinations?: number;
}

export const getAllDestinationImages = async (): Promise<GalleryImage[]> => {
  const res = await fetch(`${API_URL}/gallery/images`, {
    headers: { "x-admin-key": ADMIN_KEY },
  });
  const data: GalleryResponse = await res.json();
  if (!res.ok || !data.success) {
    throw new Error("Failed to fetch destination images");
  }
  return data.data;
};

export const getDestinationImagesWithPagination = async (
  options: {
    page?: number;
    limit?: number;
    category?: "cover" | "banner" | "gallery" | "all";
    type?: "village" | "plantation" | "mill" | "research" | "community";
  } = {}
): Promise<GalleryResponse> => {
  const params = new URLSearchParams();
  if (options.page) params.append("page", options.page.toString());
  if (options.limit) params.append("limit", options.limit.toString());
  if (options.category) params.append("category", options.category);
  if (options.type) params.append("type", options.type);

  const res = await fetch(
    `${API_URL}/gallery/images/paginated?${params.toString()}`,
    {
      headers: { "x-admin-key": ADMIN_KEY },
    }
  );
  const data: GalleryResponse = await res.json();
  if (!res.ok || !data.success) {
    throw new Error("Failed to fetch paginated destination images");
  }
  return data;
};

// --- Media API ---
export interface MediaItem {
  _id: string;
  desa?: {
    _id: string;
    name: string;
    slug: string;
  };
  type: "image" | "youtube";
  caption?: string;
  tags?: string[];
  image?: {
    url: string;
    publicId: string;
    width: number;
    height: number;
    format: string;
  };
  youtube?: {
    videoId: string;
    originalUrl: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MediaResponse {
  page: number;
  total: number;
  pages: number;
  items: MediaItem[];
}

export const getMedia = async (
  options: {
    desaId?: string;
    type?: "image" | "youtube";
    page?: number;
    limit?: number;
  } = {}
): Promise<MediaResponse> => {
  const params = new URLSearchParams();
  if (options.desaId) params.append("desaId", options.desaId);
  if (options.type) params.append("type", options.type);
  if (options.page) params.append("page", options.page.toString());
  if (options.limit) params.append("limit", options.limit.toString());

  const res = await fetch(`${API_URL}/media?${params.toString()}`, {
    headers: { "x-admin-key": ADMIN_KEY },
  });
  const data: MediaResponse = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch media");
  }
  return data;
};

export const getYouTubeVideos = async (
  options: { limit?: number } = {}
): Promise<MediaItem[]> => {
  const response = await getMedia({
    type: "youtube",
    limit: options.limit || 6,
    page: 1,
  });
  return response.items;
};
