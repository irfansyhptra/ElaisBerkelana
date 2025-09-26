// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// src/components/admin/DestinationEditModal.tsx
"use client";

import { X } from "lucide-react";
import PalmOilDestinationForm from "./PalmOilDestinationForm";

interface Destination {
  _id: string;
  slug: string;
  name: string;
  description: string;
  province: string;
  country: string;
  coverImage?: string;
  images?: string[];
  videoUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
}

interface DestinationEditModalProps {
  destination: Destination;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const DestinationEditModal = ({
  destination,
  isOpen,
  onClose,
  onSuccess,
}: DestinationEditModalProps) => {
  if (!isOpen || !destination) return null;

  const handleSuccess = () => {
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden border border-white/30">
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 p-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            Edit Destinasi: {destination.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-80px)]">
          <PalmOilDestinationForm
            initialData={destination}
            onSuccess={handleSuccess}
            isEditing={true}
          />
        </div>
      </div>
    </div>
  );
};

export default DestinationEditModal;
