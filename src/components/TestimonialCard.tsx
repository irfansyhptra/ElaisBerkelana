// src/components/TestimonialCard.tsx (Diperbaiki)
import { Testimonial } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image"; // Impor komponen Image

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="glass-card-minimal h-full flex flex-col p-8">
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          {/* Ganti <img> dengan <Image> */}
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.destination}</p>
        </div>
      </div>
      <div className="flex mb-4">
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
      <p className="text-gray-700 italic flex-grow">
        {/* Perbaiki masalah unescaped quotes */}
        {`"${testimonial.comment}"`}
      </p>
      <p className="text-right text-xs text-gray-400 mt-4">
        {testimonial.date}
      </p>
    </div>
  );
};

export default TestimonialCard;
