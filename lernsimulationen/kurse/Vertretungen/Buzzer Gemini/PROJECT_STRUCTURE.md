# 🏗️ Projektstruktur & Architektur

Classroom Buzzer baut auf einem hochmodularen, skalierbaren TypeScript-Muster auf.

```
.
├── index.html                  # Haupteinstiegspunkt & Meta-Tags
├── manifest.webmanifest        # PWA Web Manifest für Installation
├── sw.js                       # Service Worker für 100% Offline-Betrieb
├── package.json                # npm Abhängigkeiten & Skripte
├── tsconfig.json               # TypeScript Konfiguration
├── vite.config.ts              # Vite Bundler & GitHub Pages Pfad-Config
│
├── assets/                     # Lokale Grafiken & App-Icons
│   └── icon.svg
│
├── src/
│   ├── main.ts                 # Hauptprogramm, SW-Registrierung & Router
│   │
│   ├── types/
│   │   └── index.ts            # Sämtliche Interfaces (SessionState, Participant, IDataService)
│   │
│   ├── services/
│   │   ├── DataService.ts          # Datenkapselung (LocalDataService via BroadcastChannel)
│   │   ├── SoundService.ts         # Audio-Synthesizer via Web Audio API
│   │   ├── ConfettiService.ts      # HTML5 Canvas Konfetti-Engine
│   │   ├── GroupNameGenerator.ts   # 100+ kreative Gruppennamen & Barrierefreie Farben
│   │   └── QRCodeService.ts        # Clientseitige Offline-QR-Code-Erzeugung
│   │
│   ├── components/
│   │   ├── TeacherDashboard.ts     # Lehrer-Oberfläche & Tastatursteuerung
│   │   ├── StudentView.ts          # Minimalistische Schüler-Ansicht & Riesen-Buzzer
│   │   ├── SmartboardDisplay.ts    # Smartboard-Visualisierungen & Animationen
│   │   └── SettingsModal.ts        # Einstellungen & Parameter-Dialog
│   │
│   └── styles/
│       ├── main.css                # CSS Variables & Globales Design-System
│       ├── teacher.css             # Styles für Lehrer-Dashboard & Smartboard
│       ├── student.css             # Responsive Styles für Schüler-Buzzer
│       └── components.css          # Styles für Modals, Charts & Controls
│
├── README.md
├── INSTALLATION.md
├── GITHUB_PAGES.md
├── SUPABASE_INTEGRATION.md
├── PRIVACY_GDPR.md
└── EXTENSIONS.md
```
