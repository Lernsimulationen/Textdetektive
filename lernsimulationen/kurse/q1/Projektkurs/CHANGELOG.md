# Changelog

## 2026-08-01 – Raster-Avatare und Rollenbiografie

- Avatar-Studio auf 11 feste Raster-Avatare reduziert: fünf männliche, fünf weibliche und ein non-binärer Avatar
- Vektor-/CSS-Baukasten mit 30 Körperteilen entfernt
- KI-generiertes Avatar-Sprite unter `bilder/avatar-sprite.png` ergänzt
- auswählbare Farbskills „Mooslicht“, „Sonnenkern“, „Korallenfunke“, „Dämmerblau“ und „Papierlicht“ ergänzt
- Biografie von einem kurzen Eingabefeld auf eine beschreibbare Rollenbiografie mit 500 Zeichen erweitert
- im Studio ausdrücklich erklärt, dass die Biografie die gespielte Projektkurs-Rolle und nicht die eigene private Biografie beschreibt

## 2026-08-01 – Grafische Lerntagebuch-Version

- Startseite auf Identität, Avatar-Studio und Speicherstand-Laden ausgerichtet
- zentrale Statusleiste für Fortschritt, nächste Mission und Rang ergänzt
- Dashboard ohne Seiten- oder Hauptseiten-Scroll strukturiert
- Avatar-Studio mit auswählbaren Rollenporträts und Beispielprofil „Noa Levin“ ergänzt
- Seitenleiste vollständig entfernt und durch ein zentrales Dashboard mit Verzweigungen ersetzt
- Bereichskarten für Tutorial, Ethikkommission, Lerntagebuch, Akte und Live-Labor strukturiert
- Geschichte der Einladung, Kommissionsrolle und Ziel des eigenen Votums deutlich erweitert
- Live-Labor ausdrücklich als getrenntes Untergame mit später optionaler Online-Anbindung markiert
- zentralen Begrüßungsbildschirm mit klarer Einführung in die Mission ergänzt
- Dashboard als erster sichtbarer Arbeitsbereich eingerichtet
- Tutorial mit Ablauf, Schutzbestimmungen, Notenhinweisen und Exportregeln ergänzt
- Mission 0 „Einladung“ für Pseudonym, Lerngruppe, eigene Erwartungen und Regelbestätigung ergänzt
- Missionen aus dem ersten Bildschirm entfernt und hinter Dashboard/Ethikkommission eingeordnet
- sichtbare Modulbearbeitung aus der Navigation entfernt
- vier KI-generierte, lokal gespeicherte Bildassets ergänzt
- visuelle Missionszentrale mit Hero-Bild und Sektorenkarte ergänzt
- neue Selbstlernstrecke mit vier einzeln bearbeitbaren Modulen ergänzt
- Lerntagebuch mit freien Reflexionsnotizen und Modulspuren ergänzt
- Module als nebeneinanderliegende Lernkarten strukturiert; Bearbeitung bleibt bewusst außerhalb der sichtbaren Lernoberfläche
- Projekt-Export auf Version 2 erweitert: Kurs, Module, Fortschritt und Notizen werden gemeinsam gesichert
- Importprüfung für Projektformat, Modulfelder und lokale Bildpfade ergänzt
- README mit Lernziel, Modulstruktur und sicherem Änderungsworkflow ergänzt
- externe Abhängigkeiten, Supabase, Cloudflare, Buildsystem und Datenbank bleiben entfernt

## 2026-08-01 – Standalone-Grundversion

- React-/TypeScript-Anwendung auf eine einzelne lokale `index.html` reduziert
- Offline-Missionen, Fortschritt, Profil, lokales Voting und JSON-Export übernommen
- alte Build-, Datenbank-, PWA- und Supabase-Dateien entfernt
