// src/components/admin/DestinationForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Country, Province, Destination } from "@/types";
import {
  getCountries,
  getProvincesByCountry,
  createDestination,
} from "@/lib/api";

const initialFormData: Partial<Destination> = {
  title: "",
  description: "",
  country: undefined,
  province: undefined,
  village: "",
  images: [],
  price: 0,
  rating: 0,
  duration: "",
  youtubeUrl: "",
  included: [],
  itinerary: [],
  featured: false,
};

const DestinationForm = () => {
  const [formData, setFormData] =
    useState<Partial<Destination>>(initialFormData);
  const [countries, setCountries] = useState<Country[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string>("");
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryData = await getCountries();
        setCountries(countryData);
      } catch (error) {
        console.error("Error loading countries:", error);
        setError(
          `Gagal memuat data negara: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (countryId: string) => {
    setSelectedCountryId(countryId);
    setSelectedProvinceId(""); // Reset province selection

    // Find country object
    const selectedCountry = countries.find((c) => c._id === countryId);

    setFormData((prev) => ({
      ...prev,
      country: selectedCountry || undefined,
      province: undefined,
    }));

    setProvinces([]);
    if (countryId) {
      setLoadingProvinces(true);
      try {
        const provinceData = await getProvincesByCountry(countryId);
        setProvinces(provinceData);
      } catch (error) {
        console.error("Error loading provinces:", error);
        setError("Gagal memuat data provinsi.");
      } finally {
        setLoadingProvinces(false);
      }
    }
  };

  const handleProvinceChange = (provinceId: string) => {
    setSelectedProvinceId(provinceId);

    // Find province object
    const selectedProvince = provinces.find((p) => p._id === provinceId);

    setFormData((prev) => ({
      ...prev,
      province: selectedProvince || undefined,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const isNumber = type === "number";
    const checkedValue = (e.target as HTMLInputElement).checked;

    let processedValue: string | number | boolean = value;

    if (isCheckbox) {
      processedValue = checkedValue;
    } else if (isNumber) {
      // Convert to number for numeric fields
      processedValue = value === "" ? 0 : parseFloat(value) || 0;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Prepare data for backend - convert objects to IDs and fix data types
      const dataToSend = {
        ...formData,
        country: formData.country?._id || selectedCountryId,
        province: formData.province?._id || selectedProvinceId,
        // Convert string values to numbers
        price:
          typeof formData.price === "string"
            ? parseFloat(formData.price) || 0
            : formData.price,
        rating:
          typeof formData.rating === "string"
            ? parseFloat(formData.rating) || 0
            : formData.rating,
        // Ensure itinerary has at least one item
        itinerary:
          formData.itinerary && formData.itinerary.length > 0
            ? formData.itinerary
            : [{ day: 1, activities: ["Aktivitas default"] }],
        // Ensure included is an array
        included: formData.included || [],
      };

      console.log("Sending data:", dataToSend); // For debugging

      await createDestination(dataToSend as Record<string, unknown>);
      setSuccess("Destinasi berhasil ditambahkan!");
      // Reset form
      setFormData(initialFormData);
      setSelectedCountryId("");
      setSelectedProvinceId("");
      setProvinces([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        Kelola Data Destinasi
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded">{success}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Negara *
          </label>
          <select
            name="country"
            value={selectedCountryId}
            onChange={(e) => handleCountryChange(e.target.value)}
            required
            className="w-full p-3 border rounded-md bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">-- Pilih Negara --</option>
            {countries.map((country) => (
              <option key={country._id} value={country._id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Provinsi *
          </label>
          <select
            name="province"
            value={selectedProvinceId}
            onChange={(e) => handleProvinceChange(e.target.value)}
            required
            disabled={!selectedCountryId || loadingProvinces}
            className="w-full p-3 border rounded-md bg-white disabled:bg-gray-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">
              {!selectedCountryId
                ? "-- Pilih Negara Terlebih Dahulu --"
                : loadingProvinces
                ? "-- Memuat Provinsi... --"
                : provinces.length === 0
                ? "-- Tidak Ada Provinsi --"
                : "-- Pilih Provinsi --"}
            </option>
            {provinces.map((province) => (
              <option key={province._id} value={province._id}>
                {province.name}
              </option>
            ))}
          </select>
          {!selectedCountryId && (
            <p className="text-sm text-amber-600 mt-1">
              Silakan pilih negara terlebih dahulu
            </p>
          )}
        </div>
      </div>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Nama Judul Destinasi (Contoh: Menjelajahi Kebun Sawit di Riau)"
        required
        className="w-full p-3 border rounded-md"
      />

      <input
        type="text"
        name="village"
        value={formData.village}
        onChange={handleChange}
        placeholder="Nama Desa/Kota Tujuan"
        required
        className="w-full p-3 border rounded-md"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Deskripsi Singkat Destinasi"
        required
        rows={5}
        className="w-full p-3 border rounded-md"
      ></textarea>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Harga (contoh: 500000)"
          required
          className="w-full p-3 border rounded-md"
        />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating (1-5)"
          max="5"
          min="0"
          step="0.1"
          required
          className="w-full p-3 border rounded-md"
        />
      </div>

      <input
        type="text"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        placeholder="Durasi (Contoh: 3 Hari 2 Malam)"
        required
        className="w-full p-3 border rounded-md"
      />

      <input
        type="text"
        name="youtubeUrl"
        value={formData.youtubeUrl}
        onChange={handleChange}
        placeholder="URL Video YouTube (Opsional)"
        className="w-full p-3 border rounded-md"
      />

      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
        />
        <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
          Jadikan Destinasi Unggulan (Featured)
        </label>
      </div>

      {/* Anda bisa menambahkan input untuk 'images', 'included', dan 'itinerary' di sini */}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
      >
        {loading ? "Menyimpan..." : "Simpan Destinasi"}
      </button>
    </form>
  );
};

export default DestinationForm;
