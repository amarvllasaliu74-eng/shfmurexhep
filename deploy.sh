#!/bin/bash

echo "🚀 Deployment Script për School Website"
echo "========================================"
echo ""

# Check if backend URL is set
if [ -z "$1" ]; then
    echo "⚠️  Ju lutem jepni backend URL si argument:"
    echo "   ./deploy.sh https://your-backend.onrender.com"
    exit 1
fi

BACKEND_URL=$1

echo "📝 Backend URL: $BACKEND_URL"
echo ""

# Update frontend .env
echo "⚙️  Duke përditësuar frontend/.env..."
cd frontend
echo "REACT_APP_BACKEND_URL=$BACKEND_URL" > .env
echo "WDS_SOCKET_HOST=0.0.0.0" >> .env
echo "WDS_SOCKET_PORT=443" >> .env
echo "ENABLE_HEALTH_CHECK=false" >> .env
echo "✅ .env file u përditësua"
echo ""

# Build frontend
echo "🔨 Duke build frontend..."
yarn build
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi
echo "✅ Build successful"
echo ""

# Deploy to GitHub Pages
echo "🚀 Duke deploy në GitHub Pages..."
yarn deploy
if [ $? -ne 0 ]; then
    echo "❌ Deploy failed!"
    exit 1
fi
echo "✅ Deploy successful"
echo ""

echo "🎉 Website u deploy me sukses!"
echo ""
echo "📍 Aksesoni website në:"
echo "   https://YOUR-USERNAME.github.io/shkolla-rexhep-elmazi"
echo ""
echo "📍 Admin Dashboard:"
echo "   https://YOUR-USERNAME.github.io/shkolla-rexhep-elmazi/admin/login"
echo ""
