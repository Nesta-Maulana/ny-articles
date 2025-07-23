#!/bin/bash

echo "🛑 Menghentikan NYT Article Search"

docker stop ny-times-search 2>/dev/null || echo "Container sudah tidak berjalan"
docker rm ny-times-search 2>/dev/null || echo "Container sudah tidak ada"

echo "✅ Selesai!"