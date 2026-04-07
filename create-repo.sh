#!/bin/bash
# create-repo.sh - Create GitHub repository and push code

echo "🚀 Creating GitHub Repository: wms-platform"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) not found!"
    echo ""
    echo "Install with:"
    echo "  brew install gh"
    echo ""
    echo "Then login:"
    echo "  gh auth login"
    exit 1
fi

# Check if logged in
echo "🔍 Checking GitHub authentication..."
if ! gh auth status &> /dev/null; then
    echo "❌ Not logged in to GitHub!"
    echo ""
    echo "Run: gh auth login"
    exit 1
fi

echo "✅ Authenticated with GitHub"
echo ""

# Create repository
echo "📦 Creating repository 'wms-platform'..."
gh repo create wms-platform --public --description "Warehouse Management System - Modular Monolith with Next.js Frontend" --source=. --remote=origin --push

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Repository created successfully!"
    echo ""
    echo "📁 Repository URL: https://github.com/$(gh api user -q .login)/wms-platform"
    echo ""
    echo "🎯 Next steps:"
    echo "  1. cd ~/Projects/wms-platform"
    echo "  2. docker-compose up -d"
    echo "  3. Open http://localhost:3000"
else
    echo ""
    echo "❌ Failed to create repository"
    echo ""
    echo "Manual steps:"
    echo "  1. Open https://github.com/new"
    echo "  2. Repository name: wms-platform"
    echo "  3. Description: Warehouse Management System"
    echo "  4. Click 'Create repository'"
    echo "  5. Run the push commands shown"
fi
