// src/components/TestimonialsSection.tsx
"use client";
import { motion } from "framer-motion";
import { DestinationTestimonial } from "@/types";
import Image from "next/image";

interface TestimonialsSectionProps {
  testimonials?: DestinationTestimonial[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  if (!testimonials || testimonials.length === 0) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? "text-yellow-400" : "text-gray-600"
        }`}
      >
        ⭐
      </span>
    ));
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-2xl font-bold text-white mb-6">
        💬 Testimoni Wisatawan
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card-minimal p-6 h-full flex flex-col"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={testimonial.avatar || "/images/default-avatar.jpg"}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-white">{testimonial.name}</h4>
                <div className="flex gap-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            </div>

            {/* Comment */}
            <blockquote className="text-white/80 italic flex-1 mb-4">
              &ldquo;{testimonial.comment}&rdquo;
            </blockquote>

            {/* Date */}
            <p className="text-white/60 text-sm">
              {new Date(testimonial.date).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
