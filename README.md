# Sh.F.M.U. "Rexhep Elmazi" - School Website

Website profesional për Shkollën Fillore e Mesme e Ulët "Rexhep Elmazi" në Gjilan, Kosovë.

## 🎯 Features

- **7 Faqe Publike** (në shqip): Ballina, Nxënësi i Muajit, Nxënësit më të Mirë, Aktivitetet, Turniret, Rreth Shkollës, Kontakt
- **Hero Slideshow** - Fotografi eventesh që lëvizin automatikisht
- **News Ticker** - Shirit i verdhë me lajme që lëvizin
- **Admin Dashboard** - Menaxhim i plotë për të gjitha përmbajtjet
- **Live TV Dashboard** - Ekran për TV në shkollë me përmbajtje që rrotullohet

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB

### Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment variables
cp .env.example .env
# Edit .env and add your MongoDB connection string

# Run backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
yarn install

# Copy and configure environment variables
cp .env.example .env
# Edit .env and set REACT_APP_BACKEND_URL=http://localhost:8001

# Run frontend
yarn start
```

Website do të hapet në `http://localhost:3000`

## 📦 Deployment

### Option 1: GitHub Pages (Frontend) + Render (Backend)

**Më e thjeshtë dhe FALAS!**

#### Deploy Backend në Render.com:

1. Shkoni në [render.com](https://render.com) dhe regjistrohuni
2. Klikoni "New +" → "Web Service"
3. Lidheni me GitHub repository
4. Konfiguroni:
   - **Name**: `shkolla-rexhep-elmazi-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Shtoni Environment Variables:
   - `MONGO_URL`: MongoDB connection string (merreni nga [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))
   - `DB_NAME`: `school_website`
   - `CORS_ORIGINS`: `*`
6. Klikoni "Create Web Service"
7. Prisni 5-10 minuta - backend do të jetë live!
8. Kopjoni URL-në (p.sh. `https://shkolla-rexhep-elmazi-backend.onrender.com`)

#### Deploy Frontend në GitHub Pages:

1. Update `frontend/.env`:
   ```
   REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
   ```

2. Build frontend:
   ```bash
   cd frontend
   yarn build
   ```

3. Deploy në GitHub:
   ```bash
   # Install gh-pages
   yarn add -D gh-pages

   # Add në package.json:
   # "homepage": "https://your-username.github.io/school-website",
   # "scripts": {
   #   "predeploy": "yarn build",
   #   "deploy": "gh-pages -d build"
   # }

   # Deploy
   yarn deploy
   ```

4. Në GitHub repository settings:
   - Shkoni në **Settings** → **Pages**
   - Source: `gh-pages` branch
   - Ruani

Website do të jetë live në `https://your-username.github.io/school-website`

### Option 2: Railway (Full-stack)

1. Shkoni në [railway.app](https://railway.app)
2. Klikoni "New Project" → "Deploy from GitHub repo"
3. Zgjidhni repository
4. Railway do të detektojë automatikisht backend dhe frontend
5. Shtoni environment variables
6. Deploy!

**Cost**: $5/month free credit

## 👤 Admin Credentials

**Default Admin:**
- Username: `admin`
- Password: `admin123`

**IMPORTANT**: Ndërroni password pas first login!

## 🎨 Customization

### Ngjyrat
Në `frontend/src/index.css` mund të ndryshoni:
```css
--school-blue: #1976D2;
--school-yellow: #FFC107;
```

### Fonti
Aktualisht përdoret **Montserrat**. Për ta ndryshuar, editoni `frontend/src/index.css`

## 📞 Support

Për çështje teknike ose pyetje:
- Email: shfmurexhepelmazi@hotmail.com

## 📄 License

© 2026 Sh.F.M.U. "Rexhep Elmazi" - Të gjitha të drejtat e rezervuara.
