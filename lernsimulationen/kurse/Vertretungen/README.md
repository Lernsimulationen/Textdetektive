# 🔔 Classroom Buzzer

Eine moderne, extrem schnelle und 100% datenschutzfreundliche (DSGVO) Progressive Web App (PWA) für den Unterrichtseinsatz auf iPads, Android-Geräten, Windows, macOS, Chromebooks und Smartboards.

![Classroom Buzzer Header](assets/icon.svg)

---

## 🌟 Hauptmerkmale

- ⚡ **Extrem Schnell & Intuitive Bedienung**: Ohne Erklärungen sofort im Unterricht einsetzbar.
- 🔒 **100% Datenschutz & DSGVO-Konform**: Keine Cookies, kein Tracking, keine Analytics, keine externen Server oder CDNs.
- 📱 **Vollständige PWA & Offline-Fähig**: Direkt als App installierbar, läuft auch ohne Internetverbindung in iPad-Klassen.
- 🎨 **Farbenblindfreundliches Design**: Hohe Kontraste, zugängliche Okabe-Ito / IBM Farbpaletten, dunkler & heller Modus.
- 🌐 **GitHub Pages Ready**: Läuft direkt ohne Backend auf GitHub Pages (rein clientseitiger Build).
- 🧩 **Supabase-Vorbereitung**: Saubere Kapselung der Datenzugriffe über die `DataService`-API-Schicht.

---

## 🎮 4 Unterrichtsmodi

1. **Buzzer-Modus**: Wer als erstes drückt, gewinnt. Zeigt den 1. Platz mit Name, Farbe und Millisekunden-Zeitstempel.
2. **Richtig / Falsch**: Schüler wählen 🟢 Richtig oder 🔴 Falsch. Auswertung erfolgt live in Echtzeit.
3. **Umfrage-Modus**: Mehrere Antwortmöglichkeiten (A, B, C, D oder Ja, Nein, Enthaltung) mit dynamischem Balkendiagramm.
4. **Schnelligkeits-Modus**: Erfasst die exakte Reihenfolge aller abgegebenen Antworten ohne Wertung.

---

## 👥 Einzel- vs. Gruppenmodus

- **Einzelmodus**: Schüler geben genau drei Zeichen ein (z. B. `ABC`, `MS`, `JK`).
- **Gruppenmodus**: Über 100 kreative deutsche Gruppennamen (z. B. *Tiger, Orcas, Kometen, Quanten, Roboter, Vulkane, Phönix, Saturn, Pinguine, Wölfe...*) inklusive Zufallsgenerator.

---

## 🛠️ Lehrerfunktionen & Shortcuts

- **Countdown-Timer**: Automatische 3..2..1-Vorbereitung vor jeder Runde.
- **Punkteverwaltung**: Punkte per Klick auf `+` / `-` vergeben und Highscore/Bestenliste anzeigen.
- **CSV-Export**: Ergebnisse der Runde als `.csv` herunterladen.
- **Tastatur-Steuerung**:
  - `Leertaste (Space)`: Buzzer sperren / freigeben
  - `C`: Countdown starten
  - `R`: Neue Runde starten
  - `F`: Vollbildmodus umschalten

---

## 📦 Schnellstart (Lokale Entwicklung)

```bash
# 1. Repository klonen & Abhängigkeiten installieren
npm install

# 2. Entwicklungs-Server starten
npm run dev

# 3. Produktions-Build erstellen
npm run build
```

---

## 📚 Dokumentation & Leitfäden

- [Installation & Setup](INSTALLATION.md)
- [GitHub Pages Deployment Guide](GITHUB_PAGES.md)
- [Projektstruktur & Architektur](PROJECT_STRUCTURE.md)
- [Anleitung für spätere Supabase-Anbindung](SUPABASE_INTEGRATION.md)
- [Datenschutz- & DSGVO-Konzept](PRIVACY_GDPR.md)
- [Erweiterungsmöglichkeiten](EXTENSIONS.md)
