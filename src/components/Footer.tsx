// src/components/Footer.tsx
import { Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-brand-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-3 text-center">
        <h3 className="text-3xl font-bold mb-4">Hubungi Saya</h3>
        <p className="text-white-400 max-w-lg mx-auto mb-8">
          Punya pertanyaan, ide kolaborasi, atau sekadar ingin menyapa? Jangan
          ragu untuk menghubungi saya melalui media sosial atau email.
        </p>
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-orange transition-colors"
          >
            <Instagram size={28} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-orange transition-colors"
          >
            <Youtube size={28} />
          </a>
          <a
            href="mailto:email@anda.com"
            className="hover:text-brand-orange transition-colors"
          >
            <Mail size={28} />
          </a>
        </div>
        <div className="border-t border-gray-700 pt-6">
          <p className="text-white-500">
            &copy; {currentYear} ELAIES BERKELANA. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
