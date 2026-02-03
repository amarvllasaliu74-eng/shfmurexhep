# ✅ GitHub Hosting Checklist

Printoje këtë dhe shëno çdo hap kur e kompleton!

---

## 📋 PRE-DEPLOYMENT

- [ ] Kam llogari në GitHub (github.com)
- [ ] Kam llogari në Render (render.com)  
- [ ] Kam llogari në MongoDB Atlas (mongodb.com/cloud/atlas)
- [ ] Kam Git të instaluar në kompjuter
- [ ] Kam Node.js dhe yarn të instaluar

---

## 🗂️ GITHUB SETUP

- [ ] Repository krijuar në GitHub (`shkolla-rexhep-elmazi`)
- [ ] Repository është **Public**
- [ ] Code pushed në GitHub (`git push`)
- [ ] Mund ta shoh code në GitHub web interface

**GitHub URL**: `https://github.com/YOUR-USERNAME/shkolla-rexhep-elmazi`

---

## 🗄️ MONGODB SETUP

- [ ] MongoDB Atlas account created
- [ ] Cluster created (FREE M0)
- [ ] Database user created (username: `schooladmin`)
- [ ] Password ruajtur në vend të sigurt: `________________`
- [ ] Network Access configured (0.0.0.0/0)
- [ ] Connection string copied dhe tested

**Connection String**: 
```
mongodb+srv://schooladmin:PASSWORD@school-cluster.xxxxx.mongodb.net/...
```

---

## 🖥️ BACKEND DEPLOYMENT (Render)

- [ ] Render account created me GitHub
- [ ] Web Service created
- [ ] Repository connected (`shkolla-rexhep-elmazi`)
- [ ] Service configured:
  - [ ] Name: `shkolla-backend`
  - [ ] Root Directory: `backend`
  - [ ] Runtime: Python 3
  - [ ] Build Command: `pip install -r requirements.txt`
  - [ ] Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
  - [ ] Instance Type: Free
- [ ] Environment Variables added:
  - [ ] `MONGO_URL` = (MongoDB connection string)
  - [ ] `DB_NAME` = `school_website`
  - [ ] `CORS_ORIGINS` = `*`
- [ ] Service deployed successfully
- [ ] Backend URL working

**Backend URL**: `https://shkolla-backend.onrender.com`

Test: Hapni në browser - duhet të shfaqet `{"detail":"Not Found"}` (normal!)

---

## 🌐 FRONTEND DEPLOYMENT (GitHub Pages)

- [ ] `frontend/.env` updated:
  ```
  REACT_APP_BACKEND_URL=https://shkolla-backend.onrender.com
  ```
- [ ] `gh-pages` installed: `yarn add -D gh-pages`
- [ ] `package.json` updated:
  - [ ] `homepage` added
  - [ ] `predeploy` script added
  - [ ] `deploy` script added
- [ ] Frontend built: `yarn build`
- [ ] Deployed: `yarn deploy`
- [ ] GitHub Pages enabled në repository settings
- [ ] Source set to `gh-pages` branch
- [ ] Website accessible

**Website URL**: `https://YOUR-USERNAME.github.io/shkolla-rexhep-elmazi`

---

## 👤 ADMIN SETUP

- [ ] Admin account created via curl ose browser
- [ ] Login tested: `username: admin`, `password: admin123`
- [ ] Admin dashboard accessible
- [ ] Can upload content (test 1 slide)

**Admin URL**: `https://YOUR-USERNAME.github.io/shkolla-rexhep-elmazi/admin/login`

---

## ✅ FINAL TESTING

- [ ] Homepage loads correctly
- [ ] Hero slideshow working
- [ ] News ticker scrolling
- [ ] Navigation works (të gjitha faqet)
- [ ] Student of Month page loads
- [ ] Activities page loads
- [ ] Contact page shows Google Maps
- [ ] Admin dashboard fully functional
- [ ] Can add/edit/delete content
- [ ] Live TV page working (`/live`)

---

## 📝 DOCUMENTATION

- [ ] Backend URL saved somewhere safe
- [ ] MongoDB connection string saved
- [ ] Admin credentials saved
- [ ] GitHub repository URL saved

---

## 🎉 DEPLOYMENT COMPLETE!

**My Website URLs:**

- **Public**: `________________________________________`
- **Admin**: `________________________________________`
- **Live TV**: `________________________________________`

**Date Deployed**: `_______________`

**Notes**:
```




```

---

## 🔄 FOR FUTURE UPDATES

Kur doni të update website:

**Backend changes:**
```bash
git add .
git commit -m "Update backend"
git push
# Render auto-deploys!
```

**Frontend changes:**
```bash
cd frontend
yarn build
yarn deploy
# GitHub Pages auto-updates!
```

---

**Save this checklist!** 💾
