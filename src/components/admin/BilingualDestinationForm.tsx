// src/components/admin/BilingualDestinationForm.tsx
"use client";

import { useState, useEffect } from "react";
import type { BilingualPalmOilDestination } from "@/types/bilingual";
import {
  saveBilingualDestination,
  getRawBilingualDestination,
} from "@/lib/bilingualApi";

interface Props {
  mode: "create" | "edit";
  destinationId?: string;
  onSuccess?: (destination: BilingualPalmOilDestination) => void;
  onCancel?: () => void;
}

// Simplified form state that matches BilingualPalmOilDestination
interface FormState {
  id: {
    title: string;
    description: string;
    village: string;
  };
  en: {
    title: string;
    description: string;
    village: string;
  };
  common: {
    slug: string;
    country: string;
    province: string;
    type: "village" | "plantation" | "mill" | "research" | "community";
    images: string[];
    coverImage: string;
    banner: string;
    socialImpactScore: number;
    featured: boolean;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
}

export default function BilingualDestinationForm({
  mode,
  destinationId,
  onSuccess,
  onCancel,
}: Props) {
  const [activeLanguage, setActiveLanguage] = useState<"id" | "en">("id");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formCompletion, setFormCompletion] = useState({
    id: { title: false, village: false, description: false },
    en: { title: false, village: false, description: false },
  });

  const [formState, setFormState] = useState<FormState>({
    id: {
      title: "",
      description: "",
      village: "",
    },
    en: {
      title: "",
      description: "",
      village: "",
    },
    common: {
      slug: "",
      country: "",
      province: "",
      type: "village",
      images: [],
      coverImage: "",
      banner: "",
      socialImpactScore: 0,
      featured: false,
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
    },
  });

  // Load existing data for edit mode
  useEffect(() => {
    const loadDestination = async () => {
      try {
        setLoading(true);
        const data = await getRawBilingualDestination(destinationId!);

        setFormState({
          id: {
            title: data.title.id,
            description: data.description.id,
            village: data.village.id,
          },
          en: {
            title: data.title.en,
            description: data.description.en,
            village: data.village.en,
          },
          common: {
            slug: data.slug,
            country:
              typeof data.country === "string"
                ? data.country
                : data.country._id,
            province:
              typeof data.province === "string"
                ? data.province
                : data.province._id,
            type: data.type,
            images: data.images || [],
            coverImage: data.coverImage || "",
            banner: data.banner || "",
            socialImpactScore: data.socialImpactScore,
            featured: data.featured || false,
            coordinates: {
              latitude: data.coordinates?.latitude || 0,
              longitude: data.coordinates?.longitude || 0,
            },
          },
        });
      } catch (error) {
        console.error("Error loading destination:", error);
        alert("Gagal memuat data destinasi");
      } finally {
        setLoading(false);
      }
    };

    if (mode === "edit" && destinationId) {
      loadDestination();
    }
  }, [mode, destinationId]);

  // Keyboard shortcut for quick language switch (Ctrl+Shift+L)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "L") {
        e.preventDefault();
        setActiveLanguage((prev) => (prev === "id" ? "en" : "id"));

        // Show notification
        const newLang = activeLanguage === "id" ? "English 🇬🇧" : "Indonesia 🇮🇩";
        console.log(`🔄 Switched to ${newLang}`);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [activeLanguage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if both languages are complete
    const idComplete = idPercentage === 100;
    const enComplete = enPercentage === 100;

    if (!idComplete || !enComplete) {
      const missingLangs = [];
      if (!idComplete) missingLangs.push("Indonesia");
      if (!enComplete) missingLangs.push("English");

      const confirmSave = confirm(
        `⚠️ Peringatan!\n\n` +
          `Konten ${missingLangs.join(" dan ")} belum lengkap.\n` +
          `Indonesia: ${idPercentage}% lengkap\n` +
          `English: ${enPercentage}% lengkap\n\n` +
          `Apakah Anda yakin ingin menyimpan dengan data yang tidak lengkap?`
      );

      if (!confirmSave) {
        return;
      }
    }

    setSaving(true);

    try {
      // Construct bilingual destination object
      const bilingualData: Partial<BilingualPalmOilDestination> = {
        title: {
          id: formState.id.title,
          en: formState.en.title,
        },
        description: {
          id: formState.id.description,
          en: formState.en.description,
        },
        village: {
          id: formState.id.village,
          en: formState.en.village,
        },
        slug: formState.common.slug,
        country: formState.common.country,
        province: formState.common.province,
        type: formState.common.type,
        images: formState.common.images,
        coverImage: formState.common.coverImage,
        banner: formState.common.banner,
        socialImpactScore: formState.common.socialImpactScore,
        featured: formState.common.featured,
        coordinates: formState.common.coordinates,
      };

      if (mode === "edit" && destinationId) {
        bilingualData._id = destinationId;
      }

      // Save to database
      const method = mode === "edit" ? "PUT" : "POST";
      const savedData = await saveBilingualDestination(bilingualData, method);

      // Success notification with details
      const successMessage =
        mode === "edit"
          ? `✅ Destinasi berhasil diupdate!\n\n` +
            `📝 Data yang tersimpan:\n` +
            `🇮🇩 Indonesia: ${formState.id.title}\n` +
            `🇬🇧 English: ${formState.en.title}\n\n` +
            `Slug: ${formState.common.slug}\n` +
            `Type: ${formState.common.type}`
          : `✅ Destinasi berhasil dibuat!\n\n` +
            `📝 Data bilingual tersimpan:\n` +
            `🇮🇩 Indonesia:\n` +
            `   - Title: ${formState.id.title}\n` +
            `   - Village: ${formState.id.village}\n` +
            `🇬🇧 English:\n` +
            `   - Title: ${formState.en.title}\n` +
            `   - Village: ${formState.en.village}\n\n` +
            `🔗 Slug: ${formState.common.slug}\n` +
            `📁 Type: ${formState.common.type}`;

      alert(successMessage);
      onSuccess?.(savedData);
    } catch (error) {
      console.error("Error saving destination:", error);
      alert(
        `❌ Gagal menyimpan destinasi\n\n` +
          `Error: ${
            error instanceof Error ? error.message : "Unknown error"
          }\n\n` +
          `Pastikan:\n` +
          `- Kedua bahasa (ID & EN) sudah diisi\n` +
          `- Slug unik dan belum digunakan\n` +
          `- Country ID dan Province ID valid`
      );
    } finally {
      setSaving(false);
    }
  };

  const updateIdField = (field: keyof FormState["id"], value: string) => {
    setFormState({
      ...formState,
      id: { ...formState.id, [field]: value },
    });
    // Update completion status
    setFormCompletion((prev) => ({
      ...prev,
      id: { ...prev.id, [field]: value.trim().length > 0 },
    }));
  };

  const updateEnField = (field: keyof FormState["en"], value: string) => {
    setFormState({
      ...formState,
      en: { ...formState.en, [field]: value },
    });
    // Update completion status
    setFormCompletion((prev) => ({
      ...prev,
      en: { ...prev.en, [field]: value.trim().length > 0 },
    }));
  };

  const updateCommonField = (
    field: string,
    value:
      | string
      | number
      | boolean
      | string[]
      | { latitude: number; longitude: number }
  ) => {
    setFormState({
      ...formState,
      common: { ...formState.common, [field]: value },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  const currentLangData = activeLanguage === "id" ? formState.id : formState.en;

  // Calculate completion percentage
  const idCompletion = Object.values(formCompletion.id).filter(Boolean).length;
  const enCompletion = Object.values(formCompletion.en).filter(Boolean).length;
  const totalFields = 3;
  const idPercentage = Math.round((idCompletion / totalFields) * 100);
  const enPercentage = Math.round((enCompletion / totalFields) * 100);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {mode === "edit"
              ? "Edit Destinasi (Bilingual)"
              : "Tambah Destinasi Baru (Bilingual)"}
          </h1>
          <p className="text-gray-600">
            Isi form dalam 2 bahasa: Indonesia dan English
          </p>
          <div className="mt-3 flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <span className="text-blue-600 text-xl">💡</span>
            <div className="text-sm">
              <p className="font-medium text-blue-900">Quick Tips:</p>
              <ul className="text-blue-700 list-disc list-inside">
                <li>
                  Use toggle switch to switch between Indonesia 🇮🇩 and English
                  🇬🇧
                </li>
                <li>
                  Data will be saved to separate model properties (title.id &
                  title.en)
                </li>
                <li>
                  Press{" "}
                  <kbd className="px-2 py-0.5 bg-white border border-blue-300 rounded text-xs font-mono">
                    Ctrl + Shift + L
                  </kbd>{" "}
                  for quick language switch
                </li>
                <li>Both languages must be 100% complete before saving</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modern Language Toggle Switch */}
        <div className="mb-8 flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 mb-1">
                Pilih Bahasa Form:
              </span>
              <span className="text-xs text-gray-500">
                Data akan disimpan ke model{" "}
                {activeLanguage === "id" ? "Indonesia 🇮🇩" : "English 🇬🇧"}
              </span>
            </div>

            {/* Toggle Switch */}
            <div className="relative inline-flex items-center">
              <button
                type="button"
                onClick={() => setActiveLanguage("id")}
                className={`px-6 py-3 rounded-l-lg font-semibold transition-all duration-300 ${
                  activeLanguage === "id"
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg scale-105 z-10"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇮🇩</span>
                  <span>Indonesia</span>
                  {activeLanguage === "id" && (
                    <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setActiveLanguage("en")}
                className={`px-6 py-3 rounded-r-lg font-semibold transition-all duration-300 ${
                  activeLanguage === "en"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105 z-10"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇬🇧</span>
                  <span>English</span>
                  {activeLanguage === "en" && (
                    <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇮🇩</span>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
                      style={{ width: `${idPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">
                    {idPercentage}%
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {idCompletion}/{totalFields} field
                </span>
              </div>
              {idPercentage === 100 && (
                <span className="text-green-500 text-xl animate-bounce">✓</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl">🇬🇧</span>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                      style={{ width: `${enPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">
                    {enPercentage}%
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {enCompletion}/{totalFields} field
                </span>
              </div>
              {enPercentage === 100 && (
                <span className="text-blue-500 text-xl animate-bounce">✓</span>
              )}
            </div>
          </div>
        </div>

        {/* Language Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            type="button"
            onClick={() => setActiveLanguage("id")}
            className={`px-6 py-3 font-semibold transition-all relative flex items-center gap-3 ${
              activeLanguage === "id"
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="text-2xl">🇮🇩</span>
            <div className="flex flex-col items-start">
              <span>Bahasa Indonesia</span>
              <span className="text-xs font-normal">
                {idPercentage}% lengkap
              </span>
            </div>
            {idPercentage === 100 && (
              <span className="text-green-500 text-sm">✓</span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveLanguage("en")}
            className={`px-6 py-3 font-semibold transition-all relative flex items-center gap-3 ${
              activeLanguage === "en"
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="text-2xl">🇬🇧</span>
            <div className="flex flex-col items-start">
              <span>English</span>
              <span className="text-xs font-normal">
                {enPercentage}% complete
              </span>
            </div>
            {enPercentage === 100 && (
              <span className="text-green-500 text-sm">✓</span>
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Common Fields - Only show in Indonesian tab */}
          {activeLanguage === "id" && (
            <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Data Umum (Tidak Diterjemahkan)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={formState.common.slug}
                    onChange={(e) => updateCommonField("slug", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                    placeholder="desa-tanjung-paku"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipe *
                  </label>
                  <select
                    value={formState.common.type}
                    onChange={(e) => updateCommonField("type", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  >
                    <option value="village">Village</option>
                    <option value="plantation">Plantation</option>
                    <option value="mill">Mill</option>
                    <option value="research">Research</option>
                    <option value="community">Community</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country ID *
                  </label>
                  <input
                    type="text"
                    value={formState.common.country}
                    onChange={(e) =>
                      updateCommonField("country", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                    placeholder="ObjectId dari country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province ID *
                  </label>
                  <input
                    type="text"
                    value={formState.common.province}
                    onChange={(e) =>
                      updateCommonField("province", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                    placeholder="ObjectId dari province"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social Impact Score
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formState.common.socialImpactScore}
                    onChange={(e) =>
                      updateCommonField(
                        "socialImpactScore",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formState.common.coordinates.latitude}
                    onChange={(e) =>
                      updateCommonField("coordinates", {
                        ...formState.common.coordinates,
                        latitude: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formState.common.coordinates.longitude}
                    onChange={(e) =>
                      updateCommonField("coordinates", {
                        ...formState.common.coordinates,
                        longitude: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={formState.common.coverImage}
                    onChange={(e) =>
                      updateCommonField("coverImage", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banner URL
                  </label>
                  <input
                    type="url"
                    value={formState.common.banner}
                    onChange={(e) =>
                      updateCommonField("banner", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="https://example.com/banner.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images (pisahkan dengan enter)
                </label>
                <textarea
                  value={formState.common.images.join("\n")}
                  onChange={(e) =>
                    updateCommonField(
                      "images",
                      e.target.value.split("\n").filter((s) => s.trim())
                    )
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formState.common.featured}
                  onChange={(e) =>
                    updateCommonField("featured", e.target.checked)
                  }
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Featured Destination
                </label>
              </div>
            </div>
          )}

          {/* Bilingual Fields */}
          <div
            key={activeLanguage}
            className="space-y-6 animate-fade-in"
            style={{
              animation: "fadeIn 0.3s ease-in-out",
            }}
          >
            {/* Language Header with Active Indicator */}
            <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-amber-600 shadow-md">
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {activeLanguage === "id" ? "🇮🇩" : "🇬🇧"}
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {activeLanguage === "id"
                      ? "Konten Bahasa Indonesia"
                      : "English Content"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {activeLanguage === "id"
                      ? "Isi semua field dalam Bahasa Indonesia"
                      : "Fill all fields in English"}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      📝 Model Target:{" "}
                      {activeLanguage === "id"
                        ? "destination.title.id"
                        : "destination.title.en"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Switch Button */}
              <button
                type="button"
                onClick={() =>
                  setActiveLanguage(activeLanguage === "id" ? "en" : "id")
                }
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-amber-400 transition-all flex items-center gap-2 text-sm font-medium text-gray-700 shadow-sm"
              >
                <span>Switch to</span>
                <span className="text-lg">
                  {activeLanguage === "id" ? "🇬🇧" : "🇮🇩"}
                </span>
                <span>{activeLanguage === "id" ? "English" : "Indonesia"}</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </button>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                {activeLanguage === "id" ? "Judul *" : "Title *"}
                {currentLangData.title && (
                  <span className="text-green-500 text-xs">✓ Terisi</span>
                )}
                <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded font-mono">
                  → title.{activeLanguage}
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={currentLangData.title}
                  onChange={(e) =>
                    activeLanguage === "id"
                      ? updateIdField("title", e.target.value)
                      : updateEnField("title", e.target.value)
                  }
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                    currentLangData.title
                      ? "border-green-300 bg-green-50/30"
                      : "border-gray-300"
                  }`}
                  required
                  placeholder={
                    activeLanguage === "id"
                      ? "Desa Tanjung Paku, Aceh"
                      : "Tanjung Paku Village, Aceh"
                  }
                />
                {currentLangData.title && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-lg">
                    ✓
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                {activeLanguage === "id" ? "Desa *" : "Village *"}
                {currentLangData.village && (
                  <span className="text-green-500 text-xs">✓ Terisi</span>
                )}
                <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded font-mono">
                  → village.{activeLanguage}
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={currentLangData.village}
                  onChange={(e) =>
                    activeLanguage === "id"
                      ? updateIdField("village", e.target.value)
                      : updateEnField("village", e.target.value)
                  }
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                    currentLangData.village
                      ? "border-green-300 bg-green-50/30"
                      : "border-gray-300"
                  }`}
                  required
                  placeholder={
                    activeLanguage === "id" ? "Tanjung Paku" : "Tanjung Paku"
                  }
                />
                {currentLangData.village && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-lg">
                    ✓
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                {activeLanguage === "id" ? "Deskripsi *" : "Description *"}
                {currentLangData.description && (
                  <span className="text-green-500 text-xs">
                    ✓ Terisi ({currentLangData.description.length} karakter)
                  </span>
                )}
                <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded font-mono">
                  → description.{activeLanguage}
                </span>
              </label>
              <div className="relative">
                <textarea
                  value={currentLangData.description}
                  onChange={(e) =>
                    activeLanguage === "id"
                      ? updateIdField("description", e.target.value)
                      : updateEnField("description", e.target.value)
                  }
                  rows={8}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all ${
                    currentLangData.description
                      ? "border-green-300 bg-green-50/30"
                      : "border-gray-300"
                  }`}
                  required
                  placeholder={
                    activeLanguage === "id"
                      ? "Deskripsi lengkap dalam bahasa Indonesia..."
                      : "Full description in English..."
                  }
                />
                {currentLangData.description && (
                  <span className="absolute right-3 top-3 text-green-500 text-lg">
                    ✓
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 pt-6 border-t border-gray-200">
            {/* Data Preview Section */}
            {idPercentage === 100 && enPercentage === 100 && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-2xl">✅</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-800 mb-2">
                      Form Complete! Preview data yang akan disimpan:
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-white rounded-lg p-3 border border-green-200">
                        <p className="font-bold text-green-700 mb-2 flex items-center gap-2">
                          <span className="text-lg">🇮🇩</span> Indonesia
                        </p>
                        <div className="space-y-1 text-gray-700">
                          <p>
                            <span className="font-mono text-amber-600">
                              title.id:
                            </span>{" "}
                            {formState.id.title}
                          </p>
                          <p>
                            <span className="font-mono text-amber-600">
                              village.id:
                            </span>{" "}
                            {formState.id.village}
                          </p>
                          <p>
                            <span className="font-mono text-amber-600">
                              description.id:
                            </span>{" "}
                            {formState.id.description.substring(0, 50)}...
                          </p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-blue-200">
                        <p className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                          <span className="text-lg">🇬🇧</span> English
                        </p>
                        <div className="space-y-1 text-gray-700">
                          <p>
                            <span className="font-mono text-blue-600">
                              title.en:
                            </span>{" "}
                            {formState.en.title}
                          </p>
                          <p>
                            <span className="font-mono text-blue-600">
                              village.en:
                            </span>{" "}
                            {formState.en.village}
                          </p>
                          <p>
                            <span className="font-mono text-blue-600">
                              description.en:
                            </span>{" "}
                            {formState.en.description.substring(0, 50)}...
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 bg-white rounded-lg p-3 border border-gray-200">
                      <p className="font-bold text-gray-700 mb-2">
                        📁 Common Data (Language-neutral)
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-gray-600">
                        <p>
                          <span className="font-mono text-gray-500">slug:</span>{" "}
                          {formState.common.slug}
                        </p>
                        <p>
                          <span className="font-mono text-gray-500">type:</span>{" "}
                          {formState.common.type}
                        </p>
                        <p>
                          <span className="font-mono text-gray-500">
                            featured:
                          </span>{" "}
                          {formState.common.featured ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Warning if incomplete */}
            {(idPercentage < 100 || enPercentage < 100) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">⚠️</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-800">
                      Form belum lengkap di kedua bahasa
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      {idPercentage < 100 && `Indonesia: ${idPercentage}% `}
                      {enPercentage < 100 && `English: ${enPercentage}%`}
                    </p>
                    {idPercentage === 100 && enPercentage < 100 && (
                      <button
                        type="button"
                        onClick={() => setActiveLanguage("en")}
                        className="mt-2 text-xs text-amber-600 hover:text-amber-700 font-medium underline"
                      >
                        → Lengkapi konten English sekarang
                      </button>
                    )}
                    {enPercentage === 100 && idPercentage < 100 && (
                      <button
                        type="button"
                        onClick={() => setActiveLanguage("id")}
                        className="mt-2 text-xs text-amber-600 hover:text-amber-700 font-medium underline"
                      >
                        → Lengkapi konten Indonesia sekarang
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Menyimpan ke database...</span>
                  </>
                ) : (
                  <>
                    <span>{mode === "edit" ? "💾 Update" : "💾 Simpan"}</span>
                    <span className="text-xs bg-amber-700 px-2 py-0.5 rounded">
                      Bilingual
                    </span>
                  </>
                )}
              </button>
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Batal
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
