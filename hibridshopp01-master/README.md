# 🐕 Hibrid Shopp - Prémium Kutyatenyésztés

Modern, professzionális weboldal hibrid kutyafajták tenyésztéséhez, teljes admin panellel és responsive design-nal.

## ✨ Funkciók

### 🌐 Weboldal
- **Modern React + Vite** - Gyors és optimalizált
- **Responsive Design** - Mobil és desktop kompatibilis
- **SEO Optimalizált** - Meta tag-ek, sitemap, robots.txt
- **PWA Támogatás** - Progressive Web App funkciók
- **Animációk** - Framer Motion animációk
- **UI Komponensek** - shadcn/ui komponens könyvtár

### 🔧 Admin Panel
- **Teljes tartalom kezelés** - Szövegek, képek, menük
- **Galéria kezelés** - Képek feltöltése, törlése, kategóriák
- **Slideshow kezelés** - Külön slideshow admin szekció
- **Kiskutyák kezelése** - Elérhető kutyák hozzáadása
- **Foglalások kezelése** - Időpontok módosítása, törlése
- **Kapcsolat kezelés** - Telefon, email, Instagram
- **Menü kezelés** - Új menüpontok hozzáadása

### 🚀 Deployment
- **Netlify Ready** - Teljes Netlify konfiguráció
- **CDN Optimalizáció** - Cache headers, gzip tömörítés
- **Security Headers** - Biztonsági fejlécek
- **Performance** - Code splitting, lazy loading

## 🛠️ Technológiai Stack

### Frontend
- **React 19** - Modern React hooks és features
- **Vite** - Gyors build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animációk
- **React Router** - Routing
- **shadcn/ui** - UI komponensek

### Backend
- **FastAPI** - Python web framework
- **SQLite** - Adatbázis
- **Pydantic** - Adat validáció

### Deployment
- **Netlify** - Frontend hosting
- **Vercel/Railway** - Backend hosting

## 📦 Telepítés

### Előfeltételek
- Node.js 18+
- npm 9+
- Python 3.8+

### Frontend
```bash
cd dog-website
npm install
npm run dev
```

### Backend
```bash
cd booking-backend
pip install -r requirements.txt
python src/main.py
```

## 🔐 Admin Bejelentkezés

**URL:** `/admin/login`  
**Felhasználónév:** `admin`  
**Jelszó:** `hibridshoppadmin2025`

## 🚀 Deployment

### Netlify
1. Connect GitHub repository
2. Build settings:
   - **Base directory:** `dog-website`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Deploy!

### Environment Variables
```env
VITE_API_URL=https://your-backend-api.com
VITE_SITE_URL=https://your-domain.netlify.app
```

## 📁 Projekt Struktúra

```
hibridshopp02/
├── dog-website/              # React frontend
│   ├── src/
│   │   ├── components/       # React komponensek
│   │   ├── contexts/         # React context-ek
│   │   ├── assets/          # Képek, ikonok
│   │   └── main.jsx         # Entry point
│   ├── public/              # Statikus fájlok
│   ├── package.json         # Dependencies
│   └── vite.config.js       # Vite konfiguráció
├── booking-backend/          # FastAPI backend
│   ├── src/
│   │   ├── models/          # Adatbázis modellek
│   │   ├── routes/          # API routes
│   │   └── main.py          # FastAPI app
│   └── requirements.txt     # Python dependencies
├── netlify.toml             # Netlify konfiguráció
└── README.md               # Dokumentáció
```

## 🎨 Design System

### Színek
- **Primary:** `#f59e0b` (Amber)
- **Secondary:** `#ea580c` (Orange)
- **Background:** `#fef3c7` (Amber 50)
- **Text:** `#1f2937` (Gray 800)

### Tipográfia
- **Heading:** Inter, Bold
- **Body:** Inter, Regular
- **Code:** JetBrains Mono

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🔧 Fejlesztői Parancsok

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Lint
npm run lint

# Fix lint issues
npm run lint:fix
```

## 📊 Performance

- **Lighthouse Score:** 95+
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1

## 🔒 Biztonság

- **Security Headers** - XSS protection, CSRF protection
- **Content Security Policy** - Resource restrictions
- **HTTPS Only** - Secure connections
- **Admin Authentication** - Secure admin panel

## 📈 SEO

- **Meta Tags** - Complete meta tag set
- **Structured Data** - Schema.org markup
- **Sitemap** - XML sitemap
- **Robots.txt** - Search engine directives
- **Open Graph** - Social media sharing

## 🤝 Hozzájárulás

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 Licenc

MIT License - see LICENSE file for details

## 📞 Kapcsolat

- **Telefon:** +36 70 217 8885
- **Email:** shoppdogg583@gmail.com
- **Instagram:** @hibridshopp

---

**Hibrid Shopp** - Prémium hibrid kutyafajták szeretettel és gondossággal 🐕❤️ 