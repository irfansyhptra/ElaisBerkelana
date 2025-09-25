# Elaeis Berkelana - Development Guide

## Project Overview

Elaeis Berkelana adalah platform dokumentasi sosial yang menampilkan dampak positif industri kelapa sawit terhadap pemberdayaan masyarakat Indonesia. Project ini terdiri dari frontend (Next.js) dan backend (Node.js/Express).

## Prerequisites

- Node.js (v18 atau lebih baru)
- MongoDB (lokal atau MongoDB Atlas)
- Git

## Project Structure

```
elaeis-berkelana-frontend/
├── src/                     # Frontend (Next.js)
│   ├── app/                # App Router pages
│   ├── components/         # React components
│   ├── lib/               # API utilities
│   └── types/             # TypeScript types
├── elaeis-berkelana-backend/  # Backend API
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   └── middleware/   # Custom middleware
│   └── scripts/          # Utility scripts
└── public/               # Static assets
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd elaeis-berkelana-frontend
```

### 2. Backend Setup

```bash
cd elaeis-berkelana-backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
```

Edit `.env` file dengan konfigurasi yang sesuai:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elaeis-berkelana
ADMIN_KEY=supersecret123

# Cloudinary Configuration (optional untuk upload gambar)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Frontend Setup

```bash
# Kembali ke root directory
cd ..

# Install dependencies
npm install

# Setup environment variables
# File .env.local sudah ada, pastikan konfigurasi sesuai
```

### 4. Database Setup

#### Option A: MongoDB Lokal

1. Install dan jalankan MongoDB di komputer Anda
2. Database akan dibuat otomatis saat aplikasi berjalan

#### Option B: MongoDB Atlas

1. Buat akun di [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Buat cluster baru
3. Dapatkan connection string dan masukkan ke `MONGODB_URI`

### 5. Seed Initial Data

```bash
cd elaeis-berkelana-backend
node scripts/seed-data.js
```

## Running the Application

### 1. Start Backend Server

```bash
cd elaeis-berkelana-backend
npm run dev
```

Backend akan berjalan di `http://localhost:5000`

### 2. Start Frontend Server

```bash
# Di terminal baru, dari root directory
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

## API Endpoints

### Public Endpoints

- `GET /api/v1/countries` - Daftar negara
- `GET /api/v1/provinces` - Daftar provinsi
- `GET /api/v1/destinations` - Daftar destinasi
- `GET /api/v1/destinations/:slug` - Detail destinasi
- `GET /api/v1/visitors` - Jumlah pengunjung
- `PATCH /api/v1/visitors/increment` - Tambah jumlah pengunjung
- `POST /api/v1/contacts` - Kirim pesan kontak

### Admin Endpoints (Perlu header `x-admin-key`)

- `POST /api/v1/countries` - Tambah negara
- `POST /api/v1/provinces` - Tambah provinsi
- `POST /api/v1/destinations` - Tambah destinasi
- `GET /api/v1/contacts` - Daftar pesan kontak
- `PATCH /api/v1/contacts/:id` - Update status kontak

## Features

### Frontend Features

- ✅ Responsive design dengan Tailwind CSS
- ✅ Dynamic routing untuk destinasi
- ✅ Form kontak dengan integrasi API
- ✅ Admin dashboard untuk manajemen konten
- ✅ Visitor counter real-time
- ✅ Featured destinations section
- ✅ Modern glassmorphism design

### Backend Features

- ✅ RESTful API dengan Express.js
- ✅ MongoDB dengan Mongoose ODM
- ✅ File upload dengan Cloudinary
- ✅ Admin authentication middleware
- ✅ Error handling dan validation
- ✅ CORS enabled
- ✅ Rate limiting dan security headers

## Development Workflow

1. **Adding New Features**

   - Create feature branch from `main`
   - Develop feature
   - Test thoroughly
   - Submit pull request

2. **Database Changes**

   - Update models in `elaeis-berkelana-backend/src/models/`
   - Update controllers if needed
   - Update API endpoints
   - Update frontend types and API calls

3. **Adding New Pages**
   - Create page in `src/app/`
   - Add necessary components
   - Update navigation if needed

## Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Pastikan MongoDB berjalan
   - Check connection string di `.env`
   - Pastikan firewall tidak memblokir koneksi

2. **API Calls Failing**

   - Pastikan backend server berjalan di port 5000
   - Check CORS configuration
   - Verify API endpoint URLs

3. **Image Upload Issues**
   - Setup Cloudinary credentials
   - Check file size limits
   - Verify image formats supported

### Environment Variables Checklist

**Backend (.env)**

- ✅ `MONGODB_URI`
- ✅ `PORT`
- ✅ `ADMIN_KEY`
- ⚠️ `CLOUDINARY_*` (optional)

**Frontend (.env.local)**

- ✅ `NEXT_PUBLIC_API_URL`
- ✅ `NEXT_PUBLIC_ADMIN_KEY`

## Production Deployment

### Backend Deployment (Vercel/Railway/Heroku)

1. Set environment variables
2. Configure build scripts
3. Deploy from repository

### Frontend Deployment (Vercel/Netlify)

1. Connect repository
2. Set environment variables
3. Configure build settings
4. Deploy

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## Support

Untuk pertanyaan dan dukungan, silakan buat issue di repository atau hubungi tim development.

---

**Happy Coding! 🚀**
