# Feuerwehr der Zukunft 2026

Wettbewerbsbeitrag des Löschzugs Grünberg-Mitte: Zwei Wehren – ein Standort.

[Website öffnen](https://herrhahn.github.io/feuerwehr-der-zukunft-2026/) · [GitHub-Projekt](https://github.com/HerrHahn/feuerwehr-der-zukunft-2026)

Die Website erzählt das Zusammenwachsen von Lehnheim und Stangenrod, den Neubau des gemeinsamen Feuerwehrhauses und das Festwochenende vom 21. bis 23. August 2026. Sie enthält Fotogalerien, die verlinkte Videochronik und den Bauzeitraffer, belegte Zitate von Stephan Hahn sowie aggregierte Daten aus den Lehnheimer Jahresberichten.

## Datenstand

26. Oktober 2026. Lehnheim 2022–2025 ist ausgewertet. Historische Zahlen aus Stangenrod und der Export des Löschzugs Mitte für Oktober 2026 sind ausdrücklich als ausstehend markiert. Fehlende Daten werden nicht als Nullwerte dargestellt.

Die Lehnheimer Berichte liegen bereits in der Phase gemeinsamer Ausbildung. Sie sind keine unbeeinflusste Ausgangsreihe vor der Zusammenarbeit. Gemeinsame Übungen und Alarmierungen dürfen bei der späteren Zusammenführung der Daten nicht doppelt gezählt werden. Lehrgangsbelegungen sind keine Personen- oder Qualifikationsbestände. Die Bezugsgruppe der Übungsbeteiligung ist vor dem gemeinsamen Vergleich zu bestätigen.

## Dateien

- `index.html`: Inhalte, Projektverlauf und Quellenhinweise.
- `styles.css`: Darstellung auf Rechner und Smartphone sowie Druckansicht.
- `app.js`: Fotogalerien, Datenansicht, Navigation und Präsentationsmodus.
- `statistics.js`: die auf der Website verwendeten Kennzahlen und Platzhalter.
- `lehnheim-daten.json`: ausführliche aggregierte Auswertung mit Quellen und Einschränkungen.
- `foto-*.webp`: für die Website verkleinerte Kopien der bereitgestellten Fotos. Die Originaldateien werden nicht mit veröffentlicht.

Es werden keine Personalberichte, Mitgliederlisten, individuellen Leistungsdaten oder privaten Kontaktdaten veröffentlicht. Foto- und Textrechte verbleiben bei den jeweiligen Rechteinhabern; es wird keine allgemeine Nutzungslizenz erteilt.

## Nutzung

Die Website ist statisch und benötigt keinen Build und keine externen Bibliotheken. In GitHub Pages wird der Branch `main` mit dem Stammverzeichnis `/` veröffentlicht.

Der Button „Präsentieren“ öffnet neun Kapitel, die mit Pfeiltasten bedient werden. Escape beendet die Ansicht. „Bericht drucken / als PDF sichern“ öffnet die Druckfunktion des Browsers und blendet die Quellen und Datentabelle ein. Die Videos werden als YouTube-Links geöffnet und nicht automatisch eingebettet.

Für eine lokale Vorschau kann ein beliebiger statischer Webserver in diesem Ordner gestartet werden.

## Verbesserungsvorschläge

Am Seitenende öffnet „Verbesserungsvorschlag einreichen“ ein Formular direkt auf der Website. Name und Vorschlag werden ohne Benutzerkonto zentral in einer Datenbank gespeichert. Erst nach bestätigter Speicherung erscheint die Erfolgsmeldung; bei Fehlern bleibt die Eingabe erhalten. Wiederholte Übertragungen derselben Einreichung erzeugen keinen zweiten Eintrag.

„Sammlung als Textdatei herunterladen“ liefert jederzeit alle gespeicherten Rückmeldungen mit Namen und Datum als UTF-8-Textdatei. Namen und Vorschläge sind darin öffentlich sichtbar; darauf weist das Formular vor dem Absenden hin.

Die Website liegt weiterhin auf GitHub Pages. Die Speicherung und der TXT-Export laufen über einen eigenen Formularserver bei Sites/Cloudflare mit dauerhafter D1-Datenbank. Es gibt keine KI-Auswertung, keinen Agentenlauf und keine Übermittlung der Vorschläge als KI-Kontext. Tests verwenden ausschließlich erfundene Angaben.

- `feedback.js`: Formular, Übertragung und Erfolg-/Fehlerrückmeldung.
- Formularserver: https://feuerwehr-zukunft-rueckmeldungen.dregen667.chatgpt.site
- Quellcode des Formularservers: im Projektordner `Feuerwehr der Zukunft/Rueckmeldungen-Server`.
- Betriebsprüfung ohne Rückmeldungsinhalte: `/api/health`.

Für die Umsetzung späterer Rückmeldungen separat freigegebene Aufgaben verwenden.
