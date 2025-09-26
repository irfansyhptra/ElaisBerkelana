// src/components/admin/PalmOilDestinationForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Country, Province, PalmOilProgram, PalmOilDestination } from "@/types";
import {
  getCountries,
  getProvincesByCountry,
  createDestination,
  updateDestination,
} from "@/lib/api";
import {
  Plus,
  Minus,
  X,
  Calendar,
  Camera,
  Video,
  FileText,
  Star,
  AlertCircle,
  Leaf,
} from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import BannerUpload from "@/components/BannerUpload";

interface FormPalmOilProgram extends PalmOilProgram {
  images: string[];
  videos: string[];
}

interface FormPalmOilDestination {
  title: string;
  description: string;
  country: string; // country ID for form
  province: string; // province ID for form
  village: string;
  coverImage: string;
  banner: string;
  images: string[];
  type: "village" | "plantation" | "mill" | "research" | "community";
  socialImpactScore: number;
  programDuration: string;
  beneficiaries: string[];
  challenges: string[];
  requirements: string[];
  impactLevel?: "Low" | "Moderate" | "High" | "Very High";
  establishedYear?: string;
  programs: FormPalmOilProgram[];
  socialMedia: {
    youtube: string[];
    instagram: string[];
    tiktok: string[];
  };
  resources: {
    research: string[];
    documentation: string[];
    training: string[];
    equipment: string[];
    community: string[];
    sustainability: string[];
    certification: string[];
    monitoring: string[];
    education: string[];
    development: string[];
    other: string[];
  };
  keyBenefits: string[];
  partnerOrganizations: string[];
  sustainabilityCertifications: string[];
  gallery: {
    url: string;
    caption: string;
    type: "image" | "video";
    featured: boolean;
  }[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  featured: boolean;
}

const initialFormData = {
  title: "",
  description: "",
  country: "",
  province: "",
  village: "",
  coverImage: "",
  banner: "",
  images: [] as string[],
  type: "village" as
    | "village"
    | "plantation"
    | "mill"
    | "research"
    | "community",
  socialImpactScore: 0,
  programDuration: "",
  beneficiaries: [] as string[],
  challenges: [] as string[],
  requirements: [] as string[],
  impactLevel: "Low" as "Low" | "Moderate" | "High" | "Very High",
  establishedYear: "",
  programs: [] as FormPalmOilProgram[],
  socialMedia: {
    youtube: [] as string[],
    instagram: [] as string[],
    tiktok: [] as string[],
  },
  resources: {
    research: [] as string[],
    documentation: [] as string[],
    training: [] as string[],
    equipment: [] as string[],
    community: [] as string[],
    sustainability: [] as string[],
    certification: [] as string[],
    monitoring: [] as string[],
    education: [] as string[],
    development: [] as string[],
    other: [] as string[],
  },
  keyBenefits: [] as string[],
  partnerOrganizations: [] as string[],
  sustainabilityCertifications: [] as string[],
  gallery: [] as {
    url: string;
    caption: string;
    type: "image" | "video";
    featured: boolean;
  }[],
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  featured: false,
};

interface PalmOilDestinationFormProps {
  initialData?: PalmOilDestination;
  onSuccess?: () => void;
  isEditing?: boolean;
}

const PalmOilDestinationForm = ({
  initialData,
  onSuccess,
  isEditing = false,
}: PalmOilDestinationFormProps) => {
  // Convert initialData to form format if it exists
  const convertToFormData = (
    data: PalmOilDestination
  ): FormPalmOilDestination => ({
    title: data.title,
    description: data.description,
    country: typeof data.country === "string" ? data.country : data.country._id,
    province:
      typeof data.province === "string" ? data.province : data.province._id,
    village: data.village,
    coverImage: data.coverImage || "",
    banner: data.banner || "",
    images: data.images,
    type: data.type,
    socialImpactScore: data.socialImpactScore,
    programDuration: data.programDuration,
    beneficiaries: data.beneficiaries,
    challenges: data.challenges || [],
    requirements: data.requirements || [],
    impactLevel: data.impactLevel,
    establishedYear: data.establishedYear,
    programs: (data.programs || []).map((p) => ({
      ...p,
      images: p.images || [],
      videos: p.videos || [],
    })),
    socialMedia: {
      youtube: data.socialMedia?.youtube || [],
      instagram: data.socialMedia?.instagram || [],
      tiktok: data.socialMedia?.tiktok || [],
    },
    resources: {
      research: data.resources?.research || [],
      documentation: data.resources?.documentation || [],
      training: data.resources?.training || [],
      equipment: data.resources?.equipment || [],
      community: data.resources?.community || [],
      sustainability: data.resources?.sustainability || [],
      certification: data.resources?.certification || [],
      monitoring: data.resources?.monitoring || [],
      education: data.resources?.education || [],
      development: data.resources?.development || [],
      other: data.resources?.other || [],
    },
    keyBenefits: data.keyBenefits || [],
    partnerOrganizations: data.partnerOrganizations || [],
    sustainabilityCertifications: data.sustainabilityCertifications || [],
    gallery: (data.gallery || []).map((g) => ({
      url: g.url,
      caption: g.caption,
      type: g.type,
      featured: g.featured || false,
    })),
    coordinates: data.coordinates || { latitude: 0, longitude: 0 },
    featured: data.featured,
  });

  const [formData, setFormData] = useState<FormPalmOilDestination>(
    initialData ? convertToFormData(initialData) : initialFormData
  );
  const [countries, setCountries] = useState<Country[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "basic" | "programs" | "media" | "details"
  >("basic");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryData = await getCountries();
        setCountries(countryData);
      } catch (error) {
        console.error("Error loading countries:", error);
        setError("Gagal memuat data negara");
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (countryId: string) => {
    setFormData((prev) => ({ ...prev, country: countryId, province: "" }));

    if (countryId) {
      setLoadingProvinces(true);
      try {
        const provinceData = await getProvincesByCountry(countryId);
        setProvinces(provinceData);
      } catch (error) {
        console.error("Error loading provinces:", error);
        setError("Gagal memuat data provinsi");
      } finally {
        setLoadingProvinces(false);
      }
    } else {
      setProvinces([]);
    }
  };

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCoordinatesChange = (
    type: "latitude" | "longitude",
    value: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      coordinates: {
        ...prev.coordinates,
        [type]: value,
      },
    }));
  };

  const handleArrayAdd = (field: string, value: string = "") => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, string[]>),
          [child]: [
            ...(prev[parent as keyof typeof prev] as Record<string, string[]>)[
              child
            ],
            value,
          ],
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field as keyof typeof prev] as string[]), value],
      }));
    }
  };

  const handleArrayRemove = (field: string, index: number) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, string[]>),
          [child]: (
            prev[parent as keyof typeof prev] as Record<string, string[]>
          )[child].filter((_, i) => i !== index),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: (prev[field as keyof typeof prev] as string[]).filter(
          (_, i) => i !== index
        ),
      }));
    }
  };

  const handleArrayUpdate = (field: string, index: number, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, string[]>),
          [child]: (
            prev[parent as keyof typeof prev] as Record<string, string[]>
          )[child].map((item, i) => (i === index ? value : item)),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: (prev[field as keyof typeof prev] as string[]).map((item, i) =>
          i === index ? value : item
        ),
      }));
    }
  };

  const addProgram = () => {
    const newProgram: FormPalmOilProgram = {
      day: formData.programs.length + 1,
      title: "",
      activities: [""],
      benefits: [],
      socialImpact: "",
      economicImpact: "",
      environmentalImpact: "",
      images: [],
      videos: [],
      notes: "",
    };
    setFormData((prev) => ({
      ...prev,
      programs: [...prev.programs, newProgram],
    }));
  };

  const removeProgram = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      programs: prev.programs
        .filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, day: i + 1 })),
    }));
  };

  const updateProgram = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      programs: prev.programs.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const dataToSend = {
        ...formData,
        programs: formData.programs.map((item) => ({
          day: item.day,
          title: item.title,
          activities: item.activities.filter(
            (activity: string) => activity.trim() !== ""
          ),
          benefits: item.benefits,
          socialImpact: item.socialImpact,
          economicImpact: item.economicImpact,
          environmentalImpact: item.environmentalImpact,
          images: item.images.filter((img: string) => img.trim() !== ""),
          videos: item.videos.filter((vid: string) => vid.trim() !== ""),
          notes: item.notes,
        })),
        // For backward compatibility with existing API
        itinerary: formData.programs.map((item) => ({
          day: item.day,
          title: item.title,
          activities: item.activities.filter(
            (activity: string) => activity.trim() !== ""
          ),
          benefits: item.benefits,
          socialImpact: item.socialImpact,
          economicImpact: item.economicImpact,
          environmentalImpact: item.environmentalImpact,
          images: item.images.filter((img: string) => img.trim() !== ""),
          videos: item.videos.filter((vid: string) => vid.trim() !== ""),
          notes: item.notes,
        })),
      };

      if (isEditing && initialData?.slug) {
        await updateDestination(initialData.slug, dataToSend);
        setSuccess("Destinasi kelapa sawit berhasil diperbarui!");
      } else {
        await createDestination(dataToSend);
        setSuccess("Destinasi kelapa sawit berhasil ditambahkan!");
        setFormData(initialFormData);
        setActiveTab("basic");
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      id: "basic",
      label: "Informasi Dasar",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "programs",
      label: "Program & Dampak",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: "media",
      label: "Media & Dokumentasi",
      icon: <Camera className="w-4 h-4" />,
    },
    {
      id: "details",
      label: "Detail & Sumber Daya",
      icon: <Star className="w-4 h-4" />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-white/20">
        <div className="p-6 border-b border-gray-200/50">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-600" />
            Tambah Destinasi Kelapa Sawit
          </h2>
          <p className="text-gray-600 mt-2">
            Kelola informasi tentang program sosial dan dampak kelapa sawit
            untuk masyarakat
          </p>
        </div>

        {error && (
          <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="m-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-green-500 mr-2" />
              <p className="text-green-800">{success}</p>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`${
                  activeTab === tab.id
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Basic Information Tab */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Program <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Contoh: Program Pemberdayaan Masyarakat Desa Sawit"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Nama program atau inisiatif sosial kelapa sawit
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipe Destinasi <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="village">Desa</option>
                    <option value="plantation">Perkebunan</option>
                    <option value="mill">Pabrik Kelapa Sawit</option>
                    <option value="research">Pusat Penelitian</option>
                    <option value="community">Pusat Komunitas</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Pilih jenis lokasi program sosial
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Program <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Jelaskan program sosial, dampak untuk masyarakat, dan manfaat kelapa sawit..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Deskripsikan program sosial dan dampak positifnya
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Negara <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Pilih Negara</option>
                    {countries.map((country) => (
                      <option key={country._id} value={country._id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Provinsi <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.province}
                    onChange={(e) =>
                      handleInputChange("province", e.target.value)
                    }
                    disabled={loadingProvinces || !formData.country}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                  >
                    <option value="">
                      {loadingProvinces ? "Loading..." : "Pilih Provinsi"}
                    </option>
                    {provinces.map((province) => (
                      <option key={province._id} value={province._id}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desa/Lokasi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.village}
                    onChange={(e) =>
                      handleInputChange("village", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Nama desa atau lokasi spesifik"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skor Dampak Sosial <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    required
                    value={formData.socialImpactScore}
                    onChange={(e) =>
                      handleInputChange(
                        "socialImpactScore",
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="8.5"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Skor dampak sosial dari 0-10
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level Dampak
                  </label>
                  <select
                    value={formData.impactLevel}
                    onChange={(e) =>
                      handleInputChange("impactLevel", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Low">Rendah</option>
                    <option value="Moderate">Sedang</option>
                    <option value="High">Tinggi</option>
                    <option value="Very High">Sangat Tinggi</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Tingkat dampak program terhadap masyarakat
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durasi Program
                  </label>
                  <input
                    type="text"
                    value={formData.programDuration}
                    onChange={(e) =>
                      handleInputChange("programDuration", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="6 bulan berkelanjutan"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lama program berjalan
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tahun Didirikan
                  </label>
                  <input
                    type="text"
                    value={formData.establishedYear}
                    onChange={(e) =>
                      handleInputChange("establishedYear", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="2020"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tahun program dimulai
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Koordinat Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates.latitude}
                    onChange={(e) =>
                      handleCoordinatesChange(
                        "latitude",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="-6.2088"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Koordinat Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates.longitude}
                    onChange={(e) =>
                      handleCoordinatesChange(
                        "longitude",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="106.8456"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Programs Tab */}
          {activeTab === "programs" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Program & Dampak Sosial
                </h3>
                <button
                  type="button"
                  onClick={addProgram}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Program
                </button>
              </div>

              {formData.programs.map((program, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-green-600" />
                      Program Hari ke-{program.day}
                    </h4>
                    {formData.programs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProgram(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Judul Program Hari ke-{program.day}
                      </label>
                      <input
                        type="text"
                        value={program.title}
                        onChange={(e) =>
                          updateProgram(index, "title", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Pelatihan Budidaya Kelapa Sawit Berkelanjutan"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kegiatan
                      </label>
                      {program.activities.map((activity, actIndex) => (
                        <div
                          key={actIndex}
                          className="flex items-center gap-2 mb-2"
                        >
                          <input
                            type="text"
                            value={activity}
                            onChange={(e) => {
                              const newActivities = [...program.activities];
                              newActivities[actIndex] = e.target.value;
                              updateProgram(index, "activities", newActivities);
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Penyuluhan teknik budidaya ramah lingkungan"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newActivities = [...program.activities];
                              newActivities.splice(actIndex, 1);
                              updateProgram(index, "activities", newActivities);
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const newActivities = [...program.activities, ""];
                          updateProgram(index, "activities", newActivities);
                        }}
                        className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Tambah Kegiatan
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dampak Sosial
                        </label>
                        <textarea
                          rows={3}
                          value={program.socialImpact}
                          onChange={(e) =>
                            updateProgram(index, "socialImpact", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Meningkatkan keterampilan masyarakat..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dampak Ekonomi
                        </label>
                        <textarea
                          rows={3}
                          value={program.economicImpact}
                          onChange={(e) =>
                            updateProgram(
                              index,
                              "economicImpact",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Meningkatkan pendapatan petani..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dampak Lingkungan
                        </label>
                        <textarea
                          rows={3}
                          value={program.environmentalImpact}
                          onChange={(e) =>
                            updateProgram(
                              index,
                              "environmentalImpact",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Praktik ramah lingkungan..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catatan Program
                      </label>
                      <textarea
                        rows={2}
                        value={program.notes}
                        onChange={(e) =>
                          updateProgram(index, "notes", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Catatan tambahan tentang program..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Media Tab */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Media & Dokumentasi
              </h3>

              {/* Banner Upload Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-purple-600" />
                  Banner Destinasi
                </h4>

                <BannerUpload
                  bannerUrl={formData.banner}
                  onBannerChange={(bannerUrl) =>
                    setFormData((prev) => ({ ...prev, banner: bannerUrl }))
                  }
                  aspectRatio="16/9"
                  label="Upload Banner untuk Card Destinasi"
                  className="mb-4"
                />

                <p className="text-sm text-gray-500 mt-2">
                  Banner ini akan ditampilkan sebagai background pada card
                  destinasi. Rasio 16:9 direkomendasikan untuk tampilan optimal.
                </p>
              </div>

              {/* Social Media Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-600" />
                  Media Sosial
                </h4>

                <div className="space-y-4">
                  {/* YouTube URLs */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      YouTube URLs
                    </label>
                    {formData.socialMedia.youtube.map((url, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <input
                          type="url"
                          value={url}
                          onChange={(e) =>
                            handleArrayUpdate(
                              "socialMedia.youtube",
                              index,
                              e.target.value
                            )
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="https://www.youtube.com/watch?v=..."
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleArrayRemove("socialMedia.youtube", index)
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleArrayAdd("socialMedia.youtube", "")}
                      className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah YouTube URL
                    </button>
                  </div>

                  {/* Instagram URLs */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram URLs
                    </label>
                    {formData.socialMedia.instagram.map((url, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <input
                          type="url"
                          value={url}
                          onChange={(e) =>
                            handleArrayUpdate(
                              "socialMedia.instagram",
                              index,
                              e.target.value
                            )
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="https://www.instagram.com/p/..."
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleArrayRemove("socialMedia.instagram", index)
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        handleArrayAdd("socialMedia.instagram", "")
                      }
                      className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah Instagram URL
                    </button>
                  </div>

                  {/* TikTok URLs */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      TikTok URLs
                    </label>
                    {formData.socialMedia.tiktok.map((url, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <input
                          type="url"
                          value={url}
                          onChange={(e) =>
                            handleArrayUpdate(
                              "socialMedia.tiktok",
                              index,
                              e.target.value
                            )
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="https://www.tiktok.com/@user/video/..."
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleArrayRemove("socialMedia.tiktok", index)
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleArrayAdd("socialMedia.tiktok", "")}
                      className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah TikTok URL
                    </button>
                  </div>
                </div>
              </div>

              {/* Gallery Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-purple-600" />
                  Galeri Foto & Video
                </h4>

                <ImageUpload
                  images={formData.images}
                  onImagesChange={(images) =>
                    setFormData((prev) => ({ ...prev, images }))
                  }
                  maxImages={10}
                  label="Upload Gambar Destinasi"
                  className="mb-4"
                />
              </div>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Detail & Sumber Daya
              </h3>

              {/* Beneficiaries */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Penerima Manfaat
                </label>
                {formData.beneficiaries.map((beneficiary, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={beneficiary}
                      onChange={(e) =>
                        handleArrayUpdate(
                          "beneficiaries",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Petani kelapa sawit lokal"
                    />
                    <button
                      type="button"
                      onClick={() => handleArrayRemove("beneficiaries", index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleArrayAdd("beneficiaries", "")}
                  className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Penerima Manfaat
                </button>
                <p className="text-xs text-gray-500 mt-1">
                  Kelompok masyarakat yang mendapat manfaat dari program
                </p>
              </div>

              {/* Key Benefits */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Manfaat Utama
                </label>
                {formData.keyBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) =>
                        handleArrayUpdate("keyBenefits", index, e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Peningkatan income masyarakat"
                    />
                    <button
                      type="button"
                      onClick={() => handleArrayRemove("keyBenefits", index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleArrayAdd("keyBenefits", "")}
                  className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Manfaat
                </button>
              </div>

              {/* Partner Organizations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organisasi Mitra
                </label>
                {formData.partnerOrganizations.map((partner, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={partner}
                      onChange={(e) =>
                        handleArrayUpdate(
                          "partnerOrganizations",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Kementerian Pertanian"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleArrayRemove("partnerOrganizations", index)
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleArrayAdd("partnerOrganizations", "")}
                  className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Mitra
                </button>
              </div>

              {/* Sustainability Certifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sertifikasi Keberlanjutan
                </label>
                {formData.sustainabilityCertifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={cert}
                      onChange={(e) =>
                        handleArrayUpdate(
                          "sustainabilityCertifications",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="RSPO Certified"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleArrayRemove("sustainabilityCertifications", index)
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    handleArrayAdd("sustainabilityCertifications", "")
                  }
                  className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Sertifikasi
                </button>
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Persyaratan
                </label>
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) =>
                        handleArrayUpdate("requirements", index, e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Pendaftaran online"
                    />
                    <button
                      type="button"
                      onClick={() => handleArrayRemove("requirements", index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleArrayAdd("requirements", "")}
                  className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Persyaratan
                </button>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      handleInputChange("featured", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Program Unggulan
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setFormData(initialFormData)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <Leaf className="w-4 h-4" />
                  Simpan Destinasi
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PalmOilDestinationForm;
