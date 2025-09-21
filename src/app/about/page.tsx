// src/app/about/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="/hero-background.jpg"
          alt="About Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Tentang Elaies Berkelana</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Menjelajahi keindahan tersembunyi Indonesia, satu desa dalam satu
            waktu
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-brand-dark">
              Selamat Datang di Perjalanan Saya
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Elaies Berkelana adalah sebuah platform yang didedikasikan untuk
                membagikan pengalaman dan cerita dari perjalanan saya
                mengunjungi berbagai desa di Indonesia. Setiap perjalanan
                membawa perspektif baru dan pemahaman mendalam tentang kekayaan
                budaya negeri ini.
              </p>
              <p>
                Melalui dokumentasi video, foto, dan cerita, saya berusaha
                menangkap esensi kehidupan di setiap desa yang saya kunjungi.
                Dari keramahtamahan penduduk lokal hingga kearifan tradisional
                yang masih terjaga.
              </p>
              <p>
                Tujuan saya sederhana: berbagi keindahan tersembunyi Indonesia
                dan menginspirasi lebih banyak orang untuk mengapresiasi
                kehidupan pedesaan yang autentik.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/destinations"
                className="inline-block bg-brand-green text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all"
              >
                Jelajahi Destinasi
              </Link>
            </div>
          </div>
          <div className="glassmorphism p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6 text-brand-dark">
              Highlight Perjalanan
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4">
                <span className="text-brand-orange text-2xl">✦</span>
                <div>
                  <h4 className="font-semibold text-brand-dark">
                    Dokumentasi Autentik
                  </h4>
                  <p className="text-gray-600">
                    Merekam momen dan cerita nyata dari setiap desa
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-brand-orange text-2xl">✦</span>
                <div>
                  <h4 className="font-semibold text-brand-dark">
                    Interaksi Lokal
                  </h4>
                  <p className="text-gray-600">
                    Mengenal lebih dekat kehidupan masyarakat desa
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <span className="text-brand-orange text-2xl">✦</span>
                <div>
                  <h4 className="font-semibold text-brand-dark">
                    Kisah di Balik Layar
                  </h4>
                  <p className="text-gray-600">
                    Berbagi pengalaman unik dan tak terlupakan
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
