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

Am Seitenende öffnet „Verbesserungsvorschlag einreichen“ ein GitHub-Formular mit Pflichtfeldern für Name und Vorschlag. Dafür ist ein GitHub-Konto nötig. Die Angaben sind öffentlich; darauf weisen Website und Formular vor dem Absenden hin.

„Sammlung als Textdatei herunterladen“ holt beim Anklicken den aktuellen Stand direkt von GitHub und erzeugt im Browser eine UTF-8-Textdatei. Sie enthält Namen, Vorschläge, Zeitstempel, Status und Quellenlinks. Offene und geschlossene Vorschläge werden berücksichtigt, spätere Kommentare nicht. Der Download benötigt kein GitHub-Konto. GitHub kann bei zu vielen Abrufen vorübergehend weitere Anfragen begrenzen; ein fehlgeschlagener Abruf erzeugt keine unvollständige Datei.

Die Vorschläge liegen zentral als GitHub-Issues vor; die Textdatei wird bei jedem Download neu zusammengestellt. Es gibt keine KI-Auswertung, keinen KI-Dienst und keinen regelmäßigen Agentenlauf. Die Daten werden weder an einen KI-Dienst noch an einen zusätzlichen Formularanbieter gesendet.

- `.github/ISSUE_TEMPLATE/verbesserungsvorschlag.yml`: öffentliches Eingabeformular. Die Feldbezeichnungen „Dein Name“ und „Dein Verbesserungsvorschlag“ gehören zum Exportformat.
- `feedback.js`: Download-Bedienung und Rückmeldungen bei Erfolg oder Fehlern.
- `feedback-export.mjs`: Abruf aller Seiten und Erstellung der Textsammlung.
- `tests/feedback-export.test.mjs`: Export-, Format- und Fehlerprüfungen mit ausschließlich erfundenen Testdaten; ausführbar mit `node --test tests/feedback-export.test.mjs`.

Echte Rückmeldungen dürfen ohne ausdrückliche Freigabe nicht als Kontext an eine KI übermittelt werden. Für spätere Änderungen an der Website können daraus separat freigegebene Aufgaben erstellt werden.
