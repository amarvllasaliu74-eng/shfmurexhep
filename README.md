# Shkolla Rexhep Elmazi - Website

Website për Shkollën Fillore e Mesme e Ulët "Rexhep Elmazi" në Gjilan, Kosovë.

## 🌐 Si ta shoh Website LIVE?

**TANI** po sheh vetëm kodin në GitHub. Për ta parë website si punon, duhet ta deploy:

### HAPI 1: Deploy Backend (15 minuta)

1. Shko në **[render.com](https://render.com)** dhe regjistrohu me GitHub
2. Kliko **"New +"** → **"Web Service"**
3. Zgjedh repository: **shfmurexhep**
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Add **Environment Variables**:
   - `MONGO_URL`: (MongoDB connection - mer nga mongodb.com/atlas)
   - `DB_NAME`: `school_website`
   - `CORS_ORIGINS`: `*`
6. Kliko **"Create Web Service"**
7. **Kopjo URL-në** e backend (p.sh. `https://shfmurexhep.onrender.com`)

### HAPI 2: Deploy Frontend (10 minuta)

Në kompjuter:

```bash
# Shko në folder frontend
cd frontend

# Update .env me backend URL nga Hapi 1
echo "REACT_APP_BACKEND_URL=https://shfmurexhep.onrender.com" > .env
echo "WDS_SOCKET_HOST=0.0.0.0" >> .env
echo "WDS_SOCKET_PORT=443" >> .env

# Install gh-pages
yarn add -D gh-pages

# Deploy në GitHub Pages
yarn deploy
```

### HAPI 3: Enable GitHub Pages

1. Në GitHub repository, shko në **Settings** → **Pages**
2. Source: zgjedh **gh-pages** branch
3. Kliko **"Save"**

**GATI!** Pas 2-3 minutash, website do të jetë LIVE në:

**https://amarvllasaliu74-eng.github.io/shfmurexhep**

---

## 🔗 URLs (pas deployment)

- 🌐 **Website**: https://amarvllasaliu74-eng.github.io/shfmurexhep
- 👤 **Admin**: https://amarvllasaliu74-eng.github.io/shfmurexhep/admin/login
- 📺 **Live TV**: https://amarvllasaliu74-eng.github.io/shfmurexhep/live

**Admin Credentials:**
- Username: `admin`
- Password: `admin123`

---

## 💰 Kosto

- **GitHub Pages**: FALAS ✅
- **Render Backend**: FALAS (por shkon në sleep pas 15 min) ✅
- **MongoDB Atlas**: FALAS (512MB) ✅

**Total: 0€/muaj**

---

## 🚀 Features

- 7 faqe publike (në shqip)
- Hero Slideshow me fotografi eventesh
- News Ticker i verdhë
- Student Slideshow
- Admin Dashboard (CRUD për të gjitha përmbajtjet)
- Live TV Dashboard (për ekran në shkollë)
- Upload foto
- Google Maps
- Orë pune të përditësuara

---

## 📞 Support

Email: shfmurexhepelmazi@hotmail.com

---

**Punuar nga Amar Vllasaliu** 💙💛
