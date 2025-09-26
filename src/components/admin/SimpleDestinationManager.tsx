// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// src/components/admin/SimpleDestinationManager.tsx
"use client";

import { useState, useEffect } from "react";
import { getDestinations, deleteDestination } from "@/lib/api";
import { Trash2, Search } from "lucide-react";
import Image from "next/image";

const SimpleDestinationManager = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.village?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeLabel = (type) => {
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

  const getImpactColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    if (score >= 40) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-white/20">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Kelola Destinasi Kelapa Sawit
          </h2>
        </div>

        {/* Search */}
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
              <div className="grid gap-4">
                {filteredDestinations.map((destination) => (
                  <div
                    key={destination._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {destination.images && destination.images[0] && (
                            <div className="relative h-16 w-16 rounded-md">
                              <Image
                                className="rounded-md object-cover"
                                src={destination.images[0]}
                                alt={destination.title}
                                fill
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {destination.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {destination.village}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                {getTypeLabel(destination.type)}
                              </span>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(
                                  destination.socialImpactScore
                                )}`}
                              >
                                Dampak: {destination.socialImpactScore}/100
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {destination.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
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
    </div>
  );
};

export default SimpleDestinationManager;
