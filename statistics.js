/* Öffentlich verwendete Aggregate. Fehlende Werte bleiben null. */
window.FDZ_DATA = {
  updated: '2026-10-26',
  metrics: {
    active: {label:'Aktive zum Jahresende',unit:'Personen · jeweils 31. Dezember',source:'Personelles',values:[25,25,24,26],note:'Die Personalstärke Lehnheims liegt in den vier Berichtsjahren zwischen 24 und 26 Aktiven. Gezählt ist die Einsatzabteilung, nicht der Feuerwehrverein oder die Ehren- und Altersabteilung.'},
    exercises: {label:'Reguläre Ausbildungen',unit:'Termine im Kalenderjahr',source:'Ausbildung',values:[21,20,20,21],note:'Seit 2022 fanden die regulären Ausbildungen gemeinsam mit Stangenrod statt. Diese gemeinsamen Termine dürfen später nicht mit Stangenröder Terminzahlen addiert werden. 2022 begann die praktische Präsenzausbildung pandemiebedingt erst im April.'},
    attendance: {label:'Berichteter Teilnehmerdurchschnitt',unit:'Ø Personen je regulärer Ausbildung',source:'Ausbildung',values:[13,11,11,12],note:'Die gerundeten Durchschnittswerte sind unverändert aus den Lehnheimer Ausbildungsberichten übernommen. Die Berichte grenzen die Bezugsgruppe bei den gemeinsamen Übungen nicht ausdrücklich ab. Vor einer Zusammenführung mit Stangenrod muss die Zählweise bestätigt werden.'},
    alarms: {label:'Alarmierungen',unit:'Alarmierte Einsätze im Kalenderjahr',source:'Einsätze',values:[7,13,11,9],note:'Die Berichte führen Alarmierungen und Absicherungen getrennt. Einsatzanzahl ist kein Maß für die verfügbare Mannschaft oder die Tagesalarmsicherheit. Gemeinsame Alarmereignisse dürfen später nicht doppelt gezählt werden. 2025 sind zusätzliche Tätigkeiten während der Marktbereitschaft beschrieben, die nicht zu den neun Alarmierungen addiert wurden.'},
    safeguards: {label:'Absicherungen',unit:'Veranstaltungsabsicherungen im Kalenderjahr',source:'Einsätze',values:[2,2,4,3],note:'Separat in den Einsatzberichten ausgewiesene Absicherungen, zusätzlich zu den Alarmierungen. Die Jahreswerte sind keine Aussage zur Dauer oder zum Personalaufwand.'},
    courses: {label:'Lehrgangs- und Seminarbelegungen',unit:'Belegte Plätze / Teilnahmen im Kalenderjahr',source:'Lehrgänge',values:[24,47,33,37],note:'Gezählt werden belegte Lehrgangs- und Seminarplätze. Eine Person kann mehrfach teilnehmen. Die Werte beschreiben weder unterschiedliche Personen noch den Bestand einsatzfähiger Qualifikationen.'}
  },
  units: {
    lehnheim:{label:'Lehnheim',status:'complete',period:'2022–2025',years:[2022,2023,2024,2025]},
    stangenrod:{label:'Stangenrod',status:'pending',period:'Historische Vergleichszahlen',years:[2022,2023,2024,2025],values:{active:null,exercises:null,attendance:null,alarms:null,safeguards:null,courses:null}},
    mitte:{label:'Löschzug Mitte',status:'pending',period:'Stand Oktober 2026',years:[2026],referenceDate:null,values:{active:null,exercises:null,attendance:null,alarms:null,safeguards:null,courses:null}}
  },
  additional: [
    {label:'Durchschnittsalter zum Jahresende',values:[36,36,38,36],unit:'Jahre',source:'Personelles'},
    {label:'Atemschutzgeräteträger laut Bericht',values:[10,13,11,13],source:'Ausbildung',note:'Abweichende Stichtage beachten.'},
    {label:'Atemschutz: Status Grün laut Bericht',values:[10,11,11,11],source:'Ausbildung',note:'2022 und 2023 jeweils 31.12.; 2024 zum Berichtsdatum 25.01.2025; 2025 ohne ausdrücklich genannten Status-Stichtag.'},
    {label:'Jugendfeuerwehr zum Jahresende',values:[null,9,null,null],source:'Jugendbericht 2023/24',note:'Bericht beschreibt das Kalenderjahr 2023. Anfang 2023: 5 Mitglieder; Ende 2023: 9. Nicht auf andere Jahre übertragen.'},
    {label:'Jugendtermine einschließlich Ausflügen',values:[null,30,null,null],source:'Jugendbericht 2023/24',note:'Kalenderjahr 2023; keine reine Übungszahl.'}
  ]
};
