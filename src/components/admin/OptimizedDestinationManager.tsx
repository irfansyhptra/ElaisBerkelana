// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// src/components/admin/OptimizedDestinationManager.tsx
"use client";

import { useState, useEffect } from "react";
import {
  getDestinations,
  deleteDestination,
  updateDestination,
} from "@/lib/api";
import { Edit, Trash2, Plus, Search, X, Save, Settings } from "lucide-react";
import DestinationEditModal from "./DestinationEditModal";
import Image from "next/image";

const OptimizedDestinationManager = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [quickEditDestination, setQuickEditDestination] = useState(null);
  const [fullEditDestination, setFullEditDestination] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [showFullEditModal, setShowFullEditModal] = useState(false);

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    try {
      setLoading(true);
      const data = await getDestinations();
      setDestinations(data);
      setError(null);
    } catch (err) {
      setError("Gagal memuat data destinasi");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus destinasi ini?")) {
      return;
    }

    try {
      await deleteDestination(id);
      await loadDestinations();
    } catch (err) {
      setError("Gagal menghapus destinasi");
      console.error(err);
    }
  };

  const handleQuickEdit = (destination) => {
    setQuickEditDestination(destination);
    setEditFormData({
      title: destination.title || "",
      description: destination.description || "",
      village: destination.village || "",
      type: destination.type || "village",
      socialImpactScore: destination.socialImpactScore || 0,
      programDuration: destination.programDuration || "",
      establishedYear: destination.establishedYear || "",
      impactLevel: destination.impactLevel || "Low",
      featured: destination.featured || false,
    });
  };

  const handleFullEdit = (destination) => {
    setFullEditDestination(destination);
    setShowFullEditModal(true);
  };

  const handleCancelQuickEdit = () => {
    setQuickEditDestination(null);
    setEditFormData(null);
  };

  const handleFormChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveQuickEdit = async () => {
    if (!quickEditDestination || !editFormData) return;

    try {
      setUpdateLoading(true);
      await updateDestination(quickEditDestination.slug, editFormData);
      await loadDestinations();
      setQuickEditDestination(null);
      setEditFormData(null);
      setError(null);
    } catch (err) {
      setError("Gagal memperbarui destinasi");
      console.error(err);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleFullEditSuccess = () => {
    setShowFullEditModal(false);
    setFullEditDestination(null);
    loadDestinations();
  };

  const getTypeLabel = (type) => {
    const typeLabels = {
      village: "Desa",
      plantation: "Perkebunan",
      mill: "Pabrik",
      research: "Penelitian",
      community: "Komunitas",
    };
    return typeLabels[type] || type;
  };

  const getImpactColor = (score) => {
    if (score >= 8) return "bg-green-100 text-green-800";
    if (score >= 6) return "bg-yellow-100 text-yellow-800";
    if (score >= 4) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.village?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-white/20">
      {/* Header */}
      <div className="border-b border-gray-200/50 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Kelola Destinasi Kelapa Sawit
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <Plus className="w-4 h-4" />
            Tambah Baru
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari destinasi berdasarkan judul, lokasi, atau deskripsi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">Memuat data...</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Menampilkan {filteredDestinations.length} dari{" "}
              {destinations.length} destinasi
            </div>

            {filteredDestinations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {destinations.length === 0
                  ? "Belum ada destinasi. Tambahkan destinasi pertama!"
                  : "Tidak ada destinasi yang sesuai dengan pencarian"}
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredDestinations.map((destination) => (
                  <div
                    key={destination._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          {destination.images && destination.images[0] && (
                            <div className="relative h-16 w-16 rounded-md overflow-hidden">
                              <Image
                                src={destination.images[0]}
                                alt={destination.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {destination.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              📍 {destination.village}
                              {destination.province?.name &&
                                `, ${destination.province.name}`}
                              {destination.country?.name &&
                                `, ${destination.country.name}`}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                {getTypeLabel(destination.type)}
                              </span>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(
                                  destination.socialImpactScore || 0
                                )}`}
                              >
                                Dampak: {destination.socialImpactScore || 0}/10
                              </span>
                              {destination.featured && (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                                  ⭐ Featured
                                </span>
                              )}
                              {destination.programs &&
                                destination.programs.length > 0 && (
                                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
                                    📋 {destination.programs.length} Program
                                  </span>
                                )}
                              {destination.establishedYear && (
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                                  📅 {destination.establishedYear}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                          {destination.description}
                        </p>
                        {destination.programDuration && (
                          <p className="text-xs text-gray-500">
                            ⏱️ Durasi: {destination.programDuration}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleQuickEdit(destination)}
                          className="text-blue-600 hover:text-blue-900 p-2 rounded hover:bg-blue-50"
                          title="Edit Cepat"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleFullEdit(destination)}
                          className="text-green-600 hover:text-green-900 p-2 rounded hover:bg-green-50"
                          title="Edit Lengkap"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(destination.slug)}
                          className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Quick Edit Modal */}
      {quickEditDestination && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200/50 p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Cepat: {quickEditDestination.title}
              </h3>
              <button
                onClick={handleCancelQuickEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Program <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Program <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={editFormData.description}
                  onChange={(e) =>
                    handleFormChange("description", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Village */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desa/Lokasi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editFormData.village}
                  onChange={(e) => handleFormChange("village", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipe Destinasi
                  </label>
                  <select
                    value={editFormData.type}
                    onChange={(e) => handleFormChange("type", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="village">Desa</option>
                    <option value="plantation">Perkebunan</option>
                    <option value="mill">Pabrik Kelapa Sawit</option>
                    <option value="research">Pusat Penelitian</option>
                    <option value="community">Pusat Komunitas</option>
                  </select>
                </div>

                {/* Social Impact Score */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skor Dampak Sosial (0-10)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={editFormData.socialImpactScore}
                    onChange={(e) =>
                      handleFormChange(
                        "socialImpactScore",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Program Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durasi Program
                  </label>
                  <input
                    type="text"
                    value={editFormData.programDuration}
                    onChange={(e) =>
                      handleFormChange("programDuration", e.target.value)
                    }
                    placeholder="3 bulan"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Established Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tahun Didirikan
                  </label>
                  <input
                    type="text"
                    value={editFormData.establishedYear}
                    onChange={(e) =>
                      handleFormChange("establishedYear", e.target.value)
                    }
                    placeholder="2023"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Featured */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editFormData.featured}
                  onChange={(e) =>
                    handleFormChange("featured", e.target.checked)
                  }
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Jadikan destinasi unggulan (featured)
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-between">
              <button
                onClick={() => handleFullEdit(quickEditDestination)}
                className="flex items-center gap-2 px-4 py-2 text-green-700 bg-green-50 border border-green-200 rounded-md hover:bg-green-100"
              >
                <Settings className="w-4 h-4" />
                Edit Lengkap
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelQuickEdit}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveQuickEdit}
                  disabled={updateLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {updateLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {updateLoading ? "Menyimpan..." : "Simpan Cepat"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Edit Modal */}
      <DestinationEditModal
        destination={fullEditDestination}
        isOpen={showFullEditModal}
        onClose={() => {
          setShowFullEditModal(false);
          setFullEditDestination(null);
        }}
        onSuccess={handleFullEditSuccess}
      />
    </div>
  );
};

export default OptimizedDestinationManager;
