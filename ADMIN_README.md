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
   - Ballina (Home)
   - Nxënësi i Muajit (Student of the Month)
   - Nxënësit më të Mirë (Top Students by Subject)
   - Aktivitetet (School Activities)
   - Turniret (Tournaments)
   - Rreth Shkollës (About School)
   - Kontakt (Contact)

2. **Admin Dashboard:**
   - Full CRUD for all content types
   - Image upload functionality
   - Easy monthly content updates

3. **Live TV Dashboard:**
   - Auto-rotating content (8-10 seconds)
   - Live date & time
   - Scrolling announcements
   - Student of the Month display
   - Latest activities
   - Tournament results
   - Auto-refreshes every 30 seconds

## How to Update Content

1. Login to Admin Dashboard
2. Select the tab you want to update
3. Fill in the form and click "Add"
4. Changes appear immediately on the public website and Live TV

## Content Already Added (Sample Data)

- Student of Month: Arlinda Krasniqi (Janar 2026)
- Top Students: Ermir Hoxha (Matematikë), Blerta Berisha (Gjuhë Shqipe)
- Activities: Ditë e Librit, Ekskursion në Prishtinë
- Tournament: Turnir i Basketbollit
- Announcement: "Mirësevini në shkollën tonë..."

## Technical Details

- Frontend: React with Tailwind CSS
- Backend: FastAPI (Python)
- Database: MongoDB
- Image Storage: Local server storage
- All content in Albanian language (as requested)
