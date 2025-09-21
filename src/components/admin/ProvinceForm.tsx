// src/components/admin/ProvinceForm.tsx
"use client";

import { useState } from "react";
import { Province } from "@/types";
import { mockCountries } from "@/data/countries"; // Untuk dropdown

const ProvinceForm = () => {
  const [formData, setFormData] = useState<Partial<Province>>({
    name: "",
    slug: "",
    countryId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name" && {
        slug: value.toLowerCase().replace(/\s+/g, "-"),
      }),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving Province:", formData);
    alert("Data provinsi (simulasi) berhasil disimpan. Cek console log.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Kelola Data Provinsi</h2>
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
          className="w-full p-3 border rounded-md bg-white focus:ring-2 focus:ring-brand-green"
        >
          <option value="" disabled>
            -- Pilih Negara --
          </option>
          {mockCountries.map((country) => (
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
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-brand-green"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-brand-green text-white font-bold py-3 rounded-md hover:bg-opacity-90 transition-colors"
      >
        Simpan Provinsi
      </button>
    </form>
  );
};

export default ProvinceForm;
