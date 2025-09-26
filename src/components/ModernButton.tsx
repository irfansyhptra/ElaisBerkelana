// src/components/ModernButton.tsx
"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

interface ModernButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "glass";
  size?: "sm" | "md" | "lg";
  icon?: "arrow" | "external" | "none";
  disabled?: boolean;
  external?: boolean;
  className?: string;
}

const ModernButton = ({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  icon = "arrow",
  disabled = false,
  external = false,
  className = "",
}: ModernButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 rounded-full relative overflow-hidden group";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl hover:shadow-green-500/25 hover:scale-105",
    secondary:
      "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105",
    outline:
      "border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white hover:shadow-lg hover:scale-105",
    glass:
      "glass-card border-white/20 text-gray-700 hover:bg-white/30 hover:scale-105 backdrop-blur-md",
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${
    variantClasses[variant]
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  const iconElement =
    icon === "arrow" ? (
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    ) : icon === "external" ? (
      <ExternalLink className="w-4 h-4" />
    ) : null;

  const content = (
    <>
      {/* Shimmer effect */}
      <div className="absolute inset-0 -top-2 -left-2 w-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:w-full group-hover:left-full transition-all duration-700 skew-x-12"></div>

      <span className="relative z-10">{children}</span>
      {iconElement && <span className="relative z-10">{iconElement}</span>}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={onClick}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
};

export default ModernButton;
