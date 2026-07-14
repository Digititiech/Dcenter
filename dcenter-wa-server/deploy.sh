#!/bin/bash

# ─── Decision Center WhatsApp Gateway — VPS Deploy Script ─────────────────────
# Run this script on your VPS inside /root/dcenter-wa-server
# Usage: chmod +x deploy.sh && ./deploy.sh

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " Decision Center WhatsApp Go Server Deploy"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. Install Go if not present
if ! command -v go &>/dev/null; then
  echo "→ Installing Go..."
  wget -q https://go.dev/dl/go1.22.5.linux-amd64.tar.gz -O /tmp/go.tar.gz
  rm -rf /usr/local/go
  tar -C /usr/local -xzf /tmp/go.tar.gz
  export PATH=$PATH:/usr/local/go/bin
  echo 'export PATH=$PATH:/usr/local/go/bin' >> /root/.bashrc
  echo "✓ Go installed: $(go version)"
else
  echo "✓ Go already installed: $(go version)"
fi

export PATH=$PATH:/usr/local/go/bin

# 2. Install CGO dependency (for go-sqlite3)
echo "→ Installing build dependencies..."
apt-get install -y gcc libsqlite3-dev 2>/dev/null || true

# 3. Fetch correct dependency versions
echo "→ Fetching dependencies..."
go get github.com/mattn/go-sqlite3@latest
go get github.com/skip2/go-qrcode@latest
go get go.mau.fi/whatsmeow@latest
go get google.golang.org/protobuf@latest
go mod tidy
echo "✓ Dependencies resolved."

# 4. Build the binary
echo "→ Building Go binary..."
CGO_ENABLED=1 go build -o dcenter-whatsapp-server .

echo "✓ Build successful!"

# 5. Stop old Node.js bot
echo "→ Stopping old Node.js WhatsApp process..."
pm2 delete dcenter-whatsapp 2>/dev/null || echo "  (no old process found)"

# 6. Start new Go server with PM2
echo "→ Starting new Go WhatsApp server..."
PORT=3002 pm2 start ./dcenter-whatsapp-server \
  --name dcenter-whatsapp \
  --interpreter none

pm2 save

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✓ Deploy complete!"
echo "  Test: curl http://localhost:3002/api/status"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
