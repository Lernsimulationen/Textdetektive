# 🛡️ Datenschutz- & DSGVO-Konzept - Classroom Buzzer

Classroom Buzzer wurde streng nach den Grundsätzen des **Privacy by Design** und **Privacy by Default** entwickelt.

---

## 🔒 Kernprinzipien des Datenschutzes

1. **Keine Speicherung personenbezogener Daten (PII)**:
   - Schüler geben lediglich 3-stellige Kürzel/Initialen (z. B. `MS`) oder wählen anonymisierte Gruppennamen (z. B. *Kometen*) anstelle von Vollnamen ein.
   - Es werden keine E-Mail-Adressen, Passwörter, IP-Adressen oder Geräte-IDs erfasst.

2. **Keine Cookies & Kein Tracking**:
   - Die Anwendung setzt keinerlei Cookies (weder First-Party noch Third-Party).
   - Es sind keine Trackingdienste (z. B. Google Analytics, Matomo, Plausible) oder Werbe-Pixel eingebunden.

3. **Keine externen Web-Ressourcen / CDNs**:
   - Alle CSS-, JavaScript- und Asset-Dateien liegen lokal im gebündelten Code.
   - Keine Google Fonts, FontAwesome CDNs oder externen JS-Bibliotheken von Drittanbietern.
   - Der QR-Code wird zu 100% offline im Browser der Lehrkraft synthetisiert (`QRCodeService`).

4. **100% Offline-Fähigkeit (PWA)**:
   - Sobald die Seite geladen wurde (oder als PWA installiert ist), funktioniert Classroom Buzzer vollständig im lokalen Netzwerk oder Offline-Modus ohne Verbindung zum Internet.

---

## ⚖️ DSGVO-Konformität im Schulunterricht

- **Keine Einverständniserklärung der Erziehungsberechtigten erforderlich**: Da keinerlei personenbezogene Daten verarbeitet oder an Dritte übertragen werden, entfällt der administrative Aufwand für Einwilligungen.
- **Auftragsverarbeitungsvertrag (AVV) unnötig**: Da die lokale GitHub Pages Version serverlos aus dem Browser läuft, findet keine Datenverarbeitung auf externen Servern statt.
