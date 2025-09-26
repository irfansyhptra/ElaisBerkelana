// src/components/ImageUpload.tsx
"use client";

import { useState, useRef } from "react";
import { Camera, X, Upload, Loader2, AlertCircle } from "lucide-react";
import { uploadImage, deleteImage, UploadResult } from "@/lib/api";
import Image from "next/image";

interface ImageUploadProps {
  images: string[]; // Array of Cloudinary URLs or public IDs
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  accept?: string;
  className?: string;
  label?: string;
}

interface UploadingFile {
  file: File;
  progress: number;
  error?: string;
}

const ImageUpload = ({
  images = [],
  onImagesChange,
  maxImages = 10,
  accept = "image/*",
  className = "",
  label = "Upload Gambar",
}: ImageUploadProps) => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    const filesArray = Array.from(files);
    const validFiles = filesArray.filter(
      (file) => file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024 // 10MB limit
    );

    if (validFiles.length === 0) return;

    // Check if adding these files would exceed the limit
    if (images.length + validFiles.length > maxImages) {
      alert(
        `Maksimal ${maxImages} gambar. Saat ini ada ${images.length} gambar.`
      );
      return;
    }

    // Initialize uploading state
    const newUploadingFiles = validFiles.map((file) => ({
      file,
      progress: 0,
    }));
    setUploadingFiles((prev) => [...prev, ...newUploadingFiles]);

    // Upload files one by one
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      try {
        // Update progress
        setUploadingFiles((prev) =>
          prev.map((uf) => (uf.file === file ? { ...uf, progress: 50 } : uf))
        );

        const result: UploadResult = await uploadImage(file);

        // Update progress to complete
        setUploadingFiles((prev) =>
          prev.map((uf) => (uf.file === file ? { ...uf, progress: 100 } : uf))
        );

        // Add the new image URL to the list
        onImagesChange([...images, result.url]);
      } catch (error) {
        console.error("Upload error:", error);
        setUploadingFiles((prev) =>
          prev.map((uf) =>
            uf.file === file
              ? {
                  ...uf,
                  error:
                    error instanceof Error ? error.message : "Upload failed",
                }
              : uf
          )
        );
      }
    }

    // Clean up completed uploads after a delay
    setTimeout(() => {
      setUploadingFiles((prev) =>
        prev.filter((uf) => uf.progress < 100 && !uf.error)
      );
    }, 2000);
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
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleRemoveImage = async (index: number) => {
    const imageUrl = images[index];

    try {
      // Extract public ID from Cloudinary URL
      const publicIdMatch = imageUrl.match(/\/elaeis-berkelana\/(.+)\./);
      if (publicIdMatch) {
        const publicId = `elaeis-berkelana/${publicIdMatch[1]}`;
        await deleteImage(publicId);
      }

      // Remove from list
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);
    } catch (error) {
      console.error("Delete error:", error);
      // Still remove from UI even if delete fails
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="space-y-2">
          <Camera className="mx-auto h-12 w-12 text-gray-400" />
          <div>
            <button
              type="button"
              onClick={openFileDialog}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Pilih gambar
            </button>
            <p className="text-gray-500"> atau drag dan drop di sini</p>
          </div>
          <p className="text-xs text-gray-400">
            PNG, JPG, JPEG hingga 10MB. Maksimal {maxImages} gambar.
          </p>
        </div>
      </div>

      {/* Uploading Files */}
      {uploadingFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadingFiles.map((uploadingFile, index) => (
            <div
              key={index}
              className="flex items-center p-3 bg-gray-50 rounded-lg"
            >
              <Upload className="h-4 w-4 text-gray-400 mr-2" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {uploadingFile.file.name}
                </p>
                {uploadingFile.error ? (
                  <div className="flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 text-red-500 mr-1" />
                    <p className="text-xs text-red-600">
                      {uploadingFile.error}
                    </p>
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
          ))}
        </div>
      )}

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images
            .filter((imageUrl) => imageUrl && imageUrl.trim() !== "")
            .map((imageUrl, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={imageUrl}
                    alt={`Uploaded image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Current count */}
      <div className="mt-2 text-xs text-gray-500">
        {images.length} dari {maxImages} gambar
      </div>
    </div>
  );
};

export default ImageUpload;
