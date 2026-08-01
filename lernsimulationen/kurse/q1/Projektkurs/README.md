# KI · Mensch · Verantwortung

Ein grafisches Lerntagebuch mit Selbstlernstrecke für den Projektkurs. Die Anwendung läuft als lokale HTML-Datei ohne Framework, Datenbank, Login, Cloud-Anbindung oder externe Bibliothek.

## Ziel

Die Lernenden bearbeiten Missionen in kleinen Schritten, wechseln zwischen technischen, gesellschaftlichen und ethischen Perspektiven und halten ihren eigenen Lernweg fest. Jede Selbstlernstrecke besteht aus Modulen mit:

- einem visuellen Einstieg
- einer kurzen Lernidee
- einer Leitfrage
- einer persönlichen Notiz
- einem klaren nächsten Schritt

## Zentrales Dashboard

Die Anwendung beginnt mit einem Begrüßungsbildschirm und führt danach in das Dashboard. Das Dashboard ist der zentrale Knotenpunkt: Von dort aus verzweigt die Anwendung in Tutorial, Ethikkommission, Lerntagebuch, persönliche Akte und Live-Labor. Eine Seitenleiste gibt es bewusst nicht.

Die Geschichte beginnt mit einer Einladung: KI verändert Entscheidungen, Erwartungen und Verantwortungsräume. Die Lernenden werden als neue Mitglieder einer Kommission eingesetzt. Sie sollen keine vorgegebene Meinung reproduzieren, sondern Beobachtungen sammeln, Perspektiven vergleichen und am Ende ein eigenes, begründetes Votum formulieren.

Mission 0 ist der geschützte Einstieg. Dort können Lernende mit einem Pseudonym, Kurs oder einer Lerngruppe und einer eigenen Erwartung starten. Erst nach Bestätigung der Schutzregeln beginnt der weitere Missionsweg.

## Avatar-Studio

Die Identität kommt vor dem Dashboard. Im Avatar-Studio stehen fünf männliche, fünf weibliche und ein non-binärer Avatar als lokale Rasterbilder zur Auswahl. Dazu kann ein Farbskill gewählt werden: Er markiert die Rolle visuell, ohne sie auf eine feste Eigenschaft festzulegen. Die Porträts liegen in `bilder/avatar-sprite.png`.

Noa Levin ist der non-binäre Beispielavatar. Noa verbindet einen wachen Blick für politische Macht mit Fragen nach Würde, Gewissen und Verantwortung. Im Studio kann eine Biografie mit bis zu 500 Zeichen geschrieben werden. Wichtig: Diese Biografie beschreibt die Rolle, die im Projektkurs gespielt werden soll – nicht die private Biografie der lernenden Person.

## Dateien

- `index.html` – komplette Anwendung inklusive CSS und JavaScript
- `bilder/` – lokale, KI-generierte Bildassets
- `CHANGELOG.md` – nachvollziehbare Änderungen und Sicherheitsregeln

## Start

Die Datei kann direkt per Doppelklick geöffnet werden. Für eine lokale Vorschau reicht ein beliebiger statischer Webserver. Es werden keine Pakete installiert und keine Netzwerkdienste benötigt.

## Module sicher erweitern

Module liegen in `index.html` im Array `state.modules`. Jedes Modul besitzt eine stabile ID:

```js
{
  id: "selbstlernen",
  kicker: "03 · Selbstlernen",
  title: "Lernen in kleinen Missionen",
  description: "...",
  question: "...",
  image: "bilder/lerntagebuch.png"
}
```

Die Bearbeitung ist bewusst kein sichtbarer Bestandteil der Lernoberfläche. Die Oberfläche dient dem Lernen, nicht dem versehentlichen Umbau des Kurses. Änderungen an einzelnen Modulen werden kontrolliert im Chat oder direkt im geschützten Datenblock der HTML-Datei vorgenommen und anschließend als Projektdatei gesichert.

Für Änderungen im Chat gilt derselbe sichere Ablauf:

1. Vor der Änderung eine Projektdatei exportieren.
2. Nur das gewünschte Modul anhand seiner `id` ändern; Dashboard, Missionen und übrige Module bleiben unverändert.
3. IDs und Bildpfade nicht umbenennen, sofern keine bewusste Migration geplant ist.
4. Keine Skripte aus dem Internet, keine `eval`-Aufrufe und kein HTML aus Eingabefeldern einfügen.
5. Die bearbeitete Datei öffnen und Mission, Notiz, Import und Export kurz prüfen.

Die Anwendung escaped bearbeitbare Texte vor der Anzeige und akzeptiert beim Import nur bekannte lokale Bildpfade im Format `bilder/<name>.png`.

## Daten und Datenschutz

Der Lernstand bleibt nur im Arbeitsspeicher, bis er ausdrücklich als JSON exportiert wird. Es gibt kein `localStorage`, keine Cookies, keine Analytics und keine Supabase-Integration. Der JSON-Export enthält Kurs, Module, Fortschritt und Notizen und kann lokal wieder importiert werden.

## Live-Labor als separates Untergame

Das Live-Labor ist vom persönlichen Lernspiel getrennt. Die aktuelle Version enthält nur eine lokale Demo. Eine spätere Online-Variante mit Raumcode, gemeinsamer Abstimmung und eventuell Supabase wird als eigenes Modul beziehungsweise eigener Unterordner geplant. Sie darf weder den Lernstand noch die Missionslogik voraussetzen oder verändern.

## Bildsprache

Die Bilder wurden als zusammenhängende, textfreie Raster-Illustrationen erzeugt. Es werden keine Vektorgrafiken für die Avatare verwendet. Text und Lerninhalte bleiben im HTML, damit sie unabhängig vom Bild bearbeitet werden können.
