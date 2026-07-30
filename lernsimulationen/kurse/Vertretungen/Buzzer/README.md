# Classroom Buzzer

Eine datensparsame, installierbare PWA für schnelle Unterrichts-Buzzer, Abstimmungen und Reihenfolgen. Sie benötigt keine Cookies, keine Tracker und keine externen Assets.

## Start

```bash
npm install
npm run dev
npm run build
```

Das Build-Verzeichnis `dist/` kann in GitHub Pages veröffentlicht werden. In den Repository-Einstellungen unter **Pages** GitHub Actions oder den Ordner `dist` der gewählten Deployment-Pipeline auswählen. Durch `base: './'` funktionieren die Assets auch unter einem Projektpfad.

## Struktur

- `src/main.ts` – Lehrer- und Schüleroberfläche
- `src/data-service.ts` – einzige Datenzugriffsschicht
- `src/types.ts` – Datenmodell
- `public/sw.js` / `manifest.webmanifest` – PWA-Grundlage

## Datenschutz und Grenzen der lokalen Version

Die App speichert ausschließlich die aktuelle Sitzung lokal im Browser (`localStorage`); es gibt weder Cookies noch Telemetrie oder Netzwerkaufrufe. Deshalb kann GitHub Pages allein keine Sitzung zwischen unterschiedlichen Geräten synchronisieren: Browser-Speicher ist absichtlich nicht geteilt. Für eine ganze Klasse muss später nur `LocalDataService` durch eine Supabase-Implementierung des `DataService`-Interfaces ersetzt werden (Realtime-Channel für Zustandsänderungen, Tabellen `sessions`, `participants`, `responses`). Die UI bleibt unverändert.

## Nächste sinnvolle Erweiterungen

Supabase Realtime, mehrere Runden/Punkte, CSV-Export und konfigurierbare Sounddateien können ohne Änderung der Komponenten ergänzt werden. Die sichtbare Code-Kachel ist in dieser reinen lokalen Vorabversion absichtlich kein scanbarer QR-Code: Ein scanbarer QR-Code ist erst sinnvoll, wenn die durch ihn aufgerufene Schüleransicht die Lehrersitzung geräteübergreifend erreichen kann.

## Supabase einrichten

1. Den Inhalt von `supabase/schema.sql` im SQL Editor des eigenen Projekts ausführen.
2. In **Database → Replication** die drei Tabellen für `supabase_realtime` aktivieren (das SQL erledigt dies ebenfalls).
3. `npm.cmd install` ausführen. Die lokalen Zugangsdaten liegen in `.env.local` und werden nicht committet. Für GitHub Pages müssen die beiden `VITE_`-Variablen beim Build als Secrets hinterlegt werden.
4. `src/supabase-service.ts` enthält die Realtime-Implementierung. Die aktuelle UI verwendet weiterhin absichtlich `LocalDataService`; der letzte, größere Schritt ist die Umstellung der UI auf die asynchronen Service-Aufrufe. Dadurch bleibt die lokale Demo weiterhin ohne Netzverbindung nutzbar.
