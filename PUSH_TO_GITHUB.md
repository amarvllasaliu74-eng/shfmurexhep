# 🚀 SI TË PUSH KODIN NË GITHUB

Kodi juaj është gati! Tani duhet ta push në GitHub.

---

## HAPI 1: Download Code (Nëse jeni në Emergent)

Nëse po e përdorni këtë në Emergent platform, download të gjithë kodin:

1. Klikoni "Download" ose eksportoni projektin
2. Extract ZIP file në kompjuterin tuaj
3. Hapni Terminal/CMD në folder të projektit

---

## HAPI 2: Push në GitHub

Në Terminal/CMD (në folder `/app` ose ku e keni projektin):

```bash
# Shko në folder
cd /path/to/app

# Inicializo Git (nëse nuk është)
git init

# Shto të gjitha files
git add .

# Commit
git commit -m "Initial commit - School website"

# Shto GitHub remote
git remote add origin https://github.com/amarvllasaliu74-eng/shfmurexhep.git

# Push
git branch -M main
git push -u origin main
```

**Nëse kërkon username/password:**
- Username: `amarvllasaliu74-eng`
- Password: Përdorni **Personal Access Token** (jo password normal)

**Si të krijoni Personal Access Token:**
1. Shkoni në GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Klikoni "Generate new token"
3. Zgjidhni "repo" scope
4. Kopjoni token dhe përdoreni si password

---

## HAPI 3: Verify Code në GitHub

1. Shkoni në: https://github.com/amarvllasaliu74-eng/shfmurexhep
2. Duhet të shihni të gjithë kodin
3. Check që këto files ekzistojnë:
   - ✅ `backend/server.py`
   - ✅ `frontend/package.json`
   - ✅ `README.md`
   - ✅ `GITHUB_DEPLOYMENT_GUIDE_SHQIP.md`

---

## HAPI 4: Deploy Backend (Render.com)

Ndiqni: `GITHUB_DEPLOYMENT_GUIDE_SHQIP.md` → Hapi 4

Shkurt:
1. Shkoni në https://render.com
2. Sign up me GitHub
3. New → Web Service
4. Zgjidhni `shfmurexhep` repository
5. Configure:
   - Root Directory: `backend`
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn server:app --host 0.0.0.0 --port $PORT`
6. Add Environment Variables (shih guide)
7. Deploy!

Kopjoni Backend URL: `https://your-app.onrender.com`

---

## HAPI 5: Deploy Frontend (GitHub Pages)

```bash
cd /path/to/app/frontend

# Update .env
echo "REACT_APP_BACKEND_URL=https://your-backend.onrender.com" > .env
echo "WDS_SOCKET_HOST=0.0.0.0" >> .env
echo "WDS_SOCKET_PORT=443" >> .env

# Install gh-pages (nëse nuk është)
yarn add -D gh-pages

# Deploy
yarn deploy
```

Pas 2-3 minutave, shkoni në:
- GitHub repository → Settings → Pages
- Source: `gh-pages` branch
- Save

Website live në: **https://amarvllasaliu74-eng.github.io/shfmurexhep**

---

## ✅ GATI!

**Your URLs:**
- 🌐 Website: https://amarvllasaliu74-eng.github.io/shfmurexhep
- 👤 Admin: https://amarvllasaliu74-eng.github.io/shfmurexhep/admin/login
- 📺 Live TV: https://amarvllasaliu74-eng.github.io/shfmurexhep/live

---

## 🆘 Ndihmë

Për udhëzime të detajuara, lexoni:
- `GITHUB_DEPLOYMENT_GUIDE_SHQIP.md` - Guide i plotë
- `DEPLOYMENT_CHECKLIST.md` - Checklist
- `QUICK_COMMANDS.md` - Komanda të shkurtra

---

## 📞 Support

Email: shfmurexhepelmazi@hotmail.com

**Good luck! 🚀**
