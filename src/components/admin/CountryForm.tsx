// src/components/admin/CountryForm.tsx
"use client";

import { useState } from "react";
import { Country } from "@/types";

const CountryForm = () => {
  const [formData, setFormData] = useState<Partial<Country>>({
    name: "",
    slug: "",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    console.log("Saving Country:", formData);
    alert("Data negara (simulasi) berhasil disimpan. Cek console log.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Kelola Data Negara</h2>
      <div>
        <label
          htmlFor="name"
          className="block text-gray-700 font-semibold mb-2"
        >
          Nama Negara
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Contoh: Indonesia"
          required
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-brand-green"
        />
      </div>
      <div>
        <label
          htmlFor="imageUrl"
          className="block text-gray-700 font-semibold mb-2"
        >
          URL Gambar Cover
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          required
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-brand-green"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-brand-green text-white font-bold py-3 rounded-md hover:bg-opacity-90 transition-colors"
      >
        Simpan Negara
      </button>
    </form>
  );
};

export default CountryForm;
