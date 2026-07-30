# 🚀 Installationsanleitung - Classroom Buzzer

Diese Anleitung erklärt Schritt für Schritt, wie Classroom Buzzer lokal aufgesetzt, gebaut und auf Geräten installiert wird.

---

## 📋 Systemvoraussetzungen

- **Node.js**: v18.0.0 oder höher
- **NPM**: v9.0.0 oder höher
- **Browser**: Jeder moderne Browser (Safari auf iPad/iOS, Chrome/Firefox auf Android, Edge/Chrome auf Windows, macOS, Chromebooks).

---

## 🛠️ Lokale Installation & Ausführung

### 1. Abhängigkeiten installieren
```bash
npm install
```

### 2. Entwicklungs-Server starten
```bash
npm run dev
```
Der Server startet auf `http://localhost:5173`. Du kannst diesen Link im Browser öffnen oder mit dem Smartphone/iPad im selben WLAN-Netzwerk aufrufen.

### 3. Vorschau der Produktionsversion
```bash
npm run build
npm run preview
```

---

## 📱 PWA Installation auf Endgeräten

Classroom Buzzer ist als Vollblut-PWA (Progressive Web App) konzipiert.

### iPad / iPhone (Safari)
1. Öffne die Seite in Safari.
2. Tippe auf das **Teilen-Symbol** (Quadrat mit Pfeil nach oben).
3. Wähle **"Zum Home-Bildschirm"** (`Add to Home Screen`).
4. Die App erscheint als eigenständiges Icon auf dem iPad.

### Android (Chrome / Edge)
1. Öffne die Seite in Chrome.
2. Tippe auf die 3 Punkte oben rechts.
3. Wähle **"App installieren"** oder **"Zum Startbildschirm hinzufügen"**.

### Chromebook / macOS / Windows (Chrome / Edge)
1. In der Adresszeile oben rechts erscheint ein kleines App-Installationssymbol.
2. Klicke auf **"Installieren"**.
