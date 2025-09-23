// src/components/Footer.tsx
import { Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-(#0B6623/90 backdrop-blur-sm border-t border-white/10 text-white">
      <div className="container mx-auto flex justify-between items-center h-16 px-6">
        <p className="text-xs sm:text-sm text-white/100">
          &copy; {currentYear}{" "}
          <span className="font-medium">ELAIES BERKELANA</span>. All Rights
          Reserved.
        </p>

        <div className="flex items-center space-x-4 sm:space-x-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/70 hover:text-white transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-white/70 hover:text-white transition-colors"
          >
            <Youtube size={20} />
          </a>
          <a
            href="mailto:email@anda.com"
            aria-label="Email"
            className="text-white/70 hover:text-white transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
