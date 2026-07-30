# Anforderungsanalyse

## Zielbild

Die Plattform ist eine universell konfigurierbare, browserbasierte Lernumgebung
für längere Unterrichtsreihen. Der Beispielkurs „KI – Mensch –
Verantwortung“ wird als erste Kurskonfiguration ausgeliefert. Lernende bewegen
sich durch eine zusammenhängende, seriös inszenierte Geschichte als Mitglieder
einer KI-Ethik-Kommission.

## Verbindliche Anforderungen des ersten Meilensteins

- klickbarer, deutschsprachiger Prototyp mit Dashboard, Missionskarte,
  20 Kapiteln, Avatarwahl, Fortschritt und Gamification
- React, TypeScript, Vite/Vinext und lokal kompiliertes Tailwind CSS
- responsiv und touchfreundlich für die aktuelle Safari-Version auf iPadOS
- PWA und Offline-First; nach dem ersten Abruf funktioniert der Kern ohne Netz
- keine Konten, Cookies, Analysewerkzeuge oder Hintergrundübertragungen
- Projektstand ausschließlich im Arbeitsspeicher und in einer bewusst
  exportierten Projektdatei; keine automatische Browserpersistenz
- Import und Export einer versionierten, menschenlesbaren JSON-Projektdatei
- grafischer Kurseditor; JSON bleibt das interne und portable Kursformat
- konfigurierbare Perspektiven, Kapitel, Story, Belohnungen und Freischaltungen
- lokaler Buzzer und anonyme Abstimmung
- strikt deaktiviertes Online-Zusatzmodul mit Supabase-Adapter

## Qualitätsanforderungen

- klare Trennung von Kursdaten, Projektzustand, Integrationen und Darstellung
- Bedienflächen mindestens 44 × 44 CSS-Pixel
- Tastaturbedienung, sichtbarer Fokus und sinnvolle ARIA-Beschriftungen
- Typewriter-Texte müssen beschleunigt und übersprungen werden können
- `prefers-reduced-motion` wird respektiert
- externe Links werden als bewusster Wechsel aus dem Offline-Raum gekennzeichnet
- importierte Dateien werden vor der Verwendung strukturell validiert

## Fachliche Leitplanken

Die Perspektive Evangelische Religionslehre wird gelb, die Perspektive
Sozialwissenschaften rot und gemeinsame Arbeit neutral/türkis dargestellt.
Diese Farben sind Bedeutungsunterstützung und werden immer zusätzlich durch
Text und Symbole erklärt.

## Nicht Bestandteil des ersten Meilensteins

- personenbezogene Lernkonten, Lehrkraftkonten oder Cloudspeicherung
- direkte Teams- oder OneNote-Integration
- fachlich ausgearbeitete Unterrichtsinhalte
- automatische Synchronisierung zwischen Geräten
- verpflichtende Supabase-Verbindung

## Abnahmekriterien

Ein neuer Projektstand kann angelegt, als Datei gesichert und wieder importiert
werden. Kapitel lassen sich öffnen und abschließen; Fortschritt,
Freischaltungen, XP und Badges reagieren nachvollziehbar. Die Kursstruktur ist
im Editor änderbar und exportierbar. Ohne Aktivierung des Zusatzmoduls entsteht
kein Netzwerkverkehr durch Anwendungscode.
