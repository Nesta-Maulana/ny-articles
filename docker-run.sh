#!/bin/bash

echo "🚀 Menjalankan NYT Article Search dengan Docker"

# Cek API key
if [ -z "$VITE_NYT_API_KEY" ]; then
    echo "❌ API Key belum di-set!"
    echo "Jalankan: export VITE_NYT_API_KEY=api_key_kamu"
    exit 1
fi

# Stop container yang lama jika ada
echo "🛑 Menghentikan container lama..."
docker stop ny-times-search 2>/dev/null || true
docker rm ny-times-search 2>/dev/null || true

# Build image
echo "🏗️ Building Docker image..."
docker build \
    -f Dockerfile.simple \
    --build-arg VITE_NYT_API_KEY=$VITE_NYT_API_KEY \
    -t ny-times-search:simple \
    .

# Jalankan container
echo "🚀 Menjalankan container..."
docker run -d \
    --name ny-times-search \
    -p 3000:80 \
    ny-times-search:simple

# Tunggu sebentar
echo "⏳ Menunggu aplikasi siap..."
sleep 5

# Test health check
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo "✅ Aplikasi berhasil berjalan!"
    echo "🌐 Akses di: http://localhost:3000"
else
    echo "❌ Ada masalah. Cek logs:"
    docker logs ny-times-search
fi

echo ""
echo "📋 Commands berguna:"
echo "   docker logs ny-times-search          # Lihat logs"
echo "   docker stop ny-times-search          # Stop aplikasi"
echo "   docker start ny-times-search         # Start lagi"