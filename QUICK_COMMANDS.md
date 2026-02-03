# 🚀 Quick Commands Reference

Kopjoni dhe përdorni këto komanda direkt!

---

## 📦 INITIAL SETUP

### Push to GitHub (First Time)
```bash
cd /app
git init
git add .
git commit -m "Initial commit - School website"
git remote add origin https://github.com/YOUR-USERNAME/shkolla-rexhep-elmazi.git
git branch -M main
git push -u origin main
```

---

## 🗄️ MONGODB CONNECTION STRING

**Format:**
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Example:**
```
mongodb+srv://schooladmin:School2026!@school-cluster.abc123.mongodb.net/?retryWrites=true&w=majority
```

---

## 👤 CREATE ADMIN ACCOUNT

**Via curl:**
```bash
curl -X POST "https://YOUR-BACKEND.onrender.com/api/auth/setup" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Via browser:**
Open: `https://YOUR-BACKEND.onrender.com/api/auth/setup`

---

## 🌐 FRONTEND DEPLOYMENT

### One-time Setup
```bash
cd /app/frontend

# Install gh-pages
yarn add -D gh-pages

# Update .env
echo "REACT_APP_BACKEND_URL=https://YOUR-BACKEND.onrender.com" > .env
echo "WDS_SOCKET_HOST=0.0.0.0" >> .env
echo "WDS_SOCKET_PORT=443" >> .env
echo "ENABLE_HEALTH_CHECK=false" >> .env
```

### Deploy
```bash
cd /app/frontend
yarn build
yarn deploy
```

---

## 🔄 UPDATE WEBSITE

### Update Backend
```bash
cd /app
git add backend/
git commit -m "Update backend"
git push
```
*Render will auto-deploy in 2-3 minutes*

### Update Frontend
```bash
cd /app/frontend
yarn build
yarn deploy
```
*GitHub Pages will update in 1-2 minutes*

### Update Both
```bash
cd /app
git add .
git commit -m "Update website"
git push

cd frontend
yarn build
yarn deploy
```

---

## 🧪 TESTING COMMANDS

### Test Backend API
```bash
# Health check
curl https://YOUR-BACKEND.onrender.com/

# Get students
curl https://YOUR-BACKEND.onrender.com/api/student-of-month

# Get hero slides
curl https://YOUR-BACKEND.onrender.com/api/hero-slides

# Test login
curl -X POST "https://YOUR-BACKEND.onrender.com/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Test Image Upload
```bash
curl -X POST "https://YOUR-BACKEND.onrender.com/api/upload" \
  -F "file=@/path/to/image.jpg"
```

---

## 📝 ADD SAMPLE DATA

### Add Hero Slide
```bash
curl -X POST "https://YOUR-BACKEND.onrender.com/api/hero-slides" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mirësevini",
    "description": "Shkolla jonë ka hapësira të reja",
    "image_url": "https://source.unsplash.com/800x600/?school",
    "slide_type": "event",
    "order": 1,
    "active": true
  }'
```

### Add Student of Month
```bash
curl -X POST "https://YOUR-BACKEND.onrender.com/api/student-of-month" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Student",
    "class_name": "Klasa 9-A",
    "month": "Shkurt",
    "year": 2026,
    "reason": "Për rezultate të shkëlqyeshme",
    "photo_url": "https://randomuser.me/api/portraits/women/65.jpg"
  }'
```

### Add Announcement
```bash
curl -X POST "https://YOUR-BACKEND.onrender.com/api/announcements" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Njoftim i rëndësishëm për prindërit dhe nxënësit"
  }'
```

---

## 🗑️ DELETE DATA

### Delete by ID
```bash
# Delete student
curl -X DELETE "https://YOUR-BACKEND.onrender.com/api/student-of-month/STUDENT-ID"

# Delete slide
curl -X DELETE "https://YOUR-BACKEND.onrender.com/api/hero-slides/SLIDE-ID"

# Delete announcement
curl -X DELETE "https://YOUR-BACKEND.onrender.com/api/announcements/ANNOUNCEMENT-ID"
```

---

## 🔧 TROUBLESHOOTING COMMANDS

### Check Backend Logs (Render)
```
Go to: https://dashboard.render.com
→ Select your service
→ Click "Logs"
```

### Rebuild Frontend
```bash
cd /app/frontend
rm -rf build node_modules/.cache
yarn build
yarn deploy
```

### Reset Git (if needed)
```bash
cd /app
rm -rf .git
git init
git add .
git commit -m "Fresh start"
git remote add origin https://github.com/YOUR-USERNAME/shkolla-rexhep-elmazi.git
git push -u origin main --force
```

### Check Current Git Remote
```bash
cd /app
git remote -v
```

---

## 📊 USEFUL QUERIES

### Count Documents
```bash
# Count students
curl https://YOUR-BACKEND.onrender.com/api/student-of-month | python3 -c "import sys,json; print(len(json.load(sys.stdin)))"

# Count slides
curl https://YOUR-BACKEND.onrender.com/api/hero-slides | python3 -c "import sys,json; print(len(json.load(sys.stdin)))"
```

### Get All Data (Pretty Print)
```bash
curl https://YOUR-BACKEND.onrender.com/api/student-of-month | python3 -m json.tool

curl https://YOUR-BACKEND.onrender.com/api/hero-slides | python3 -m json.tool
```

---

## 🎨 CUSTOMIZATION SHORTCUTS

### Change Colors
Edit: `/app/frontend/src/index.css`
```css
--school-blue: #YOUR-COLOR;
--school-yellow: #YOUR-COLOR;
```

### Change Font
Edit: `/app/frontend/src/index.css`
```css
@import url('https://fonts.googleapis.com/css2?family=YOUR-FONT&display=swap');
font-family: 'YOUR-FONT', sans-serif;
```

Then redeploy:
```bash
cd /app/frontend
yarn build
yarn deploy
```

---

## 📱 MOBILE TESTING

Test on different devices:
- https://responsivedesignchecker.com/
- Paste your GitHub Pages URL

Or use browser DevTools:
- Chrome: F12 → Toggle device toolbar (Ctrl+Shift+M)
- Firefox: F12 → Responsive Design Mode (Ctrl+Shift+M)

---

## 🆘 EMERGENCY ROLLBACK

If something breaks:

### Rollback Frontend
```bash
cd /app/frontend
git log --oneline  # Find last good commit
git checkout COMMIT-HASH
yarn build
yarn deploy
git checkout main  # Return to latest
```

### Rollback Backend
In Render Dashboard:
- Go to service → "Manual Deploy"
- Select previous successful deploy
- Click "Deploy"

---

## 💾 BACKUP COMMANDS

### Backup Database
```bash
# Get all data
curl https://YOUR-BACKEND.onrender.com/api/student-of-month > backup_students.json
curl https://YOUR-BACKEND.onrender.com/api/hero-slides > backup_slides.json
curl https://YOUR-BACKEND.onrender.com/api/activities > backup_activities.json
curl https://YOUR-BACKEND.onrender.com/api/tournaments > backup_tournaments.json
curl https://YOUR-BACKEND.onrender.com/api/announcements > backup_announcements.json
```

### Restore Data
Use admin dashboard to re-add, or use curl POST commands

---

**Save this file!** Bookmark it for quick access! 🔖
