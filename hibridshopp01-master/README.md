# 🐕 Hibrid Shopp - Kutyatenyésztő Weboldal

## 📋 Projekt leírás

A Hibrid Shopp professzionális kutyatenyésztő weboldala, amely különleges hibrid fajtákat kínál: Maltipoo, Cavapoo és Goldendoodle kiskutyákat. Az oldal modern, reszponzív dizájnnal rendelkezik és teljes funkcionalitást biztosít a látogatóknak.

## ✨ Főbb funkciók

- **Kiskutyák böngészése**: Részletes információk és képek a rendelkezésre álló kiskutyákról
- **Online foglalási rendszer**: Időpontfoglalás a kiskutyák megtekintésére
- **Kontakt információk**: Közvetlen kapcsolatfelvétel telefonon, emailen vagy WhatsApp-on
- **Reszponzív dizájn**: Mobilbarát felület minden eszközön
- **Modern UI/UX**: Tailwind CSS és shadcn/ui komponensekkel

## 🛠️ Technológiai stack

### Frontend
- **React 19** - Modern JavaScript könyvtár
- **Vite** - Gyors build tool
- **Tailwind CSS** - Utility-first CSS keretrendszer
- **shadcn/ui** - Reusable UI komponensek
- **Lucide React** - Ikon könyvtár
- **Framer Motion** - Animációk

### Backend
- **FastAPI** - Modern Python web framework
- **SQLite** - Adatbázis
- **Pydantic** - Adatvalidáció

## 📁 Könyvtárstruktúra

```
hibrid-shopp-website/
├── dog-website/                 # React frontend
│   ├── src/
│   │   ├── components/          # UI komponensek
│   │   ├── assets/             # Képek és statikus fájlok
│   │   ├── App.jsx             # Fő alkalmazás komponens
│   │   └── main.jsx            # Alkalmazás belépési pont
│   ├── public/                 # Publikus fájlok
│   ├── package.json            # Frontend függőségek
│   └── vite.config.js          # Vite konfiguráció
├── booking-backend/            # FastAPI backend
│   ├── src/
│   │   ├── main.py             # API belépési pont
│   │   ├── models/             # Adatbázis modellek
│   │   └── routes/             # API útvonalak
│   └── requirements.txt        # Python függőségek
├── .github/workflows/          # GitHub Actions
├── netlify.toml               # Netlify konfiguráció
└── README.md                  # Projekt dokumentáció
```

## 🚀 Telepítés és futtatás

### Frontend (React)

```bash
cd dog-website
npm install
npm run dev
```

A frontend elérhető lesz: http://localhost:5173

### Online elérhetőség

Az oldal online elérhető: **https://hibridshopp.netlify.app/**

### Backend (FastAPI)

```bash
cd booking-backend
pip install -r requirements.txt
python src/main.py
```

## 🔧 Részletes funkció leírás

### 1. Főoldal (Home)
- Üdvözlő szekció a cég bemutatásával
- Kiemelt kiskutyák megjelenítése
- Gyors navigáció a különböző szekciókhoz

### 2. Fajták (Breeds)
- Részletes információk a Maltipoo, Cavapoo és Goldendoodle fajtákról
- Fajta-specifikus jellemzők és előnyök
- Képek és leírások

### 3. Elérhető kiskutyák (Available)
- Aktuális kiskutyák listája
- Részletes információk minden kiskutyáról
- Árak és elérhetőség
- Foglalási lehetőség

### 4. Galéria (Gallery)
- Képek a kiskutyákról
- A tenyésztő környezetről
- Szülő kutyákról

### 5. Kapcsolat (Contact)
- Telefon: 06 70 217 885 (WhatsApp és Viber)
- Email: shoppdogg583@gmail.com
- Instagram: @hibridshopp
- Nyitvatartás: Hétfő-Péntek 8:00-22:00

### 6. Foglalási rendszer
- Online időpontfoglalás
- Kiskutya-specifikus foglalás
- Email értesítések
- Admin felület a foglalások kezeléséhez

## 🎨 Dizájn jellemzők

- **Modern és tiszta**: Minimalista dizájn a kiskutyák kiemelésére
- **Reszponzív**: Mobilbarát felület minden eszközön
- **Gyors betöltés**: Optimalizált képek és kód
- **Akadálymentes**: WCAG irányelvek betartása
- **Felhasználóbarát**: Intuitív navigáció és használat

## 📱 Mobil optimalizáció

- Touch-friendly gombok és linkek
- Reszponzív képek és layout
- Gyors betöltés mobilhálózatokon
- PWA támogatás

## 🔒 Biztonság

- HTTPS kényszerítés
- XSS védelem
- CSRF tokenek
- Input validáció
- Biztonságos API végpontok

## 📊 Teljesítmény

- Képek optimalizálása
- Code splitting
- Lazy loading
- CDN használata
- Gzip tömörítés

## 🌐 Deployment

### Netlify
- Automatikus deployment GitHub-ról
- Custom domain: hibridshopp.netlify.app
- SSL tanúsítvány
- CDN elosztás

### GitHub Pages
- Alternatív deployment opció
- Automatikus build és deploy
- Branch-based deployment

## 📞 Kapcsolat

- **Telefon**: 06 70 217 885
- **WhatsApp**: https://wa.me/3670217885
- **Email**: shoppdogg583@gmail.com
- **Instagram**: @hibridshopp
- **Nyitvatartás**: Hétfő-Péntek 8:00-22:00

## 📄 Licenc

Ez a projekt privát használatra készült a Hibrid Shopp számára.

---

**Hibrid Shopp** - Professzionális kutyatenyésztés szeretettel és gondossággal 🐕❤️ 