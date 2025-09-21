// src/components/admin/DestinationForm.tsx
"use client";

import { useState } from "react";
import { Destination } from "@/types";

const DestinationForm = () => {
  const [formData, setFormData] = useState<Partial<Destination>>({
    village: "",
    province: "",
    country: "",
    description: "",
    youtubeUrl: "",
    coverImage: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving Destination:", formData);
    alert("Data destinasi (simulasi) berhasil disimpan. Cek console log.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        Kelola Data Destinasi
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="village"
          value={formData.village}
          onChange={handleChange}
          placeholder="Nama Desa/Kota Tujuan"
          required
          className="w-full p-3 border rounded-md"
        />
        <input
          type="text"
          name="province"
          value={formData.province}
          onChange={handleChange}
          placeholder="Provinsi"
          required
          className="w-full p-3 border rounded-md"
        />
      </div>
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        placeholder="Negara"
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
      <input
        type="url"
        name="coverImage"
        value={formData.coverImage}
        onChange={handleChange}
        placeholder="URL Gambar Cover"
        required
        className="w-full p-3 border rounded-md"
      />
      <input
        type="url"
        name="youtubeUrl"
        value={formData.youtubeUrl}
        onChange={handleChange}
        placeholder="URL Video YouTube"
        className="w-full p-3 border rounded-md"
      />
      {/* Di sini bisa ditambahkan input untuk galeri, timeline, dll. */}

      <button
        type="submit"
        className="w-full bg-brand-green text-white font-bold py-3 rounded-md hover:bg-opacity-90 transition-colors"
      >
        Simpan Destinasi
      </button>
    </form>
  );
};

export default DestinationForm;
