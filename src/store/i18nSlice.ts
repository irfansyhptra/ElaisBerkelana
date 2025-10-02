// src/store/i18nSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Language = "id" | "en";

interface I18nState {
  currentLanguage: Language;
  translations: Record<Language, Record<string, string>>;
}

// Comprehensive translations extracted from the entire website
const translations = {
  id: {
    // Site Title
    "site.title": "ELAEIS BERKELANA",
    "site.titleShort": "ELAEIS",
    "site.tagline": "Kisah dari Pelosok Negeri",
    "site.description":
      "Arsip perjalanan personal menelusuri denyut kehidupan di desa-desa Indonesia",

    // Common
    "common.loading": "Memuat...",
    "common.error": "Terjadi kesalahan",
    "common.refresh": "Refresh",
    "common.refreshData": "Refresh Data",
    "common.viewAll": "Lihat Semua",
    "common.readMore": "Baca Selengkapnya",
    "common.back": "Kembali",
    "common.close": "Tutup",
    "common.submit": "Kirim",
    "common.cancel": "Batal",
    "common.save": "Simpan",
    "common.delete": "Hapus",
    "common.edit": "Edit",
    "common.add": "Tambah",
    "common.search": "Cari",
    "common.filter": "Filter",
    "common.all": "Semua",
    "common.none": "Tidak ada",
    "common.loadingPhotos": "Memuat foto...",
    "common.autoRefresh": "Auto-refresh setiap 30 detik",

    // Navigation
    "nav.home": "Beranda",
    "nav.destinations": "Program Sawit",
    "nav.journal": "Dokumentasi",
    "nav.about": "Tentang Misi",
    "nav.contact": "Kontak",
    "nav.admin": "Admin",
    "nav.mobile.home": "Home",
    "nav.mobile.destinations": "Program",
    "nav.mobile.journal": "Dokumentasi",
    "nav.mobile.about": "Tentang",
    "nav.mobile.contact": "Kontak",

    // Footer
    "footer.copyright": "ELAIES BERKELANA. All Rights Reserved.",
    "footer.description": "Sustainable Palm Oil Journey",

    // Hero Section
    "hero.title1": "ELAEIS",
    "hero.title2": "BERKELANA",
    "hero.subtitle":
      "Mengungkap cerita nyata tentang bagaimana industri kelapa sawit berkelanjutan memberdayakan masyarakat, menciptakan lapangan kerja, dan membangun masa depan yang lebih baik di seluruh Indonesia.",
    "hero.cta.primary": "Lihat Program Kami",
    "hero.cta.secondary": "Tentang Misi Kami",
    "hero.scrollDown": "Gulir ke Bawah",

    // Homepage Sections
    "home.featuredPrograms.title": "Program Unggulan",
    "home.featuredPrograms.description":
      "Jelajahi program sosial kelapa sawit terpilih yang telah memberikan dampak positif nyata bagi masyarakat dan lingkungan di berbagai wilayah Indonesia.",
    "home.featuredPrograms.cta": "Lihat Semua Program",
    "home.latestDocumentation.title": "Dokumentasi Terbaru",
    "home.latestDocumentation.description":
      "Catatan perjalanan terbaru dalam mendokumentasikan dampak positif industri kelapa sawit di berbagai wilayah Indonesia.",
    "home.latestDocumentation.cta": "Lihat Semua Dokumentasi",
    "home.videoDocumentation.title": "Video Dokumentasi",
    "home.videoDocumentation.description":
      "Koleksi video perjalanan yang menampilkan kehidupan sehari-hari masyarakat dan program berkelanjutan di berbagai daerah.",

    // Destinations Page
    "destinations.title": "Program Kelapa Sawit",
    "destinations.description":
      "Jelajahi program sosial kelapa sawit yang memberdayakan masyarakat lokal dan mendukung pembangunan berkelanjutan di seluruh Indonesia.",
    "destinations.countryTitle": "Destinasi di {country}",
    "destinations.allProvinces": "Semua Provinsi",
    "destinations.notFound": "Negara tidak ditemukan.",
    "destinations.noDestinations": "Belum ada destinasi yang tersedia.",

    // Destination Detail
    "destination.aboutVillage": "Tentang Desa",
    "destination.empowermentProgram": "Program Pemberdayaan",
    "destination.facilities": "Fasilitas",
    "destination.gallery": "Galeri",
    "destination.testimonials": "Testimoni Masyarakat",
    "destination.impact": "Dampak Sosial",
    "destination.socialImpactScore": "Skor Dampak Sosial",
    "destination.programType": "Jenis Program",
    "destination.type.village": "Desa Binaan",
    "destination.type.plantation": "Kebun Sawit",
    "destination.type.mill": "Pabrik",
    "destination.type.research": "Penelitian",
    "destination.type.community": "Komunitas",

    // Journal/Documentation Page
    "journal.title": "Dokumentasi Visual",
    "journal.description":
      "Koleksi lengkap foto dari semua destinasi sawit berkelanjutan yang telah didokumentasikan",
    "journal.stats.photos": "Foto",
    "journal.stats.destinations": "Destinasi",
    "journal.stats.lastUpdate": "Update: {time}",
    "journal.stats.realTimeUpdate": "Real-time Update",
    "journal.stats.autoRefresh": "Auto-refresh setiap 30 detik",
    "journal.noDocumentation.title": "Belum Ada Dokumentasi",
    "journal.noDocumentation.description":
      "Dokumentasi visual akan muncul di sini setelah gambar destinasi diupload melalui admin panel.",

    // About Page
    "about.title": "Tentang Elaies Berkelana",
    "about.subtitle":
      "Mengungkap dampak positif kelapa sawit untuk masyarakat Indonesia",
    "about.welcome.title": "Selamat Datang di Misi Kami",
    "about.welcome.description1":
      "Elaies Berkelana adalah sebuah platform yang didedikasikan untuk mengungkap dan membagikan cerita nyata tentang dampak positif industri kelapa sawit terhadap kehidupan masyarakat Indonesia. Kami mengunjungi berbagai desa, perkebunan, dan komunitas untuk mendokumentasikan transformasi sosial dan ekonomi yang terjadi.",
    "about.welcome.description2":
      "Melalui dokumentasi video, foto, dan wawancara mendalam, kami mengungkap bagaimana industri kelapa sawit telah memberikan kesempatan kerja, meningkatkan infrastruktur, dan memberdayakan ekonomi lokal di berbagai komunitas.",
    "about.welcome.description3":
      "Tujuan kami adalah menampilkan sisi positif industri kelapa sawit yang berkelanjutan dan menginspirasi lebih banyak program sosial yang dapat mengangkat kesejahteraan masyarakat pedesaan.",
    "about.welcome.cta": "Lihat Program Kami",
    "about.focus.title": "Fokus Program Kami",
    "about.values.socialImpact.title": "Dampak Sosial Nyata",
    "about.values.socialImpact.description":
      "Mengukur dan mendokumentasikan perubahan positif dalam kehidupan masyarakat",
    "about.values.economicEmpowerment.title": "Pemberdayaan Ekonomi",
    "about.values.economicEmpowerment.description":
      "Mengenal lebih dekat kehidupan masyarakat desa",
    "about.values.stories.title": "Kisah di Balik Layar",
    "about.values.stories.description":
      "Berbagi pengalaman unik dan tak terlupakan",

    // Contact Page
    "contact.title": "Hubungi Saya",
    "contact.description":
      "Punya pertanyaan, ide kolaborasi, atau sekadar ingin menyapa?",
    "contact.form.name": "Nama Lengkap",
    "contact.form.email": "Email",
    "contact.form.subject": "Subjek",
    "contact.form.message": "Pesan",
    "contact.form.submit": "Kirim Pesan",
    "contact.form.success": "Pesan berhasil dikirim!",
    "contact.form.error": "Gagal mengirim pesan. Silakan coba lagi.",

    // Admin Panel
    "admin.title": "Panel Admin",
    "admin.tabs.destinations": "Program Sawit",
    "admin.tabs.countries": "Negara",
    "admin.tabs.provinces": "Provinsi",
    "admin.tabs.contacts": "Kontak",
    "admin.form.title": "Judul",
    "admin.form.description": "Deskripsi",
    "admin.form.village": "Desa",
    "admin.form.type": "Tipe Program",
    "admin.form.images": "Gambar",
    "admin.form.save": "Simpan",
    "admin.form.cancel": "Batal",
    "admin.showingPrograms": "Menampilkan {count} program kelapa sawit",
    "admin.allPrograms": "Semua Program",
    "admin.byCountry": "Per Negara",

    // Loading States
    "loading.photos": "Memuat foto...",
    "loading.data": "Memuat data...",
    "loading.programs": "Memuat program...",

    // Empty States
    "empty.noPrograms": "Belum ada program unggulan tersedia.",
    "empty.noDocumentation": "Belum ada dokumentasi yang tersedia.",
    "empty.noDestinations": "Belum ada destinasi yang tersedia.",

    // Buttons
    "button.viewPrograms": "Lihat Program Kami",
    "button.aboutMission": "Tentang Misi Kami",
    "button.startExploration": "Mulai Penjelajahan",
    "button.allPrograms": "Semua Program",
    "button.byCountry": "Per Negara",

    // Language Selector
    "language.indonesian": "Bahasa Indonesia",
    "language.english": "English",
    "language.select": "Pilih Bahasa",

    // Social Media
    "social.instagram": "Instagram",
    "social.youtube": "YouTube",
    "social.email": "Email",

    // Visitor Counter
    "visitor.today": "Hari ini",
    "visitor.total": "Total kunjungan",

    // Error Messages
    "error.pageNotFound": "Halaman tidak ditemukan",
    "error.serverError": "Terjadi kesalahan server",
    "error.networkError": "Kesalahan jaringan",
    "error.tryAgain": "Coba lagi",

    // Success Messages
    "success.dataSaved": "Data berhasil disimpan",
    "success.dataUpdated": "Data berhasil diperbarui",
    "success.dataDeleted": "Data berhasil dihapus",
  },
  en: {
    // Site Title
    "site.title": "ELAEIS BERKELANA",
    "site.titleShort": "ELAEIS",
    "site.tagline": "Stories from Remote Villages",
    "site.description":
      "Personal journey archive exploring the pulse of life in Indonesian villages",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.refresh": "Refresh",
    "common.refreshData": "Refresh Data",
    "common.viewAll": "View All",
    "common.readMore": "Read More",
    "common.back": "Back",
    "common.close": "Close",
    "common.submit": "Submit",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.add": "Add",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.all": "All",
    "common.none": "None",
    "common.loadingPhotos": "Loading photos...",
    "common.autoRefresh": "Auto-refresh every 30 seconds",

    // Navigation
    "nav.home": "Home",
    "nav.destinations": "Palm Oil Programs",
    "nav.journal": "Documentation",
    "nav.about": "About Mission",
    "nav.contact": "Contact",
    "nav.admin": "Admin",
    "nav.mobile.home": "Home",
    "nav.mobile.destinations": "Programs",
    "nav.mobile.journal": "Documentation",
    "nav.mobile.about": "About",
    "nav.mobile.contact": "Contact",

    // Footer
    "footer.copyright": "ELAIES BERKELANA. All Rights Reserved.",
    "footer.description": "Sustainable Palm Oil Journey",

    // Hero Section
    "hero.title1": "ELAEIS",
    "hero.title2": "BERKELANA",
    "hero.subtitle":
      "Unveiling real stories about how sustainable palm oil industry empowers communities, creates jobs, and builds a better future throughout Indonesia.",
    "hero.cta.primary": "View Our Programs",
    "hero.cta.secondary": "About Our Mission",
    "hero.scrollDown": "Scroll Down",

    // Homepage Sections
    "home.featuredPrograms.title": "Featured Programs",
    "home.featuredPrograms.description":
      "Explore selected palm oil social programs that have provided real positive impact for communities and environment across various regions in Indonesia.",
    "home.featuredPrograms.cta": "View All Programs",
    "home.latestDocumentation.title": "Latest Documentation",
    "home.latestDocumentation.description":
      "Latest travel notes documenting the positive impact of palm oil industry in various regions of Indonesia.",
    "home.latestDocumentation.cta": "View All Documentation",
    "home.videoDocumentation.title": "Video Documentation",
    "home.videoDocumentation.description":
      "Collection of travel videos showcasing daily life of communities and sustainable programs in various regions.",

    // Destinations Page
    "destinations.title": "Palm Oil Programs",
    "destinations.description":
      "Explore palm oil social programs that empower local communities and support sustainable development throughout Indonesia.",
    "destinations.countryTitle": "Destinations in {country}",
    "destinations.allProvinces": "All Provinces",
    "destinations.notFound": "Country not found.",
    "destinations.noDestinations": "No destinations available yet.",

    // Destination Detail
    "destination.aboutVillage": "About Village",
    "destination.empowermentProgram": "Empowerment Program",
    "destination.facilities": "Facilities",
    "destination.gallery": "Gallery",
    "destination.testimonials": "Community Testimonials",
    "destination.impact": "Social Impact",
    "destination.socialImpactScore": "Social Impact Score",
    "destination.programType": "Program Type",
    "destination.type.village": "Assisted Village",
    "destination.type.plantation": "Palm Plantation",
    "destination.type.mill": "Mill",
    "destination.type.research": "Research",
    "destination.type.community": "Community",

    // Journal/Documentation Page
    "journal.title": "Visual Documentation",
    "journal.description":
      "Complete photo collection from all documented sustainable palm oil destinations",
    "journal.stats.photos": "Photos",
    "journal.stats.destinations": "Destinations",
    "journal.stats.lastUpdate": "Update: {time}",
    "journal.stats.realTimeUpdate": "Real-time Update",
    "journal.stats.autoRefresh": "Auto-refresh every 30 seconds",
    "journal.noDocumentation.title": "No Documentation Yet",
    "journal.noDocumentation.description":
      "Visual documentation will appear here after destination images are uploaded through admin panel.",

    // About Page
    "about.title": "About Elaies Berkelana",
    "about.subtitle":
      "Unveiling the positive impact of palm oil for Indonesian society",
    "about.welcome.title": "Welcome to Our Mission",
    "about.welcome.description1":
      "Elaies Berkelana is a platform dedicated to uncovering and sharing real stories about the positive impact of the palm oil industry on the lives of Indonesian communities. We visit various villages, plantations, and communities to document the social and economic transformation that occurs.",
    "about.welcome.description2":
      "Through video documentation, photos, and in-depth interviews, we reveal how the palm oil industry has provided job opportunities, improved infrastructure, and empowered local economies in various communities.",
    "about.welcome.description3":
      "Our goal is to showcase the positive side of the sustainable palm oil industry and inspire more social programs that can improve the welfare of rural communities.",
    "about.welcome.cta": "View Our Programs",
    "about.focus.title": "Our Program Focus",
    "about.values.socialImpact.title": "Real Social Impact",
    "about.values.socialImpact.description":
      "Measuring and documenting positive changes in community life",
    "about.values.economicEmpowerment.title": "Economic Empowerment",
    "about.values.economicEmpowerment.description":
      "Getting to know village community life more closely",
    "about.values.stories.title": "Behind the Scenes Stories",
    "about.values.stories.description":
      "Sharing unique and unforgettable experiences",

    // Contact Page
    "contact.title": "Contact Me",
    "contact.description":
      "Have questions, collaboration ideas, or just want to say hello?",
    "contact.form.name": "Full Name",
    "contact.form.email": "Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",
    "contact.form.success": "Message sent successfully!",
    "contact.form.error": "Failed to send message. Please try again.",

    // Admin Panel
    "admin.title": "Admin Panel",
    "admin.tabs.destinations": "Palm Oil Programs",
    "admin.tabs.countries": "Countries",
    "admin.tabs.provinces": "Provinces",
    "admin.tabs.contacts": "Contacts",
    "admin.form.title": "Title",
    "admin.form.description": "Description",
    "admin.form.village": "Village",
    "admin.form.type": "Program Type",
    "admin.form.images": "Images",
    "admin.form.save": "Save",
    "admin.form.cancel": "Cancel",
    "admin.showingPrograms": "Showing {count} palm oil programs",
    "admin.allPrograms": "All Programs",
    "admin.byCountry": "By Country",

    // Loading States
    "loading.photos": "Loading photos...",
    "loading.data": "Loading data...",
    "loading.programs": "Loading programs...",

    // Empty States
    "empty.noPrograms": "No featured programs available yet.",
    "empty.noDocumentation": "No documentation available yet.",
    "empty.noDestinations": "No destinations available yet.",

    // Buttons
    "button.viewPrograms": "View Our Programs",
    "button.aboutMission": "About Our Mission",
    "button.startExploration": "Start Exploration",
    "button.allPrograms": "All Programs",
    "button.byCountry": "By Country",

    // Language Selector
    "language.indonesian": "Bahasa Indonesia",
    "language.english": "English",
    "language.select": "Select Language",

    // Social Media
    "social.instagram": "Instagram",
    "social.youtube": "YouTube",
    "social.email": "Email",

    // Visitor Counter
    "visitor.today": "Today",
    "visitor.total": "Total visits",

    // Error Messages
    "error.pageNotFound": "Page not found",
    "error.serverError": "Server error occurred",
    "error.networkError": "Network error",
    "error.tryAgain": "Try again",

    // Success Messages
    "success.dataSaved": "Data saved successfully",
    "success.dataUpdated": "Data updated successfully",
    "success.dataDeleted": "Data deleted successfully",
  },
};

const initialState: I18nState = {
  currentLanguage: "id",
  translations,
};

const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { setLanguage } = i18nSlice.actions;
export default i18nSlice.reducer;
