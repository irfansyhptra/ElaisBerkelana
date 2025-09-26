// src/components/ModernDestinationCard.tsx
// This component is deprecated, use DestinationCard instead
"use client";

import DestinationCard from "./DestinationCard";
import { Destination } from "@/types";

interface ModernDestinationCardProps {
  destination: Destination;
  variant?: "default" | "featured" | "minimal";
}

// Wrapper component for backward compatibility
const ModernDestinationCard = ({ destination }: ModernDestinationCardProps) => {
  return <DestinationCard destination={destination} />;
};

export default ModernDestinationCard;
