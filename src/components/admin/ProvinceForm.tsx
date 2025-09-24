// src/components/admin/ProvinceForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Country, Province } from "@/types";
import { getCountries, createProvince } from "@/lib/api";

const ProvinceForm = () => {
  const [formData, setFormData] = useState<{ name: string; countryId: string }>(
    {
      name: "",
      countryId: "",
    }
  );
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryData = await getCountries();
        setCountries(countryData);
      } catch (err) {
        setError("Gagal memuat data negara.");
      }
    };
    fetchCountries();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.countryId) {
      setError("Nama provinsi dan negara harus diisi.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const newProvinceData: Partial<Province> = {
        name: formData.name,
        country: formData.countryId,
      };
      await createProvince(newProvinceData);
      setSuccess("Provinsi berhasil ditambahkan!");
      setFormData({ name: "", countryId: "" }); // Reset form
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
      <h2 className="text-2xl font-bold text-gray-800">Kelola Data Provinsi</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded">{success}</div>
      )}
      <div>
        <label
          htmlFor="countryId"
          className="block text-gray-700 font-semibold mb-2"
        >
          Pilih Negara
        </label>
        <select
          id="countryId"
          name="countryId"
          value={formData.countryId}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md bg-white focus:ring-2 focus:ring-green-500"
        >
          <option value="" disabled>
            -- Pilih Negara --
          </option>
          {countries.map((country) => (
            <option key={country._id} value={country._id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-gray-700 font-semibold mb-2"
        >
          Nama Provinsi
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Contoh: Aceh"
          required
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
      >
        {loading ? "Menyimpan..." : "Simpan Provinsi"}
      </button>
    </form>
  );
};

export default ProvinceForm;
