// src/components/admin/DestinationManager.tsx
"use client";

import { useState, useEffect } from "react";
import { PalmOilDestination } from "@/types";
import { getDestinations, deleteDestination } from "@/lib/api";
import { Edit, Trash2, Eye, Plus, Search, Filter } from "lucide-react";
import Image from "next/image";
import PalmOilDestinationForm from "./PalmOilDestinationForm";

const DestinationManager = () => {
  const [destinations, setDestinations] = useState<PalmOilDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingDestination, setEditingDestination] =
    useState<PalmOilDestination | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

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

  const handleDelete = async (id: string) => {
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

  const handleEdit = (destination: PalmOilDestination) => {
    setEditingDestination(destination);
    setShowCreateForm(false);
  };

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.village.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || dest.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "village":
        return "Desa Binaan";
      case "plantation":
        return "Kebun Sawit";
      case "mill":
        return "Pabrik";
      case "research":
        return "Penelitian";
      case "community":
        return "Komunitas";
      default:
        return type;
    }
  };

  const getImpactColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    if (score >= 40) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  if (showCreateForm) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Tambah Destinasi Baru
          </h2>
          <button
            onClick={() => setShowCreateForm(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Kembali ke Daftar
          </button>
        </div>
        <PalmOilDestinationForm
          onSuccess={() => {
            setShowCreateForm(false);
            loadDestinations();
          }}
        />
      </div>
    );
  }

  if (editingDestination) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Destinasi</h2>
          <button
            onClick={() => setEditingDestination(null)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Kembali ke Daftar
          </button>
        </div>
        <PalmOilDestinationForm
          initialData={editingDestination}
          onSuccess={() => {
            setEditingDestination(null);
            loadDestinations();
          }}
          isEditing={true}
        />
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-white/20">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Kelola Destinasi Kelapa Sawit
          </h2>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            Tambah Destinasi
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari destinasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">Semua Jenis</option>
              <option value="village">Desa Binaan</option>
              <option value="plantation">Kebun Sawit</option>
              <option value="mill">Pabrik</option>
              <option value="research">Penelitian</option>
              <option value="community">Komunitas</option>
            </select>
          </div>
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
                  ? "Belum ada destinasi"
                  : "Tidak ada destinasi yang sesuai dengan pencarian"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Destinasi
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jenis
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lokasi
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dampak Sosial
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/50 divide-y divide-gray-200">
                    {filteredDestinations.map((destination) => (
                      <tr key={destination._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {destination.images && destination.images[0] ? (
                              <div className="relative h-10 w-10 rounded-md mr-3">
                                <Image
                                  className="rounded-md object-cover"
                                  src={destination.images[0]}
                                  alt={destination.title}
                                  fill
                                />
                              </div>
                            ) : (
                              <div className="h-10 w-10 rounded-md bg-gray-200 mr-3 flex items-center justify-center">
                                <Eye className="w-4 h-4 text-gray-500" />
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {destination.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {destination.description?.substring(0, 50)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {getTypeLabel(destination.type)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>{destination.village}</div>
                          <div className="text-xs text-gray-500">
                            {destination.province?.name},{" "}
                            {destination.country?.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getImpactColor(
                              destination.socialImpactScore
                            )}`}
                          >
                            {destination.socialImpactScore}/100
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              destination.featured
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {destination.featured ? "Unggulan" : "Biasa"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(destination)}
                              className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(destination.slug)}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DestinationManager;
