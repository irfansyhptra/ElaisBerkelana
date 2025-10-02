// src/components/LanguageSelector.tsx
"use client";

import { useDispatch } from "react-redux";
import { setLanguage, Language } from "@/store/i18nSlice";
import { useTranslation } from "@/hooks/useTranslation";
import { Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageSelectorProps {
  variant?: "navbar" | "floating" | "minimal";
  className?: string;
}

const LanguageSelector = ({
  variant = "navbar",
  className = "",
}: LanguageSelectorProps) => {
  const dispatch = useDispatch();
  const { t, currentLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: "id", name: t("language.indonesian"), flag: "🇮🇩" },
    { code: "en", name: t("language.english"), flag: "🇺🇸" },
  ];

  const currentLang =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (languageCode: Language) => {
    dispatch(setLanguage(languageCode));
    setIsOpen(false);
  };

  if (variant === "floating") {
    return (
      <div
        className={`fixed top-20 right-4 z-40 ${className}`}
        ref={dropdownRef}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card-minimal"
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-3 hover:bg-white/10 transition-all duration-300 rounded-2xl touch-manipulation"
            style={{ minHeight: "44px" }}
          >
            <Globe size={18} className="text-white/80" />
            <span className="text-white/90 font-medium">
              {currentLang.flag}
            </span>
            <ChevronDown
              size={16}
              className={`text-white/70 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-2 bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
              >
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`flex items-center gap-3 w-full p-3 hover:bg-white/10 transition-all duration-300 text-left ${
                      currentLanguage === language.code
                        ? "bg-emerald-500/20"
                        : ""
                    }`}
                    style={{ minWidth: "160px" }}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <span className="text-white/90 font-medium">
                      {language.name}
                    </span>
                    {currentLanguage === language.code && (
                      <div className="w-2 h-2 rounded-full bg-emerald-400 ml-auto" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-2 hover:bg-white/10 transition-all duration-300 rounded-lg touch-manipulation"
          style={{ minHeight: "44px" }}
        >
          <span className="text-lg">{currentLang.flag}</span>
          <ChevronDown
            size={14}
            className={`text-white/70 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-1 bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-lg overflow-hidden shadow-xl"
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`flex items-center gap-2 w-full p-2 hover:bg-white/10 transition-all duration-300 text-left ${
                    currentLanguage === language.code ? "bg-emerald-500/20" : ""
                  }`}
                  style={{ minWidth: "120px" }}
                >
                  <span>{language.flag}</span>
                  <span className="text-white/90 text-sm">{language.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Default navbar variant
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 transition-all duration-300 rounded-full border border-white/20 touch-manipulation"
        style={{ minHeight: "44px" }}
      >
        <Globe size={18} className="text-white/80" />
        <span className="text-white/90 font-medium hidden sm:inline">
          {currentLang.name}
        </span>
        <span className="text-white/90 font-medium sm:hidden">
          {currentLang.flag}
        </span>
        <ChevronDown
          size={16}
          className={`text-white/70 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`flex items-center gap-3 w-full p-3 hover:bg-white/10 transition-all duration-300 text-left ${
                  currentLanguage === language.code ? "bg-emerald-500/20" : ""
                }`}
                style={{ minWidth: "200px" }}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-white/90 font-medium">
                  {language.name}
                </span>
                {currentLanguage === language.code && (
                  <div className="w-2 h-2 rounded-full bg-emerald-400 ml-auto" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
