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
    { href: "/destinations", label: "Destinasi" },
    { href: "/journal", label: "Jurnal" },
    { href: "/about", label: "Tentang" },
    { href: "/contact", label: "Kontak" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? "glass-navbar" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-white tracking-wider hover:text-white/80 transition-colors"
        >
          ELAIES BERKELANA
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-white/90 hover:text-white transition-colors group py-2"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white z-50 hover:text-white/80 transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 glass flex flex-col items-center justify-center space-y-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className="text-white text-3xl hover:text-secondary transition-all duration-300 transform hover:scale-110"
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
