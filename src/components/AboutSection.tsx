// src/components/AboutSection.tsx
import Image from "next/image";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="section-minimal bg-gradient-to-br from-white via-gray-50 to-white"
    >
      <div className="grid-system">
        <div className="grid-col-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="glass-card-minimal">
                <Image
                  src="/elais-profile.jpg" // Ganti dengan foto Anda di folder public
                  alt="Foto Elais"
                  width={600}
                  height={600}
                  className="rounded-2xl shadow-2xl object-cover w-full h-auto hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div className="glass-card-minimal">
                <div className="space-y-6">
                  <h2 className="title-large text-gray-900 leading-tight">
                    Tentang Elais
                  </h2>

                  <p className="text-gray-500 text-sm uppercase tracking-[0.2em] font-medium">
                    Penjelajah & Pencerita
                  </p>

                  <div className="space-y-6 text-lg font-light leading-relaxed">
                    <p className="text-gray-700">
                      Halo, saya Elais. Perjalanan bagi saya bukan sekadar
                      berpindah tempat, melainkan proses menemukan makna di
                      setiap sudut desa yang saya singgahi. Website ini adalah
                      catatan digital dari setiap langkah, senyuman warga, dan
                      aroma masakan lokal yang saya temui.
                    </p>

                    <p className="text-gray-700">
                      Melalui tulisan dan video, saya berharap dapat berbagi
                      kehangatan dan kearifan yang tersembunyi di pelosok
                      negeri, menginspirasi Anda untuk melihat lebih dekat
                      keindahan di sekitar kita.
                    </p>
                  </div>
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
