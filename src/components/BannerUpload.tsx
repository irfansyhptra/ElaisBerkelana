// src/components/BannerUpload.tsx
"use client";

import { useState, useRef } from "react";
import {
  Camera,
  X,
  Upload,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import { uploadImage, deleteImage, UploadResult } from "@/lib/api";
import Image from "next/image";

interface BannerUploadProps {
  bannerUrl?: string;
  onBannerChange: (bannerUrl: string) => void;
  accept?: string;
  className?: string;
  label?: string;
  aspectRatio?: string; // e.g., "16/9", "4/3", "21/9"
}

interface UploadingFile {
  file: File;
  progress: number;
  error?: string;
}

const BannerUpload = ({
  bannerUrl = "",
  onBannerChange,
  accept = "image/*",
  className = "",
  label = "Upload Banner",
  aspectRatio = "16/9",
}: BannerUploadProps) => {
  const [uploadingFile, setUploadingFile] = useState<UploadingFile | null>(
    null
  );
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    // Validate file
    if (!file.type.startsWith("image/")) {
      alert("Hanya file gambar yang diperbolehkan.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      alert("Ukuran file maksimal 10MB.");
      return;
    }

    // Initialize uploading state
    setUploadingFile({
      file,
      progress: 0,
    });

    try {
      // Update progress
      setUploadingFile((prev) => (prev ? { ...prev, progress: 50 } : null));

      const result: UploadResult = await uploadImage(file);

      // Update progress to complete
      setUploadingFile((prev) => (prev ? { ...prev, progress: 100 } : null));

      // Update banner URL
      onBannerChange(result.url);

      // Clean up after success
      setTimeout(() => {
        setUploadingFile(null);
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadingFile((prev) =>
        prev
          ? {
              ...prev,
              error: error instanceof Error ? error.message : "Upload failed",
            }
          : null
      );

      // Clean up after error
      setTimeout(() => {
        setUploadingFile(null);
      }, 3000);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemoveBanner = async () => {
    if (!bannerUrl) return;

    try {
      // Extract public ID from Cloudinary URL
      const publicIdMatch = bannerUrl.match(/\/elaeis-berkelana\/(.+)\./);
      if (publicIdMatch) {
        const publicId = `elaeis-berkelana/${publicIdMatch[1]}`;
        await deleteImage(publicId);
      }

      // Remove banner
      onBannerChange("");
    } catch (error) {
      console.error("Delete error:", error);
      // Still remove from UI even if delete fails
      onBannerChange("");
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const getAspectRatioClass = (ratio: string) => {
    switch (ratio) {
      case "16/9":
        return "aspect-video";
      case "4/3":
        return "aspect-[4/3]";
      case "21/9":
        return "aspect-[21/9]";
      case "1/1":
        return "aspect-square";
      default:
        return "aspect-video";
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {/* Current Banner or Upload Area */}
      {bannerUrl && bannerUrl.trim() !== "" ? (
        <div className="relative group">
          <div
            className={`relative rounded-lg overflow-hidden bg-gray-100 ${getAspectRatioClass(
              aspectRatio
            )}`}
          >
            <Image
              src={bannerUrl}
              alt="Banner"
              fill
              className="object-cover"
              unoptimized={!bannerUrl.includes("res.cloudinary.com")}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
              <button
                type="button"
                onClick={openFileDialog}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg"
                title="Ganti Banner"
              >
                <Camera className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleRemoveBanner}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg"
                title="Hapus Banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg text-center transition-colors cursor-pointer ${getAspectRatioClass(
            aspectRatio
          )} ${
            dragActive
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 p-6">
            <ImageIcon className="h-12 w-12 text-gray-400" />
            <div>
              <p className="text-blue-600 hover:text-blue-700 font-medium">
                Pilih banner
              </p>
              <p className="text-gray-500 text-sm">
                atau drag dan drop di sini
              </p>
            </div>
            <p className="text-xs text-gray-400">
              PNG, JPG, JPEG hingga 10MB. Rasio {aspectRatio}.
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Progress */}
      {uploadingFile && (
        <div className="mt-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Upload className="h-4 w-4 text-gray-400 mr-2" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">
                {uploadingFile.file.name}
              </p>
              {uploadingFile.error ? (
                <div className="flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 text-red-500 mr-1" />
                  <p className="text-xs text-red-600">{uploadingFile.error}</p>
                </div>
              ) : (
                <div className="mt-1">
                  <div className="bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full transition-all"
                      style={{ width: `${uploadingFile.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            {uploadingFile.progress < 100 && !uploadingFile.error && (
              <Loader2 className="h-4 w-4 text-blue-600 animate-spin ml-2" />
            )}
          </div>
        </div>
      )}

      {/* Aspect Ratio Info */}
      <div className="mt-2 text-xs text-gray-500">
        Rekomendasi rasio: {aspectRatio} untuk tampilan optimal
      </div>
    </div>
  );
};

export default BannerUpload;
