// src/components/AboutSection.tsx
import Image from "next/image";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <Image
              src="/elais-profile.jpg" // Ganti dengan foto Anda di folder public
              alt="Foto Elais"
              width={500}
              height={500}
              className="rounded-lg shadow-2xl object-cover w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-brand-dark mb-4">
              Tentang Elais
            </h2>
            <p className="text-gray-500 mb-2 uppercase tracking-widest">
              Penjelajah & Pencerita
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Halo, saya Elais. Perjalanan bagi saya bukan sekadar berpindah
              tempat, melainkan proses menemukan makna di setiap sudut desa yang
              saya singgahi. Website ini adalah catatan digital dari setiap
              langkah, senyuman warga, dan aroma masakan lokal yang saya temui.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Melalui tulisan dan video, saya berharap dapat berbagi kehangatan
              dan kearifan yang tersembunyi di pelosok negeri, menginspirasi
              Anda untuk melihat lebih dekat keindahan di sekitar kita.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
