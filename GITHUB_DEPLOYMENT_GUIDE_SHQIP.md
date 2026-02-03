# Udhëzues i Thjeshtë për GitHub Hosting (Hera e Parë) 🚀

## Çfarë keni nevojë:
1. Llogari në GitHub (falas) - [github.com](https://github.com)
2. Llogari në Render.com (falas) - [render.com](https://render.com)
3. Llogari në MongoDB Atlas (falas) - [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

---

## HAPI 1: Krijoni GitHub Repository

1. **Shkoni në GitHub.com dhe login**
   
2. **Klikoni "+" në top-right → "New repository"**

3. **Plotësoni:**
   - Repository name: `shkolla-rexhep-elmazi`
   - Description: `Website për Sh.F.M.U. Rexhep Elmazi`
   - ✅ Public (që të funksionojë GitHub Pages falas)
   - ✅ Add README (skip sepse e kemi tashmë)
   
4. **Klikoni "Create repository"**

5. **Kopjoni komandën që GitHub ju jep (diçka si):**
   ```bash
   git remote add origin https://github.com/your-username/shkolla-rexhep-elmazi.git
   ```

---

## HAPI 2: Push Code në GitHub

Në terminal/command prompt (në folder `/app`):

```bash
# Inicializoni Git (vetëm herën e parë)
cd /app
git init

# Shtoni të gjitha files
git add .

# Commit
git commit -m "Initial commit - School website"

# Lidheni me GitHub (përdorni komandën që kopjuat nga GitHub)
git remote add origin https://github.com/YOUR-USERNAME/shkolla-rexhep-elmazi.git

# Push code
git branch -M main
git push -u origin main
```

**✅ Tani kodi juaj është në GitHub!**

---

## HAPI 3: Setup MongoDB (Database - FALAS)

1. **Shkoni në [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)**

2. **Klikoni "Try Free" dhe regjistrohuni**

3. **Krijoni një Cluster:**
   - Zgjidhni **FREE tier** (M0)
   - Zgjidhni rajonin më të afërt (Europe)
   - Emri: `school-cluster`
   - Klikoni "Create"

4. **Setup Security:**
   - Klikoni "Database Access" → "Add New Database User"
   - Username: `schooladmin`
   - Password: (krijoni një password të fortë - shkruajeni!)
   - Role: `Atlas Admin`
   
5. **Network Access:**
   - Klikoni "Network Access" → "Add IP Address"
   - Klikoni "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

6. **Merrni Connection String:**
   - Klikoni "Database" → "Connect" → "Connect your application"
   - Kopjoni connection string:
     ```
     mongodb+srv://schooladmin:<password>@school-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - **IMPORTANT**: Zëvendësoni `<password>` me password që krijuat!

**✅ Database gati!**

---

## HAPI 4: Deploy Backend në Render (FALAS)

1. **Shkoni në [render.com](https://render.com) dhe regjistrohuni me GitHub**

2. **Klikoni "New +" → "Web Service"**

3. **Zgjidhni GitHub repository: `shkolla-rexhep-elmazi`**

4. **Konfiguroni:**
   ```
   Name: shkolla-backend
   Region: Frankfurt (ose EU)
   Branch: main
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn server:app --host 0.0.0.0 --port $PORT
   ```

5. **Environment Variables** (klikoni "Advanced" → "Add Environment Variable"):
   ```
   MONGO_URL = mongodb+srv://schooladmin:YOUR-PASSWORD@school-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   DB_NAME = school_website
   CORS_ORIGINS = *
   ```
   *(Përdorni MongoDB connection string nga HAPI 3)*

6. **Instance Type: Free**

7. **Klikoni "Create Web Service"**

8. **Prisni 5-10 minuta** - Render do të build backend

9. **Kopjoni URL-në** (diçka si: `https://shkolla-backend.onrender.com`)

**✅ Backend live!**

---

## HAPI 5: Deploy Frontend në GitHub Pages (FALAS)

1. **Update frontend/.env në kompjuterin tuaj:**
   ```bash
   cd /app/frontend
   
   # Edit .env file
   nano .env  # ose përdorni editor tjetër
   ```
   
   Ndërroni këtë linjë:
   ```
   REACT_APP_BACKEND_URL=https://shkolla-backend.onrender.com
   ```
   *(Përdorni URL-në e backend nga HAPI 4)*

2. **Build frontend:**
   ```bash
   yarn build
   ```

3. **Install gh-pages:**
   ```bash
   yarn add -D gh-pages
   ```

4. **Update `package.json`** - shtoni këto 2 linja:
   ```json
   {
     "homepage": "https://YOUR-GITHUB-USERNAME.github.io/shkolla-rexhep-elmazi",
     "scripts": {
       "predeploy": "yarn build",
       "deploy": "gh-pages -d build",
       ...existing scripts...
     }
   }
   ```

5. **Deploy:**
   ```bash
   yarn deploy
   ```

6. **GitHub Pages Settings:**
   - Shkoni në GitHub repository
   - Klikoni **Settings** → **Pages**
   - Source: `gh-pages` branch
   - Klikoni "Save"

**✅ Website live në: `https://YOUR-USERNAME.github.io/shkolla-rexhep-elmazi`**

---

## HAPI 6: Setup Admin Account

1. **Shkoni në backend URL + `/api/auth/setup`:**
   ```
   https://shkolla-backend.onrender.com/api/auth/setup
   ```

2. **Ose përdorni curl:**
   ```bash
   curl -X POST "https://shkolla-backend.onrender.com/api/auth/setup" \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"admin123"}'
   ```

**✅ Admin account krijuar!**

---

## 🎉 GATI! Website juaj është LIVE!

- **Public Website**: `https://YOUR-USERNAME.github.io/shkolla-rexhep-elmazi`
- **Admin Dashboard**: `https://YOUR-USERNAME.github.io/shkolla-rexhep-elmazi/admin/login`
- **Live TV**: `https://YOUR-USERNAME.github.io/shkolla-rexhep-elmazi/live`

---

## ⚠️ Probleme të Mundshme dhe Zgjidhje

### "Backend nuk po funksionon"
- Kontrolloni që MONGO_URL në Render është i saktë
- Kontrolloni logs në Render dashboard

### "Frontend nuk po shfaq përmbajtje"
- Sigurohuni që `REACT_APP_BACKEND_URL` në frontend/.env është URL e saktë e Render
- Rebuild: `yarn build && yarn deploy`

### "Images nuk po shfaqen"
- Normal! Në deployment falas, uploaded images nuk ruhen përgjithmonë
- Zgjidhje: Përdorni Cloudinary ose AWS S3 për image storage (më vonë)

---

## 🔄 Si të Update Website

Kur bëni ndryshime:

```bash
# Backend changes
git add .
git commit -m "Update backend"
git push

# Render do të rebuild automatikisht!

# Frontend changes
cd frontend
yarn build
yarn deploy

# GitHub Pages do të update!
```

---

## 📞 Ndihmë

Nëse keni probleme, më dërgoni screenshot dhe do t'ju ndihmoj!

## 💰 Kostot

- **GitHub Pages**: Falas ✅
- **Render.com**: Falas (por shkon në sleep pas 15 min inaktivitet) ✅
- **MongoDB Atlas**: Falas (512MB) ✅

**Total: 0€/muaj** 🎉

*Nëse dëshironi që backend të mos shkojë në sleep, Render Pro është $7/muaj*
