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

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent scroll when menu open
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinks = [
    {
      href: "/",
      label: t("nav.home"),
      icon: Home,
      mobileLabel: t("nav.mobile.home"),
    },
    {
      href: "/destinations",
      label: t("nav.destinations"),
      icon: MapPin,
      mobileLabel: t("nav.mobile.destinations"),
    },
    {
      href: "/journal",
      label: t("nav.journal"),
      icon: Camera,
      mobileLabel: t("nav.mobile.journal"),
    },
    {
      href: "/about",
      label: t("nav.about"),
      icon: Info,
      mobileLabel: t("nav.mobile.about"),
    },
    {
      href: "/contact",
      label: t("nav.contact"),
      icon: Phone,
      mobileLabel: t("nav.mobile.contact"),
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled || isMenuOpen
            ? "glass-navbar-dark shadow-2xl"
            : "bg-gradient-to-b from-black/20 via-black/10 to-transparent backdrop-blur-md"
        }`}
      >
        {/* Enhanced decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className={`absolute top-0 left-1/4 w-40 h-1 transition-all duration-500 ${
              isScrolled || isMenuOpen
                ? "bg-gradient-to-r from-transparent via-green-400/40 to-transparent"
                : "bg-gradient-to-r from-transparent via-green-400/20 to-transparent"
            }`}
          ></div>
          <div
            className={`absolute top-0 right-1/4 w-32 h-1 transition-all duration-500 ${
              isScrolled || isMenuOpen
                ? "bg-gradient-to-r from-transparent via-white/30 to-transparent"
                : "bg-gradient-to-r from-transparent via-white/15 to-transparent"
            }`}
          ></div>
        </div>

        <div className="relative w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
              {/* Logo - Enhanced with better visibility */}
              <Link
                href="/"
                className={`relative text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-extrabold tracking-wider transition-all duration-300 hover:scale-105 flex-shrink-0 z-50 group ${
                  isScrolled || isMenuOpen
                    ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                    : "text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
                }`}
                style={{
                  minWidth: "100px",
                  maxWidth: "280px",
                  textShadow:
                    "0 2px 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(46, 125, 50, 0.3)",
                }}
              >
                {/* Glow effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/20 to-green-400/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></span>

                <span className="relative hidden sm:inline whitespace-nowrap">
                  <span className="text-green-400">ELAEIS</span>
                  <span className="text-yellow-300 ml-2">BERKELANA</span>
                </span>
                <span className="relative sm:hidden">
                  <span className="text-green-400">ELAEIS</span>
                </span>
              </Link>

              {/* Desktop Menu - Better spacing */}
              <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 flex-shrink-0">
                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative transition-all duration-300 group py-2 px-3 xl:px-4 hover:scale-105 text-sm xl:text-base whitespace-nowrap ${
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
                <div className="ml-2 xl:ml-4 flex-shrink-0">
                  <LanguageSelector variant="navbar" />
                </div>
              </div>

              {/* Mobile Menu Button - No overlap with logo */}
              <div className="lg:hidden flex items-center flex-shrink-0">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`relative z-50 transition-all duration-300 p-2 sm:p-2.5 rounded-xl hover:scale-110 active:scale-95 touch-manipulation ${
                    isScrolled || isMenuOpen
                      ? "bg-white/10 text-white hover:bg-white/20 border border-white/30 hover:border-white/50 shadow-lg shadow-black/20"
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/20 hover:border-white/40"
                  }`}
                  aria-label="Toggle menu"
                  style={{
                    minWidth: "44px",
                    minHeight: "44px",
                    marginLeft: "12px",
                  }}
                >
                  <span className="flex items-center justify-center">
                    {isMenuOpen ? (
                      <X size={20} className="sm:w-6 sm:h-6" />
                    ) : (
                      <Menu size={20} className="sm:w-6 sm:h-6" />
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Optimized Mobile Side Menu - Full Screen Premium Design */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-md z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Side Menu Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="lg:hidden fixed right-0 top-0 h-full w-full max-w-sm z-50 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glass background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white/98 to-white/95 backdrop-blur-2xl"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-yellow-400/20 to-transparent rounded-full blur-3xl"></div>

              {/* Content */}
              <div className="relative h-full flex flex-col">
                {/* Header with close button */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                      Menu
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Elaeis Berkelana
                    </p>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-200 text-gray-700 hover:text-gray-900 touch-manipulation group"
                    style={{ minWidth: "44px", minHeight: "44px" }}
                    aria-label="Close menu"
                  >
                    <X size={22} className="group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>

                {/* Navigation Links - Optimized */}
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.08,
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                      }}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 hover:bg-white border border-gray-200/50 hover:border-green-300 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 group active:scale-98 touch-manipulation relative overflow-hidden"
                        onClick={() => setIsMenuOpen(false)}
                        style={{ minHeight: "64px" }}
                      >
                        {/* Hover gradient effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-green-50/0 via-green-50/50 to-green-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Icon with background */}
                        <div className="relative z-10 p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 group-hover:from-green-600 group-hover:to-green-700 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                          <link.icon
                            size={24}
                            className="text-white"
                            strokeWidth={2.5}
                          />
                        </div>
                        
                        {/* Label */}
                        <div className="relative z-10 flex-1">
                          <span className="text-base font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                            {link.label}
                          </span>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {link.mobileLabel}
                          </p>
                        </div>

                        {/* Arrow icon */}
                        <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                          <svg 
                            width="20" 
                            height="20" 
                            viewBox="0 0 20 20" 
                            fill="none" 
                            className="text-green-600"
                          >
                            <path 
                              d="M7.5 15L12.5 10L7.5 5" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Footer with Language Selector */}
                <div className="p-4 border-t border-gray-200/50 bg-gradient-to-t from-gray-50/50 to-transparent">
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200/50 shadow-sm">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            className="text-white"
                          >
                            <path 
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" 
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {t("language.select")}
                        </span>
                      </div>
                      <LanguageSelector variant="minimal" />
                    </div>
                    
                    {/* Footer info */}
                    <div className="text-center pt-3 border-t border-gray-200/50">
                      <p className="text-xs font-semibold text-gray-700">
                        Elaeis Berkelana
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">
                        {t("footer.description")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
