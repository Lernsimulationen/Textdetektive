# KI – Mensch – Verantwortung

Eine modulare, datenschutzfreundliche Offline-Lernplattform für längere
Unterrichtsreihen. Der erste Beispielkurs begleitet Lernende als Mitglieder
einer KI-Ethik-Kommission durch 20 konfigurierbare Missionen.

## Erster Meilenstein

- responsive Missionszentrale für die aktuelle Safari-Version auf iPadOS
- PWA mit lokalem Service Worker und statischem Offline-Kern
- 20 konfigurierbare Kapitel mit drei Fachperspektiven
- Level, XP, Ränge, Badges und Freischaltungen
- lokale Avatarakte ohne Klarnamen
- bewusster Import und Export einer Projektdatei
- grafische Kurswerkstatt und Kursdatei-Export
- lokaler Buzzer und anonyme Abstimmung
- strikt optionaler Supabase-Adapter

Es werden keine Konten, Cookies, Analytics, externen Schriftarten oder
automatischen Cloudspeicher verwendet. Projektstände werden nicht in
LocalStorage oder IndexedDB geschrieben.

## Entwicklung

Voraussetzung ist Node.js 22 oder neuer.

```bash
pnpm install
pnpm dev
pnpm build
```

Die Anwendung basiert auf React, TypeScript, Vinext/Vite und lokal kompiliertem
Tailwind CSS. Für GitHub Pages setzt `next.config.ts` bei einem GitHub-Actions-
Build automatisch Repositoryname, `basePath`, `assetPrefix` und statischen
Export.

## Konfiguration

Der ausgelieferte Beispielkurs liegt in `app/data/course.ts`. Im laufenden
Prototyp kann er ohne Programmierkenntnisse in der **Kurswerkstatt** bearbeitet
und als `.mission-course.json` exportiert werden.

Eine Projektdatei endet auf `.mission-project.json`. Sie enthält den
Projektzustand und einen Schnappschuss der zugehörigen Kurskonfiguration.

## Dokumentation

- `docs/01-anforderungsanalyse.md`
- `docs/02-architektur.md`
- `docs/03-datenschutzkonzept.md`
- `docs/04-ui-ux-konzept.md`
- `docs/05-live-modul.md`

## Supabase-Zusatzmodul

Der Offline-Kern importiert den Adapter erst nach einer bewussten Aktivierung.
Für einen realen Einsatz sind Row-Level Security, kurze Raumlaufzeiten, eine
schulische Datenschutzprüfung und eine eigene anonyme Aggregationsansicht
erforderlich. Ein `service_role`-Schlüssel darf nie im Browser verwendet
werden.
