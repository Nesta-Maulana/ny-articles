# NYT Article Search 📰

Aplikasi pencarian artikel The New York Times yang dibuat dengan React dan TypeScript. Cocok buat kamu yang suka baca berita tapi males buka website NYT langsung - tinggal ketik aja keyword yang dicari!

## Apa aja sih yang bisa dilakukan?

 **Responsive Design** - Enak dilihat di HP maupun laptop  
 **Loading yang Smooth** - Ada animasi skeleton pas loading biar gak boring  
 **UI Modern** - Desain clean kayak Medium, tapi khusus buat artikel NYT  
 **Homepage dengan Trending** - Ada artikel terbaru pas pertama buka  
 **Pagination** - Navigasi mudah kalo artikelnya banyak  
 **Error Handling** - Kalo ada error tetep ditampilin dengan bagus  

## Teknologi yang Dipake

- **React 19** dengan **TypeScript** buat frontend
- **Vite** sebagai build tool (lebih cepet dari Create React App)
- **CSS Modules** buat styling yang modular
- **Axios** buat API calls ke NYT
- **Docker & Nginx** buat deployment production
- **Vitest** buat testing

## Cara Menjalankan

### Persiapan

Yang perlu diinstal dulu:
- Node.js versi 18 ke atas 
- npm (biasanya udah include sama Node.js)
- API Key dari NYT (gratis kok, daftar di https://developer.nytimes.com)

# Docker Simple - Cara Mudah Jalanin Aplikasi

## Persiapan

1. **Install Docker** - Pastiin Docker udah terinstall di komputer
2. **API Key NYT** - Daftar di https://developer.nytimes.com buat dapetin API key

## Cara Pakai

### Step 1: Set API Key
```bash
export VITE_NYT_API_KEY=api_key_kamu_disini
```

### Step 2: Jalankan Aplikasi
```bash
./docker-run.sh
```

### Step 3: Buka Browser
Buka http://localhost:3000

## Commands

## Perintah yang Tersedia

```bash
# Development
npm run dev          # Jalanin server development
npm run build        # Build buat production
npm run preview      # Preview hasil build

# Testing  
npm run test         # Jalanin test
npm run test:coverage # Cek test coverage

# Code Quality
npm run lint         # Cek kode dengan ESLint
npm run typecheck    # Cek TypeScript
```

```bash
# Jalankan aplikasi
./docker-run.sh

# Stop aplikasi  
./docker-stop.sh

# Lihat logs
docker logs ny-times-search

# Restart aplikasi
./docker-stop.sh && ./docker-run.sh
```

## Troubleshooting

**Q: Error "VITE_NYT_API_KEY tidak di-set"**
```bash
export VITE_NYT_API_KEY=your_actual_api_key_here
```

**Q: Port 3000 sudah dipakai**
Edit `docker-run.sh`, ganti `-p 3000:80` jadi `-p 8080:80`

**Q: Build gagal**
```bash
# Clean up dulu
docker system prune -f
./docker-run.sh
```

**Q: Aplikasi gak mau load**
```bash
# Cek logs
docker logs ny-times-search

# Restart
./docker-stop.sh
./docker-run.sh
```

## File-file Penting

- `Dockerfile.simple` - Docker config yang simple
- `docker-run.sh` - Script buat jalanin
- `docker-stop.sh` - Script buat stop

## Spesifikasi

- **Image Size**: ~50MB
- **Memory Usage**: ~128MB
- **Startup Time**: ~10 detik
- **Port**: 3000 (bisa diganti)

## Struktur Project

```
src/
├── components/
│   ├── atoms/          # Komponen dasar (Button, Input, dll)
│   ├── molecules/      # Komponen gabungan (SearchBar, ArticleCard)
│   └── organisms/      # Komponen kompleks (Header, ArticleList)
├── services/           # API calls dan error handling
├── types/              # TypeScript interfaces
├── hooks/              # Custom React hooks (useDebounce, dll)
├── utils/              # Helper functions
└── styles/             # CSS dan styling
```

## Fitur-fitur Keren

### 🎯 Smart Search
- Debouncing 500ms biar gak spam API
- Auto-complete feeling pas ngetik
- Search history (coming soon!)

### 🏠 Homepage Experience  
- Artikel trending otomatis muncul
- Topic suggestions buat inspirasi
- Smooth transition ke hasil pencarian

### 📱 Mobile-First Design
- Grid yang adaptif (1 kolom di mobile, 3 kolom di desktop)
- Touch-friendly buttons
- Swipe gestures (coming soon!)

### ⚡ Performance Optimizations
- Lazy loading images
- CSS animations instead of JS
- Minimal bundle size (~270KB gzipped)
- Nginx caching buat production

## Troubleshooting

**Q: Aplikasi gak bisa load artikel?**  
A: Cek API key di file `.env`, pastiin valid dan gak expired

**Q: Error "Network Error"?**  
A: Kemungkinan koneksi internet atau API NYT lagi down. Coba lagi nanti.

**Q: Docker build gagal?**  
A: Pastiin Docker udah jalan dan API key udah di-set di environment variable

**Q: Hasil pencarian kosong terus?**  
A: Coba keyword yang lebih umum kayak "trump", "covid", atau "climate"

## Browser Support

Udah ditest di:
- ✅ Chrome (mobile & desktop)
- ✅ Safari (iOS & macOS) 
- ✅ Firefox
- ✅ Edge

## Development Notes

Kalo mau contribute atau modifikasi:

1. **Code Style**: Pake ESLint dan Prettier config yang udah ada
2. **Components**: Ikutin Atomic Design pattern
3. **Types**: Semua harus properly typed (no `any`!)
4. **Testing**: Bikin test buat fitur baru
5. **Docker**: Test production build sebelum merge
