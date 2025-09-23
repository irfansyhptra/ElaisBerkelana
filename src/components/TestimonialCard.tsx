// src/components/TestimonialCard.tsx
import { Testimonial } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="relative group h-full">
      {/* Enhanced Glass Card */}
      <div className="glass-card-liquid h-full flex flex-col p-8 hover:scale-[1.02] transition-transform duration-500">
        {/* Header with avatar */}
        <div className="flex items-center mb-6">
          <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 ring-2 ring-white/30">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
            {/* Glass overlay on avatar */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-lg">
              {testimonial.name}
            </h4>
            <div className="glass-card-minimal px-3 py-1 inline-block">
              <p className="text-sm text-gray-600">{testimonial.destination}</p>
            </div>
          </div>
        </div>

        {/* Star rating with glass background */}
        <div className="glass-card-minimal inline-flex p-2 mb-6 rounded-lg">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
            />
          ))}
        </div>

        {/* Comment with enhanced glass effect */}
        <div className="glass-card-minimal p-6 flex-grow mb-4">
          <p className="text-gray-700 italic leading-relaxed text-lg">
            {`"${testimonial.comment}"`}
          </p>
        </div>

        {/* Date */}
        <div className="glass-card-minimal px-3 py-1 self-end">
          <p className="text-xs text-gray-500">{testimonial.date}</p>
        </div>

        {/* Hover decoration */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-green-400 to-orange-400 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-sm"></div>
      </div>
    </div>
  );
};

export default TestimonialCard;
