# Video Tutorial (Tekst Format) - GitHub Hosting 📹

## Pjesa 1: GitHub Setup (5 minuta)

### Ekrani 1: GitHub - Krijoni Repository
```
1. Hapni browser → github.com
2. Login me llogarinë tuaj
3. Klikoni "+" në top-right
4. Zgjidhni "New repository"

SCREENSHOT: GitHub new repo page

5. Shkruani:
   Repository name: shkolla-rexhep-elmazi
   Description: Website i shkollës Rexhep Elmazi
   ✅ Public
   
6. Klikoni "Create repository"
```

### Ekrani 2: Terminal - Push Code
```
Hapni Terminal/CMD në folder tuaj:

cd /path/to/app
git init
git add .
git commit -m "First commit"
git remote add origin https://github.com/YOUR-USERNAME/shkolla-rexhep-elmazi.git
git push -u origin main

✅ Kodi tani është në GitHub!
```

---

## Pjesa 2: MongoDB Setup (10 minuta)

### Ekrani 3: MongoDB Atlas
```
1. Hapni browser → mongodb.com/cloud/atlas
2. Klikoni "Try Free"
3. Regjistrohu me email

SCREENSHOT: MongoDB signup

4. Krijoni Cluster:
   - FREE (M0 Sandbox)
   - Provider: AWS
   - Region: eu-central-1 (Frankfurt)
   - Name: school-cluster
   
5. Klikoni "Create Cluster" (merr 3-5 min)
```

### Ekrani 4: Database User
```
Ndërsa cluster po krijohet:

1. Sidebar → "Database Access"
2. Klikoni "Add New Database User"
3. Shkruani:
   Username: schooladmin
   Password: (krijoni një të fortë - p.sh. "School2026!Secure")
   Role: Atlas Admin
   
4. Klikoni "Add User"

SCREENSHOT: Database user created
```

### Ekrani 5: Network Access
```
1. Sidebar → "Network Access"
2. Klikoni "Add IP Address"
3. Klikoni "Allow Access from Anywhere"
4. Confirm (0.0.0.0/0)

✅ Tani çdo IP mund të lidhet
```

### Ekrani 6: Connection String
```
1. Kthehu në "Database"
2. Klikoni "Connect" në cluster
3. Zgjidhni "Connect your application"
4. Kopjoni string:

mongodb+srv://schooladmin:<password>@school-cluster.abc123.mongodb.net/?retryWrites=true&w=majority

IMPORTANT: Zëvendëso <password> me password-in real!

Ruaje këtë string - do ta përdorim!
```

---

## Pjesa 3: Backend Deploy në Render (15 minuta)

### Ekrani 7: Render Signup
```
1. Hapni browser → render.com
2. Klikoni "Get Started"
3. Zgjidhni "Sign up with GitHub"
4. Authorize Render

SCREENSHOT: Render dashboard
```

### Ekrani 8: Create Web Service
```
1. Klikoni "New +" → "Web Service"
2. Zgjidhni repository: shkolla-rexhep-elmazi
3. Klikoni "Connect"

SCREENSHOT: Repository selected
```

### Ekrani 9: Configure Service
```
Plotëso këto:

Name: shkolla-backend
Region: Frankfurt (EU Central)
Branch: main
Root Directory: backend
Runtime: Python 3
Build Command: pip install -r requirements.txt
Start Command: uvicorn server:app --host 0.0.0.0 --port $PORT

Instance Type: Free

SCREENSHOT: Service configuration
```

### Ekrani 10: Environment Variables
```
Scroll down → "Advanced" → "Add Environment Variable"

Shtoni 3 variables:

1. MONGO_URL
   Value: mongodb+srv://schooladmin:YOUR-PASSWORD@school-cluster...
   (përdorni string-un nga MongoDB!)

2. DB_NAME
   Value: school_website

3. CORS_ORIGINS
   Value: *

SCREENSHOT: Env vars added

Klikoni "Create Web Service"
```

### Ekrani 11: Deployment Progress
```
Render po build backend... (5-10 min)

Watch logs:
✅ Installing dependencies...
✅ Starting server...
✅ Live!

Kopjoni URL në top:
https://shkolla-backend.onrender.com

SCREENSHOT: Backend live!
```

---

## Pjesa 4: Frontend Deploy në GitHub Pages (10 minuta)

### Ekrani 12: Update Frontend Config
```
Në kompjuter:

1. Hap /app/frontend/.env
2. Ndrysho:
   REACT_APP_BACKEND_URL=https://shkolla-backend.onrender.com
   (përdor URL-në nga Render!)
   
3. Ruaj file
```

### Ekrani 13: Install gh-pages
```
Terminal:

cd /app/frontend
yarn add -D gh-pages

✅ gh-pages installed
```

### Ekrani 14: Update package.json
```
Hap /app/frontend/package.json

Shtoni këto 2 linja në top (pas "name"):

"homepage": "https://YOUR-GITHUB-USERNAME.github.io/shkolla-rexhep-elmazi",

Dhe në "scripts" section, shtoni:

"predeploy": "yarn build",
"deploy": "gh-pages -d build",

Ruaj file

SCREENSHOT: package.json updated
```

### Ekrani 15: Build dhe Deploy
```
Terminal:

cd /app/frontend
yarn build

(merr 2-3 min)

✅ Build complete!

Tani deploy:

yarn deploy

(merr 1-2 min)

✅ Published!
```

### Ekrani 16: GitHub Pages Settings
```
1. Shkoni në GitHub repository
2. Klikoni "Settings"
3. Sidebar → "Pages"
4. Source: gh-pages branch
5. Klikoni "Save"

✅ Your site is live at:
https://YOUR-USERNAME.github.io/shkolla-rexhep-elmazi

SCREENSHOT: GitHub Pages enabled
```

---

## Pjesa 5: Setup Admin dhe Test (5 minuta)

### Ekrani 17: Create Admin
```
Browser ose Terminal:

curl -X POST "https://shkolla-backend.onrender.com/api/auth/setup" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

Response: {"success":true,"message":"Admin created"}

✅ Admin account gati!
```

### Ekrani 18: Test Website
```
Hap browser:

1. Shkoni në: https://YOUR-USERNAME.github.io/shkolla-rexhep-elmazi

✅ Website loading...
✅ Hero slideshow po luan!
✅ News ticker po lëviz!

SCREENSHOT: Website live!
```

### Ekrani 19: Test Admin
```
1. Shkoni në: /admin/login
2. Login:
   Username: admin
   Password: admin123
   
✅ Admin dashboard opened!

SCREENSHOT: Admin dashboard

3. Test upload:
   - Kliko "Hero Slideshow" tab
   - Upload një foto
   - Shto title dhe description
   - Kliko "Add"
   
✅ Slide added!

4. Shkoni në homepage - slide i ri duhet të dalë!
```

---

## 🎉 MBAROI! Website Juaj është LIVE!

**URLs:**
- Website: `https://YOUR-USERNAME.github.io/shkolla-rexhep-elmazi`
- Admin: `https://YOUR-USERNAME.github.io/shkolla-rexhep-elmazi/admin/login`
- Live TV: `https://YOUR-USERNAME.github.io/shkolla-rexhep-elmazi/live`

**Credentials:**
- Username: admin
- Password: admin123

**Total Time**: ~45 minuta
**Total Cost**: 0€ (FALAS!)

---

## Troubleshooting

### Problem: "Backend nuk po përgjigjet"
**Zgjidhja**: 
- Shkoni në Render dashboard
- Kliko "Logs"
- Check për errors
- Sigurohu që MONGO_URL është correct

### Problem: "Frontend nuk po shfaq përmbajtje"
**Zgjidhja**:
- Check që REACT_APP_BACKEND_URL në frontend/.env është correct
- Rebuild: `yarn build && yarn deploy`

### Problem: "Can't login to admin"
**Zgjidhja**:
- Rerun setup: `curl -X POST "BACKEND_URL/api/auth/setup" -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}'`

---

**Urime! Tani jeni GitHub & Render expert! 🚀**
