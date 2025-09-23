// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/destinations", label: "Lokasi Sawit" },
    { href: "/journal", label: "Dokumentasi" },
    { href: "/about", label: "Tentang" },
    { href: "/contact", label: "Kontak" },
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

      <div className="relative container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className={`text-2xl font-bold tracking-wider transition-all duration-300 hover:scale-105 ${
            isScrolled || isMenuOpen
              ? "bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent hover:from-green-200 hover:via-white hover:to-green-200"
              : "bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent hover:from-green-100 hover:via-white hover:to-green-100"
          }`}
        >
          ELAEIS BERKELANA
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative transition-all duration-300 group py-2 px-4 hover:scale-105 ${
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
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`z-50 transition-all duration-300 glass-card p-2 rounded-full hover:scale-110 ${
              isScrolled || isMenuOpen
                ? "text-white hover:text-green-200 border-white/30 hover:border-white/50 shadow-lg shadow-white/10"
                : "text-white hover:text-white/80 border-white/20 hover:border-white/40"
            }`}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 glass-card-liquid flex flex-col items-center justify-center space-y-8 border-0 rounded-none">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-orange-900/20"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative z-10"
            >
              <Link
                href={link.href}
                className="glass-card-minimal text-gray-800 text-3xl hover:text-green-700 
                           transition-all duration-300 transform hover:scale-110 
                           px-8 py-4 rounded-2xl border-white/40 hover:border-white/60"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
