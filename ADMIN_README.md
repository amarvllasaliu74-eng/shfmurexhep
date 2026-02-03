# Sh.F.M.U. "Rexhep Elmazi" - School Website

## Admin Credentials

**Admin Panel URL:** https://gjilan-shkolla.preview.emergentagent.com/admin/login

**Default Admin Account:**
- Username: `admin`
- Password: `admin123`

**IMPORTANT:** Please change this password after first login by creating a new admin user through the setup endpoint.

## Quick Links

- **Public Website:** https://gjilan-shkolla.preview.emergentagent.com/
- **Admin Dashboard:** https://gjilan-shkolla.preview.emergentagent.com/admin/dashboard
- **Live TV Dashboard:** https://gjilan-shkolla.preview.emergentagent.com/live

## Features

1. **Public Pages (All in Albanian):**
   - Ballina (Home) - with Hero Slideshow
   - Nxënësi i Muajit (Student of the Month)
   - Nxënësit më të Mirë (Top Students by Subject)
   - Aktivitetet (School Activities)
   - Turniret (Tournaments)
   - Rreth Shkollës (About School)
   - Kontakt (Contact)

2. **Hero Slideshow (NEW!):**
   - Automatic slideshow on home page
   - Shows school events, news, and announcements
   - Auto-rotates every 5 seconds
   - Fully manageable from admin dashboard
   - Currently showing 4 slides with school photos

3. **Admin Dashboard:**
   - **Hero Slideshow Tab** - Add/edit/delete slides for home page
   - Full CRUD for all content types
   - Image upload functionality
   - Easy monthly content updates

4. **Live TV Dashboard:**
   - Auto-rotating content (8-10 seconds)
   - Live date & time
   - Scrolling announcements
   - Student of the Month display
   - Latest activities
   - Tournament results
   - Auto-refreshes every 30 seconds

## Design Improvements

- **Font:** Montserrat Semi-Bold - professional and modern
- **Colors:** Blue (#1976D2) and Yellow (#FFC107) from school logo
- **Hero Section:** Clean with just school name and location
- **Event Photos:** Integrated in Hero Slideshow with special prominence

## How to Update Content

1. Login to Admin Dashboard
2. Select the tab you want to update:
   - **Hero Slideshow** - Manage home page slides
   - **Student of Month** - Update monthly featured student
   - **Top Students** - Add achievements by subject
   - **Activities** - Post school activities
   - **Tournaments** - Share sports results
   - **Announcements** - Add Live TV messages
3. Fill in the form and click "Add"
4. Changes appear immediately on the public website and Live TV

## Content Already Added

**Hero Slideshow:**
- "Nxënësit tanë në punë" - Teamwork photo
- "Muri i Komunikimit" - Communication skills
- "Kreativiteti në Veprim" - Creative activities
- "Sporte dhe Shëndet" - Sports activities

**Other Content:**
- Student of Month: Arlinda Krasniqi (Janar 2026)
- Top Students: Ermir Hoxha (Matematikë), Blerta Berisha (Gjuhë Shqipe)
- Activities: Ditë e Librit, Ekskursion në Prishtinë
- Tournament: Turnir i Basketbollit
- Announcement: "Mirësevini në shkollën tonë..."

## Technical Details

- Frontend: React with Tailwind CSS (Montserrat font)
- Backend: FastAPI (Python)
- Database: MongoDB
- Image Storage: Local server storage
- All content in Albanian language

## For Deployment/Hosting

See `HOSTING_GUIDE.md` for detailed instructions on how to:
- Deploy to Vercel, Railway, or other platforms
- Connect custom domain
- Setup on GitHub for free hosting
- Estimated costs and recommendations (as requested)
