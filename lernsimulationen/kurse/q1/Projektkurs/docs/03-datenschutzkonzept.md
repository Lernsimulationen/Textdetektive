# Datenschutzkonzept

## Datenminimierung

Die Plattform benötigt weder Namen noch E-Mail-Adressen, Benutzerkonten,
Gerätekennungen oder schulische Identifikatoren. Der gewählte Avatar ist eine
lokale, abstrakte Figur. Freitexte können persönliche Angaben enthalten; die
Oberfläche weist deshalb darauf hin, keine Klarnamen einzutragen.

## Verarbeitung und Speicherung

Der aktive Projektstand lebt nur im Arbeitsspeicher des geöffneten Tabs. Eine
dauerhafte Speicherung erfolgt ausschließlich durch den bewussten Export einer
Projektdatei. Die Anwendung setzt keine Cookies ein und schreibt weder in
LocalStorage noch in IndexedDB.

Der Service-Worker-Cache enthält nur öffentlich auslieferbare
Anwendungsressourcen, keine Projekt- oder Freitextdaten.

## Netzwerk

Im Offline-Modus sendet Anwendungscode keine Daten an Dritte. Externe
Materiallinks werden nur nach einer ausdrücklichen Nutzeraktion geöffnet.

Das Live-Modul ist standardmäßig deaktiviert und visuell als Online-Zusatz
gekennzeichnet. Bei Aktivierung darf es ausschließlich zufällige Raumcodes,
anonyme Ereignisse und aggregierte Antworten übertragen. Es dürfen keine
personenbezogenen Daten, Freitexte oder Projektdateien übertragen werden.

## Betroffenenrechte und Löschung

Da der Anbieter keine Projektstände erhält, kann er diese weder einsehen noch
zentral löschen. Lernende kontrollieren ihre exportierten Dateien selbst. Das
Schließen oder Neuladen des Tabs löscht den nicht exportierten Arbeitsspeicher.
Der PWA-Cache kann über die Browser- beziehungsweise Website-Datenverwaltung
entfernt werden.

## Organisatorische Hinweise

- Projektdateien sollen in einem persönlich kontrollierten schulischen
  Speicherbereich abgelegt werden.
- Dateinamen sollen keine Klarnamen enthalten.
- Vor Nutzung des Live-Zusatzmoduls ist eine schulische Datenschutzprüfung
  einschließlich Auftragsverarbeitung und Hosting-Region erforderlich.
- Ein Supabase-`service_role`-Schlüssel darf niemals in Konfigurationen oder
  Projektdateien stehen.
