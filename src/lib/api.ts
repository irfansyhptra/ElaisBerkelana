// src/lib/api.ts
import { Country, Province, Destination } from "@/types";

const API_URL = "https://elaeis-berkelana-backend.vercel.app/api/v1";
const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || "your-default-admin-key";

// --- Public API ---
export const getCountries = async (): Promise<Country[]> => {
  const res = await fetch(`${API_URL}/countries`);
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
};

export const getProvincesByCountry = async (
  countryId: string
): Promise<Province[]> => {
  const res = await fetch(`${API_URL}/provinces?countryId=${countryId}`);
  if (!res.ok) throw new Error("Failed to fetch provinces");
  return res.json();
};

export const getDestinations = async (
  filters: { provinceSlug?: string; featured?: boolean } = {}
): Promise<Destination[]> => {
  const params = new URLSearchParams();
  if (filters.provinceSlug) params.append("provinceSlug", filters.provinceSlug);
  if (filters.featured) params.append("featured", "true");

  const res = await fetch(`${API_URL}/destinations?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch destinations");
  const data = await res.json();
  return data.items;
};

export const getDestinationBySlug = async (
  slug: string
): Promise<Destination> => {
  const res = await fetch(`${API_URL}/destinations/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch destination");
  return res.json();
};

export const getVisitorCount = async (): Promise<{ count: number }> => {
  const res = await fetch(`${API_URL}/visitors`);
  if (!res.ok) throw new Error("Failed to fetch visitor count");
  return res.json();
};

export const incrementVisitorCount = async (): Promise<{ count: number }> => {
  const res = await fetch(`${API_URL}/visitors/increment`, { method: "PATCH" });
  if (!res.ok) throw new Error("Failed to increment visitor count");
  return res.json();
};

// --- Admin API ---
export const createCountry = async (formData: FormData): Promise<Country> => {
  console.log("Admin Key being used:", ADMIN_KEY);
  console.log("API URL:", `${API_URL}/countries`);

  const res = await fetch(`${API_URL}/countries`, {
    method: "POST",
    headers: { "x-admin-key": ADMIN_KEY },
    body: formData,
  });

  console.log("Response status:", res.status);
  console.log("Response statusText:", res.statusText);

  if (!res.ok) throw new Error("Failed to create country");
  return res.json();
};

export const createProvince = async (
  data: Partial<Province>
): Promise<Province> => {
  const res = await fetch(`${API_URL}/provinces`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-admin-key": ADMIN_KEY },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create province");
  return res.json();
};

export const createDestination = async (
  data: Partial<Destination>
): Promise<Destination> => {
  const res = await fetch(`${API_URL}/destinations`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-admin-key": ADMIN_KEY },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create destination");
  return res.json();
};
