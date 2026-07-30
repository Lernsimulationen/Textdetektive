# Live-Modul

## Standardmodus

Der lokale Buzzer und die lokale Abstimmung arbeiten ausschließlich im
Arbeitsspeicher des geöffneten Tabs. Es findet kein Netzwerkzugriff statt.

## Adaptergrenze

`LiveSessionAdapter` definiert Verbindungsaufbau, Buzzer-Ereignis, Stimmabgabe
und aggregierte Ergebnisse. `OfflineLiveAdapter` ist die Voreinstellung.
`SupabaseLiveAdapter` wird dynamisch und erst nach einer bewussten Aktivierung
geladen.

## Vorgesehenes anonymes Supabase-Schema

Die Tabelle `live_events` benötigt mindestens:

- `room_code`: kurzlebiger, nicht personenbezogener Raumcode
- `event_type`: `buzz` oder `vote`
- `participant_token`: zufälliges Sitzungstoken ohne Gerätebezug
- `option_id`: technische Kennung einer Antwort
- `created_at`: Zeitpunkt für Reihenfolge und automatische Löschung

Eine View beziehungsweise sichere RPC-Funktion `live_vote_totals` liefert nur
aggregierte Stimmzahlen. Row-Level Security begrenzt Schreib- und Lesezugriffe
auf aktive Räume. Ereignisse sollten nach Ende einer Unterrichtssitzung
automatisch gelöscht werden.

## Datenschutzregeln

- keine Namen, E-Mail-Adressen, Freitexte oder Projektdateien
- keine dauerhaften Teilnehmendenkennungen
- keine IP-Adressen im Anwendungsschema
- kein `service_role`-Schlüssel im Browser
- Aktivierung erst nach schulischer Datenschutz- und Vertragsprüfung
- deutliche Online-Kennzeichnung in der Oberfläche
