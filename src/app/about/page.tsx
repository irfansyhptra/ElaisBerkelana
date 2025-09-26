// src/app/about/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen relative">
      {/* Full page background image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/hero-background.png"
          alt="About Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content with glassmorphism */}
      <div className="relative z-10 pt-32 pb-16">
        <div className="w-full px-8 lg:px-16 xl:px-20">
          {/* Page title */}
          <div className="text-center mb-16">
            <div className="glass-card max-w-4xl mx-auto">
              <h1 className="title-large text-white mb-4">
                Tentang Elaies Berkelana
              </h1>
              <p className="text-xl text-white/90">
                Mengungkap dampak positif kelapa sawit untuk masyarakat
                Indonesia
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
            <div className="glass-card h-fit">
              <h2 className="title-medium text-white mb-6">
                Selamat Datang di Misi Kami
              </h2>
              <div className="space-y-4 text-white/90">
                <p>
                  Elaies Berkelana adalah sebuah platform yang didedikasikan
                  untuk mengungkap dan membagikan cerita nyata tentang dampak
                  positif industri kelapa sawit terhadap kehidupan masyarakat
                  Indonesia. Kami mengunjungi berbagai desa, perkebunan, dan
                  komunitas untuk mendokumentasikan transformasi sosial dan
                  ekonomi yang terjadi.
                </p>
                <p>
                  Melalui dokumentasi video, foto, dan wawancara mendalam, kami
                  mengungkap bagaimana industri kelapa sawit telah memberikan
                  kesempatan kerja, meningkatkan infrastruktur, dan
                  memberdayakan ekonomi lokal di berbagai komunitas.
                </p>
                <p>
                  Tujuan kami adalah menampilkan sisi positif industri kelapa
                  sawit yang berkelanjutan dan menginspirasi lebih banyak
                  program sosial yang dapat mengangkat kesejahteraan masyarakat
                  pedesaan.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/destinations" className="btn-primary inline-block">
                  Lihat Program Kami
                </Link>
              </div>
            </div>

            <div className="glass-card h-fit">
              <h3 className="title-medium text-white mb-6">
                Fokus Program Kami
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <span className="text-green-400 text-2xl">🌱</span>
                  <div>
                    <h4 className="font-semibold text-white text-lg">
                      Dampak Sosial Nyata
                    </h4>
                    <p className="text-white/80">
                      Mengukur dan mendokumentasikan perubahan positif dalam
                      kehidupan masyarakat
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-green-400 text-2xl">🌱</span>
                  <div>
                    <h4 className="font-semibold text-white text-lg">
                      Pemberdayaan Ekonomi
                    </h4>
                    <p className="text-white/80">
                      Mengenal lebih dekat kehidupan masyarakat desa
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-orange-400 text-2xl">✦</span>
                  <div>
                    <h4 className="font-semibold text-white text-lg">
                      Kisah di Balik Layar
                    </h4>
                    <p className="text-white/80">
                      Berbagi pengalaman unik dan tak terlupakan
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
