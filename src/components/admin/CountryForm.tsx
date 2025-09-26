// src/components/admin/CountryForm.tsx
"use client";
import { useState } from "react";
import { createCountry } from "@/lib/api";

const CountryForm = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !file) {
      alert("Nama negara dan file gambar harus diisi.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    try {
      await createCountry(formData);
      setSuccess("Negara berhasil ditambahkan!");
      setName("");
      setFile(null);
      // Reset input file
      const fileInput = document.getElementById("file") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error: unknown) {
      console.error("Backend error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Gagal menambahkan negara. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/20 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Kelola Data Negara</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded">{success}</div>
      )}

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
