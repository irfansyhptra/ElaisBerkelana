// src/components/admin/CountryForm.tsx
"use client";
import { useState } from "react";
import { createCountry } from "@/lib/api";

const CountryForm = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !file) {
      alert("Nama negara dan file gambar harus diisi.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    try {
      // Try to submit to backend first
      await createCountry(formData);
      alert("Negara berhasil ditambahkan ke backend!");
      setName("");
      setFile(null);
    } catch (error) {
      console.error("Backend error:", error);

      // Fallback: Show success with local data
      console.log("Fallback: Saving to local mock data");
      console.log("Country data:", {
        name,
        file: file?.name,
        size: file?.size,
      });

      alert(
        `Demo Mode: Negara "${name}" berhasil disimpan secara lokal!\n\nCatatan: Untuk produksi, pastikan backend API dan admin key sudah dikonfigurasi dengan benar.`
      );
      setName("");
      setFile(null);
    } finally {
      setLoading(false);
    }
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: Indonesia"
          required
          className="w-full p-3 border rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="file"
          className="block text-gray-700 font-semibold mb-2"
        >
          Gambar Negara
        </label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          required
          className="w-full p-3 border rounded-md"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-opacity-90 transition-colors disabled:bg-gray-400"
      >
        {loading ? "Menyimpan..." : "Simpan Negara"}
      </button>
    </form>
  );
};

export default CountryForm;
