// src/components/ContactForm.tsx
"use client";

import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika pengiriman form (misalnya, ke API atau layanan email)
    console.log("Form submitted:", formData);
    alert("Terima kasih! Pesan Anda telah terkirim.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        <button type="submit" className="btn-primary">
          Kirim Pesan
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
