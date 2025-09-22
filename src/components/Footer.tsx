// src/components/Footer.tsx
import { Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="section-minimal bg-gradient-to-t from-gray-50 to-white"
    >
      <div className="container mx-auto text-center">
        <div className="glass-card-minimal max-w-4xl mx-auto">
          <h3 className="title-medium text-gray-900 mb-6">Hubungi Saya</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg font-light leading-relaxed">
            Punya pertanyaan, ide kolaborasi, atau sekadar ingin menyapa? Jangan
            ragu untuk menghubungi saya melalui media sosial atau email.
          </p>

          <div className="flex justify-center space-x-8 mb-12">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 glass-card-minimal rounded-full hover:bg-gray-100 transition-all duration-300"
            >
              <Instagram
                size={28}
                className="text-gray-700 group-hover:text-black transition-colors"
              />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 glass-card-minimal rounded-full hover:bg-gray-100 transition-all duration-300"
            >
              <Youtube
                size={28}
                className="text-gray-700 group-hover:text-black transition-colors"
              />
            </a>
            <a
              href="mailto:email@anda.com"
              className="group p-4 glass-card-minimal rounded-full hover:bg-gray-100 transition-all duration-300"
            >
              <Mail
                size={28}
                className="text-gray-700 group-hover:text-black transition-colors"
              />
            </a>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <p className="text-gray-500 font-light">
              &copy; {currentYear}{" "}
              <span className="font-medium">ELAIES BERKELANA</span>. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
