// src/components/ModernDestinationCard.tsx
// This component is deprecated, use FixedDestinationCard instead
"use client";

import FixedDestinationCard from "./FixedDestinationCard";
import { Destination } from "@/types";

interface ModernDestinationCardProps {
  destination: Destination;
  variant?: "default" | "featured" | "minimal";
}

// Wrapper component for backward compatibility
const ModernDestinationCard = ({
  destination,
  variant = "default",
}: ModernDestinationCardProps) => {
  return <FixedDestinationCard destination={destination} variant={variant} />;
};

export default ModernDestinationCard;
