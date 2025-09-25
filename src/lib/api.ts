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

export const getContacts = async (
  filters: {
    status?: string;
    page?: number;
    limit?: numb
    er;
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
