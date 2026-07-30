# Softwarearchitektur

## Architekturprinzip

Die Plattform verwendet einen statischen Offline-Kern. Alle fachlichen Inhalte
liegen in serialisierbaren Kurskonfigurationen. Die Anwendung interpretiert
diese Daten; neue Kurse benötigen keine Änderung am Kern.

## Schichten

1. **Kursdaten** – Titel, Story, Perspektiven, Kapitel, Belohnungen und Links.
2. **Projektzustand** – Avatar, Fortschritt, Reflexionen, Notizen und
   Einstellungen einer lernenden Person.
3. **Domänenlogik** – Freischaltung, XP, Level, Rang, Import und Export.
4. **Integrationen** – austauschbare Adapter für Offline-Buzzer und optional
   Supabase.
5. **Darstellung** – responsive React-Komponenten und zugängliche Interaktionen.

## Dateiformate

Eine Projektdatei besitzt `format`, `version`, `exportedAt`, einen eingebetteten
Kursbezug sowie den Projektzustand. Das Format wird vor dem Import validiert.
Kursdateien sind eigenständige JSON-Dateien und können im grafischen Editor
erzeugt werden.

## Offline-Strategie

Ein Service Worker legt den statischen Anwendungskern nach dem ersten Abruf in
einem versionsgebundenen Cache ab. Navigationen fallen offline auf die
Startseite zurück. Kurs- und Grafikdateien werden lokal ausgeliefert. Es gibt
keine CDN-Abhängigkeiten und keine extern geladenen Schriftarten.

## PWA und Hosting

Manifest, Icons und Service Worker liegen im Projekt. Der Kern verwendet keine
Serverfunktionen und bleibt dadurch für statisches Hosting einschließlich
GitHub Pages geeignet. Die Sites-Konfiguration dient ausschließlich der
optionalen Veröffentlichung dieses Prototyps.

## Erweiterbarkeit

Zusatzfunktionen implementieren klar definierte Adapter. Das
`LiveSessionAdapter`-Interface kapselt Verbindungsaufbau, Buzzer und Abstimmung.
Der Offline-Adapter bleibt die Vorgabe. Der Supabase-Adapter wird erst durch
eine bewusste Aktivierung instanziiert und ist nie Abhängigkeit des Kerns.

## Sicherheitsgrenzen

- kein Code aus Kursdateien wird ausgeführt
- importierte Werte werden auf erwartete Typen und Größen geprüft
- externe URLs müssen `https:` verwenden
- Supabase-Räume arbeiten ausschließlich mit zufälligen Sitzungskennungen
- Service- und Administrator-Schlüssel gehören niemals in den Browser
