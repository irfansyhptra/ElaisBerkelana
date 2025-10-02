// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Home, MapPin, Camera, Info, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslation } from "@/hooks/useTranslation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t('nav.home'), icon: Home, mobileLabel: t('nav.mobile.home') },
    {
      href: "/destinations",
      label: t('nav.destinations'),
      icon: MapPin,
      mobileLabel: t('nav.mobile.destinations'),
    },
    {
      href: "/journal",
      label: t('nav.journal'),
      icon: Camera,
      mobileLabel: t('nav.mobile.journal'),
    },
    {
      href: "/about",
      label: t('nav.about'),
      icon: Info,
      mobileLabel: t('nav.mobile.about'),
    },
    { href: "/contact", label: t('nav.contact'), icon: Phone, mobileLabel: t('nav.mobile.contact') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled || isMenuOpen
          ? "glass-navbar-dark"
          : "bg-gradient-to-b from-black/10 via-black/5 to-transparent backdrop-blur-sm"
      }`}
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-0 left-1/4 w-32 h-2 transition-all duration-500 ${
            isScrolled || isMenuOpen
              ? "bg-gradient-to-r from-transparent via-white/20 to-transparent"
              : "bg-gradient-to-r from-transparent via-white/10 to-transparent"
          }`}
        ></div>
        <div
          className={`absolute top-0 right-1/4 w-24 h-2 transition-all duration-500 ${
            isScrolled || isMenuOpen
              ? "bg-gradient-to-r from-transparent via-green-400/30 to-transparent"
              : "bg-gradient-to-r from-transparent via-green-400/20 to-transparent"
          }`}
        ></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <Link
          href="/"
          className={`text-lg sm:text-xl md:text-2xl font-bold tracking-wider transition-all duration-300 hover:scale-105 ${
            isScrolled || isMenuOpen
              ? "bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent hover:from-green-200 hover:via-white hover:to-green-200"
              : "bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent hover:from-green-100 hover:via-white hover:to-green-100"
          }`}
        >
          <span className="hidden sm:inline">ELAEIS BERKELANA</span>
          <span className="sm:hidden">ELAEIS</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative transition-all duration-300 group py-2 px-3 xl:px-4 hover:scale-105 text-sm xl:text-base ${
                isScrolled || isMenuOpen
                  ? "text-white/95 hover:text-white"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {/* Glass background on hover */}
              <div
                className={`absolute inset-0 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border ${
                  isScrolled || isMenuOpen
                    ? "bg-white/15 border-white/30 group-hover:border-white/40 shadow-lg shadow-white/10"
                    : "bg-white/10 border-white/20 group-hover:border-white/30"
                }`}
              ></div>
              <span className="relative z-10">{link.label}</span>
              <span
                className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-400 to-orange-400 
                               transition-all duration-300 group-hover:w-full group-hover:left-0"
              ></span>
            </Link>
          ))}
          
          {/* Language Selector */}
          <LanguageSelector variant="navbar" />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`z-50 transition-all duration-300 glass-card p-2 rounded-full hover:scale-110 ${
              isScrolled || isMenuOpen
                ? "text-white hover:text-green-200 border-white/30 hover:border-white/50 shadow-lg shadow-white/10"
                : "text-white hover:text-white/80 border-white/20 hover:border-white/40"
            }`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] glass-card-liquid border-l border-white/20 rounded-l-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="glass-card p-2 rounded-full hover:scale-110 transition-all duration-300 text-gray-700 hover:text-gray-900"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="px-6 py-4 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-4 p-4 rounded-2xl glass-card-minimal hover:glass-card transition-all duration-300 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <link.icon
                        size={20}
                        className="text-green-600 group-hover:text-green-700 transition-colors"
                      />
                      <span className="text-gray-800 group-hover:text-gray-900 font-medium">
                        {link.mobileLabel}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Language Selector in Mobile Menu */}
              <div className="px-6 py-4">
                <div className="glass-card-minimal p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">{t('language.select')}</span>
                    <LanguageSelector variant="minimal" />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-card-minimal p-4 text-center">
                  <p className="text-sm text-gray-600">Elaeis Berkelana</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {t('footer.description')}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation (for very small screens) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 glass-navbar-dark border-t border-white/10 safe-area-bottom">
        <div className="grid grid-cols-5 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center justify-center py-3 px-1 transition-all duration-200 active:bg-white/20 active:scale-95 rounded-lg mx-1 touch-manipulation"
              style={{ minHeight: "44px" }} // iOS minimum touch target
            >
              <link.icon size={18} className="text-white/80 mb-1" />
              <span className="text-xs text-white/70 text-center leading-tight">
                {link.mobileLabel}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
