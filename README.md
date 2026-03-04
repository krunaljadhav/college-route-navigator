# 🎓 SVPM Campus Navigator

Interactive campus map for SVPM college with 26 real locations.
Built with Flask + Leaflet.js + OpenStreetMap. **100% Free, No API Keys!**

---

## 🚀 How to Run in VS Code (Windows)

### Step 1 — Open Terminal in VS Code
Press `Ctrl + `` (backtick key, below Escape)

### Step 2 — Install Flask
```
pip install Flask
```

### Step 3 — Run the App
```
python api/index.py
```

### Step 4 — Open Browser
Go to: **http://localhost:5000**

---

## 📦 Deploy to Vercel (Free)

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 📁 Project Structure

```
svpm-navigator/
├── api/
│   └── index.py          ← Flask backend
├── templates/
│   └── index.html        ← Main page
├── static/
│   ├── css/style.css     ← Styling
│   └── js/app.js         ← Map logic
├── data/
│   └── buildings.json    ← 26 SVPM locations
├── requirements.txt
└── vercel.json
```

---

## 📍 Included Locations (26 total)

- Main Gate, Main Ground, Garden Area
- Auditorium, Hostel Gate
- Rajmata Jijau / Savitribai Phule / Ahilyadevi Girls Hostels
- Girls Gym, Girls Mess, Shree Mess
- SVPM College of Pharmacy
- Diploma College of Engineering
- College of Engineering
- Electrical Engineering Department
- SVPM Commerce, Science & Computer College
- Workshop, Canteen, Xerox Center
- Basketball Court, Play Ground, Boys Hostel
- Parking Area, Management Gate, Coutegess
