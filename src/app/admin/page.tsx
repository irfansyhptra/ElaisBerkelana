"use client";

import { useState } from "react";
import { Destination } from "@/types";

interface AdminFormData extends Partial<Destination> {
  title?: string;
  date?: string;
}

const AdminPage = () => {
  const [formData, setFormData] = useState<AdminFormData>({
    village: "",
    province: "",
    description: "",
    youtubeUrl: "",
    coverImage: "",
    imageGallery: [],
    timeline: [],
    highlights: [],
    title: "",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // --- LOGIKA PENGIRIMAN DATA KE BACKEND ---
    // Di sini Anda akan mengirim `formData` ke API Express.js Anda
    // menggunakan metode POST.
    // Contoh:
    // const response = await fetch('https://your-backend.com/api/posts', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    // if(response.ok) { alert('Post berhasil ditambahkan!'); }

    console.log("Data to be sent to backend:", formData);
    alert("Data (simulasi) berhasil dikirim. Cek console log.");
    // Reset form
    setFormData({
      title: "",
      village: "",
      date: "",
      description: "",
      youtubeUrl: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-brand-dark mb-8">
          Admin Dashboard
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-semibold mb-6">
            Tambah Postingan Perjalanan Baru
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Judul Perjalanan"
              required
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              placeholder="Nama Desa"
              required
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Deskripsi Singkat"
              required
              rows={5}
              className="w-full p-3 border rounded-md"
            ></textarea>
          </div>
          <div className="mb-6">
            <input
              type="url"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleChange}
              placeholder="URL Video YouTube"
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-green text-white font-bold py-3 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Simpan Postingan
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
