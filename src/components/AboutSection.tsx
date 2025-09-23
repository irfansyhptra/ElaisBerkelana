// src/components/AboutSection.tsx
import OptimizedImage from "./OptimizedImage";

const AboutSection = () => {
  return (
    <section id="about" className="section-minimal relative overflow-hidden">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 via-white/40 to-orange-50/60"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full px-8 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className="order-2 lg:order-1">
            <div className="glass-card-liquid p-6 hover:scale-105 transition-transform duration-700">
              <OptimizedImage
                src="/images/destinations/gayo.jpg"
                alt="Foto Elais"
                width={600}
                height={600}
                className="rounded-2xl object-cover w-full h-auto hover:scale-105 transition-transform duration-500"
              />

              {/* Floating glass accents */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-green-500/10 backdrop-blur-sm rounded-full border border-green-300/20"></div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div className="glass-card-liquid hover:scale-[1.02] transition-transform duration-500">
              <div className="space-y-6">
                <h2 className="title-large text-gray-900 leading-tight">
                  Tentang Elais
                </h2>

                <div className="glass-card-minimal inline-block px-6 py-3">
                  <p className="text-gray-600 text-sm uppercase tracking-[0.2em] font-medium">
                    Dokumenter Sosial & Peneliti Kelapa Sawit
                  </p>
                </div>

                <div className="space-y-6 text-lg font-light leading-relaxed">
                  <div className="glass-card-minimal p-6">
                    <p className="text-gray-700">
                      Halo, saya Elais. Perjalanan saya bukan sekadar berkelana, 
                      melainkan misi mendokumentasikan dampak positif industri kelapa 
                      sawit terhadap kehidupan masyarakat Indonesia. Setiap desa yang 
                      saya kunjungi menceritakan kisah transformasi ekonomi dan sosial 
                      yang luar biasa.
                    </p>
                  </div>

                  <div className="glass-card-minimal p-6">
                    <p className="text-gray-700">
                      Melalui &ldquo;Elaeis Berkelana&rdquo;, saya berbagi cerita autentik tentang 
                      bagaimana kelapa sawit tidak hanya mengubah lanskap ekonomi pedesaan, 
                      tetapi juga memberdayakan petani kecil, meningkatkan akses pendidikan, 
                      dan mendorong inovasi teknologi berkelanjutan di berbagai wilayah Indonesia.
                    </p>
                  </div>
                </div>

                {/* Call to action with glass effect */}
                <div className="glass-card-minimal p-6 text-center">
                  <button className="btn-primary text-lg px-8 py-4">
                    Jelajahi Dokumentasi Kelapa Sawit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
