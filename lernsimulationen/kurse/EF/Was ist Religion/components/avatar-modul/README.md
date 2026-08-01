# Lern-Avatar-Bibliothek

Ein dependency-freies Avatar-Modul als Web Component für Lernspiele. Enthalten sind 73 KI-generierte Porträts: 15 weibliche, 15 männliche und 3 diverse Jugendliche im Alter von 16 bis 19 Jahren sowie je 20 historische evangelische Persönlichkeiten in den Kategorien weiblich und männlich. Jede Figur hat eine eigene Kurzbiografie.

## Lokal testen

`index.html` kann direkt im Browser geöffnet werden. Für ES-Module ist ein kleiner lokaler Webserver zuverlässiger, zum Beispiel:

```bash
python -m http.server 8000
```

Danach `http://localhost:8000` öffnen.

## In ein Lernspiel einbinden

```bash
git submodule add https://github.com/Lernsimulationen/Avatar.git src/components/avatar-modul
```

```html
<script src="./components/avatar-modul/avatar.js"></script>
<lern-avatar type="female" index="0" accessory="book"></lern-avatar>
```

`type` ist `female`, `male` oder `nonbinary`. Für die Jugendporträts stehen die bisherigen Indizes zur Verfügung; historische Porträts werden über die Profilwahl geladen. Die Filter `männlich`, `weiblich` und `divers` wirken auf die Pseudonym-Liste. Accessoires: `none`, `glasses`, `book`, `mug`, `headphones`, `plant`, `star`.

## Pseudonyme und eigene Biografien

Die Demo verwendet ausschließlich 150 vorgefertigte, kulturell gemischte Pseudonyme: 50 weibliche, 50 männliche und 50 diverse. Pseudonym, Filterkategorie und Jugendbildprofil sind fest miteinander verknüpft. Ein eigener Name wird nicht abgefragt oder angezeigt. Die Filter `männlich`, `weiblich` und `divers` wirken ausschließlich auf die Pseudonym-Liste. Die 40 historischen Persönlichkeiten werden in einem eigenen Bereich ausgewählt und erscheinen mit ihrem echten Namen, ihrer eigenen Biografie und ihrem zugehörigen historischen Bild. Zusätzlich kann eine eigene Biografie eingegeben werden; bei Jugendprofilen bleibt der Name immer das ausgewählte Pseudonym. Das ausgewählte Accessoire erscheint als Overlay auf dem Bild und zusätzlich als Item-Anzeige darunter.

## Geprüfte historische Zuordnung

Die beiden historischen Bildtafeln sind normalisierte 5×4-Raster mit 20 quadratischen Porträts. Alle Bildfelder wurden einzeln zugeschnitten, damit Gesichter unverzerrt und ohne Teile benachbarter Bilder erscheinen. Die Reihenfolge entspricht exakt der Reihenfolge der 20 Datensätze in `avatar.js`: Feld 1 gehört zum ersten Namen und seiner Biografie, Feld 2 zum zweiten usw. Die technische Zuordnung erfolgt über `historical`, `type` und `portraitIndex`; dadurch können weibliche und männliche historische Profile nicht versehentlich vertauscht werden.
