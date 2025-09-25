// src/components/ContactForm.tsx
"use client";

import { useState } from "react";
import { createContact } from "@/lib/api";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await createContact(formData);
      setSuccess(result.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error: unknown) {
      setError(
        (error as Error).message || "Terjadi kesalahan. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-100">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-green-100">
          {success}
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          placeholder="Nama Anda"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Anda"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>
      <textarea
        name="message"
        placeholder="Pesan Anda"
        rows={5}
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
      ></textarea>
      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Mengirim..." : "Kirim Pesan"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
