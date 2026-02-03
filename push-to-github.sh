#!/bin/bash

# PUSH TO GITHUB - Ekzekuto këtë komandë në kompjuterin tuaj lokal

echo "🚀 Pushing code to GitHub..."
echo "======================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "⚠️  Git not initialized. Run: git init"
    exit 1
fi

# Add remote
echo "📡 Adding GitHub remote..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/amarvllasaliu74-eng/shfmurexhep.git

# Set branch to main
echo "🌿 Setting branch to main..."
git branch -M main

# Add all files
echo "📦 Adding files..."
git add .

# Commit
echo "💾 Committing..."
git commit -m "Complete school website - Shkolla Rexhep Elmazi" || echo "Nothing to commit"

# Push
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "📍 Repository: https://github.com/amarvllasaliu74-eng/shfmurexhep"
echo ""
echo "Next steps:"
echo "1. Setup MongoDB Atlas (see GITHUB_DEPLOYMENT_GUIDE_SHQIP.md)"
echo "2. Deploy backend on Render.com"
echo "3. Deploy frontend on GitHub Pages"
echo ""
