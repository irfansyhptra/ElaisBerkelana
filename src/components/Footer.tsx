// src/components/Footer.tsx
"use client";

import { Instagram, Youtube, Mail, Linkedin } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-/90 backdrop-blur-sm border-t border-white/10 text-white">
      <div className="container mx-auto flex justify-between items-center h-16 px-6">
        <p className="text-xs sm:text-sm text-white/100">
          &copy; {currentYear}{" "}
          <span className="font-medium">{t("footer.copyright")}</span>
        </p>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <a
            href="https://www.youtube.com/@rcpiee5048"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("social.youtube")}
            className="text-white/70 hover:text-red-500 transition-colors"
          >
            <Youtube size={18} />
          </a>
          <a
            href="https://www.instagram.com/rehdesivachristima/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("social.instagram")}
            className="text-white/70 hover:text-pink-500 transition-colors"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.tiktok.com/@rhdsva"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("social.tiktok")}
            className="text-white/70 hover:text-white transition-colors"
            title="TikTok"
          >
            {/* Custom TikTok Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-[18px] h-[18px]"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/rehdesiva-christima-077391259/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("social.linkedin")}
            className="text-white/70 hover:text-blue-500 transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:contact@elaeisberkelana.com"
            aria-label={t("social.email")}
            className="text-white/70 hover:text-green-500 transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
