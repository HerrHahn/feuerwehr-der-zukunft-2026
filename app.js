(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const data = window.FDZ_DATA;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const image = id => `foto-${String(id).padStart(2, '0')}.webp`;
  const photoCaptions = {
    0:'Historischer Festzug der Feuerwehr Lehnheim vor dem damaligen Gerätehaus.',1:'Eigenleistung beim Umbau des alten Lehnheimer Gerätehauses.',2:'Arbeiten am Treppenbereich des alten Lehnheimer Gerätehauses.',3:'Tag der offenen Tür in Lehnheim, 2007.',4:'Historische Übung der Feuerwehr Lehnheim.',9:'Frühere räumliche Bedingungen in Stangenrod.',10:'Gemeinsame Dienstversammlung in der Gallushalle, November 2020.',12:'Im Gespräch über den gemeinsamen Weg: Dienstversammlung in der Gallushalle.',13:'Chancen und Bedenken auf Flipcharts: Beteiligung der Mannschaften.',14:'Gemeinsame Ausbildung vor dem Zusammenschluss.',15:'Gemeinsame praktische Ausbildung mit den Fahrzeugen beider Wehren.',16:'Zusammenarbeit im Feuerwehrdienst vor der Neugründung.',18:'Praktische Ausbildung im Mai 2025.',19:'Gemeinsame Übung im Mai 2025.',20:'Gemeinsame Verantwortung bei der Gründung des Löschzugs 2026.',21:'Die Gründungsversammlung des Löschzugs Grünberg-Mitte im Februar 2026.',22:'Der Blaulichtkorso zum Einzug führt durch beide Orte.',24:'Auf dem Weg zum gemeinsamen Standort.',26:'Ein gemeinsamer Standort für Mannschaft und Fahrzeuge.',27:'Das neue Feuerwehrhaus während der Bauphase 2024.',28:'Ein Blick in den Rohbau.',29:'Der Rohbau mit Kran und Gerüst.',30:'Die Räume des künftigen Feuerwehrhauses entstehen.',32:'Innenausbau im neuen Feuerwehrhaus.',33:'Der spätere gemeinsame Ausbildungsbereich im Ausbau.',34:'Vorbereitet für ein gemeinsames Festwochenende.',35:'Der Kommers am Freitag: beide Orte feiern gemeinsam.',36:'Begegnungen beim Kommers im Festzelt.',37:'Der Kommers bietet Raum für Grußworte und Erinnerungen.',38:'Musik und Publikum beim Kommers.',39:'Gesangverein Concordia Stangenrod',40:'Gäste im Festzelt beim Kommers.',41:'Bühnenprogramm am Freitagabend.',42:'Samstagabend: Musik und Begegnung im Festzelt.',44:'Die Kinzenbacher auf der Bühne am Samstag.',45:'Gemeinsam feiern am Samstagabend.',47:'Livemusik beim Festwochenende.',49:'Blick auf die Bühne am Samstagabend.',51:'Offizielle Einweihung am Sonntag, 23. August 2026.',54:'Das neue Gerätehaus wird zum Treffpunkt.',56:'Angebote für Familien beim Blaulicht-Erlebnistag.',58:'Begegnungen vor dem gemeinsamen Feuerwehrhaus am Sonntag.',60:'Historische Feuerwehrtechnik vor dem neuen Haus.',63:'Fahrzeugausstellung beim Blaulicht-Erlebnistag.',65:'Die Mannschaft und Jugendfeuerwehr vor ihrem gemeinsamen Zuhause.',66:'Gemeinsame Ausbildung im neuen Feuerwehrhaus.',67:'Die Gründung der Minifeuerwehr beim Festwochenende.',68:'Kinder und Betreuende bei der Gründung der Minifeuerwehr.',69:'Ein Anfang für die nächste Generation: Gründung der Minifeuerwehr.',70:'Jugendfeuerwehr bei einer gemeinsamen Aktivität.',71:'Praktische Übung der Jugendfeuerwehr.',72:'Die gemeinsame Jugendfeuerwehr am neuen Standort.',74:'Die Minifeuerwehr bei einem ihrer ersten Treffen.',75:'Die Minifeuerwehr entdeckt ihr neues Umfeld.',77:'Planung des neuen Feuerwehrhauses: Perspektive auf den Alarmhof. Planstand Mai 2023, Architektenkontor Faller + Krück Works GmbH.',78:'Planung des neuen Feuerwehrhauses: Perspektive Südost. Planstand Mai 2023, Architektenkontor Faller + Krück Works GmbH.',79:'Grundriss des gemeinsamen Feuerwehrhauses. Planungsunterlage von Faller + Krück Works GmbH.',80:'Nachwuchsarbeit im neuen Feuerwehrhaus: gemeinsam kreativ werden.',81:'Das bisherige Gerätehaus in Lehnheim. Aufnahme von Roger.',82:'Das bisherige Gerätehaus in Stangenrod. Aufnahme von Roger.'
  };
  const galleries = {
    geschichte:{title:'Feuerwehr der Vergangenheit',photos:[81,82,0,1,2,3,4,9]},
    weg:{title:'Unser gemeinsamer Weg',photos:[10,12,13,14,15,18,19,20,21,66]},
    plaene:{title:'Vom Entwurf zum gemeinsamen Haus',photos:[77,78,79]},
    bau:{title:'Planung, Bauphase und Einzug',photos:[77,78,79,29,27,28,30,32,33,22,24,26,65]},
    freitag:{title:'Freitag · Kommers und Jubiläen',photos:[34,35,36,37,38,39,40,41]},
    samstag:{title:'Samstag · Gemeinsam feiern',photos:[42,44,45,47,49]},
    sonntag:{title:'Sonntag · Einweihung und Blaulicht-Erlebnistag',photos:[51,54,56,58,60,63,67,68,69]},
    nachwuchs:{title:'Unsere nächste Generation',photos:[72,70,71,67,68,69,74,75,80]}
  };
  let galleryItems = [], galleryIndex = 0, returnFocus = null;
  const galleryDialog = $('#gallery-dialog');
  function renderPhoto(){
    const id = galleryItems[galleryIndex];
    $('#gallery-image').src = image(id);
    $('#gallery-image').alt = photoCaptions[id] || 'Fotografie aus dem Projektarchiv';
    $('#gallery-caption').textContent = photoCaptions[id] || 'Fotografie aus dem Projektarchiv';
    $('#gallery-count').textContent = `${galleryIndex + 1} / ${galleryItems.length}`;
    $('#gallery-prev').disabled = galleryIndex === 0;
    $('#gallery-next').disabled = galleryIndex === galleryItems.length - 1;
  }
  function openGallery(items,title,trigger){
    galleryItems = items; galleryIndex = 0; returnFocus = trigger;
    $('#gallery-title').textContent = title;
    renderPhoto(); galleryDialog.showModal(); document.body.classList.add('modal-open'); $('#gallery-close').focus();
  }
  $$('[data-gallery]').forEach(button => button.addEventListener('click', () => {
    const group = galleries[button.dataset.gallery]; openGallery(group.photos,group.title,button);
  }));
  $$('[data-photo]').forEach(button => button.addEventListener('click', () => openGallery([Number(button.dataset.photo)],'Ein Blick in unser Projekt',button)));
  $('#gallery-prev').addEventListener('click',()=>{if(galleryIndex>0){galleryIndex--;renderPhoto();}});
  $('#gallery-next').addEventListener('click',()=>{if(galleryIndex<galleryItems.length-1){galleryIndex++;renderPhoto();}});
  $('#gallery-close').addEventListener('click',()=>galleryDialog.close());
  galleryDialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');returnFocus?.focus();});
  galleryDialog.addEventListener('click', event => {if(event.target===galleryDialog){const r=galleryDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)galleryDialog.close();}});

  const menuButton = $('#menu-toggle');
  menuButton.addEventListener('click',()=>{const expanded=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!expanded));$('#mobile-nav').hidden=expanded;menuButton.querySelector('span').textContent=expanded?'+':'−';});
  $$('#mobile-nav a').forEach(a=>a.addEventListener('click',()=>{menuButton.setAttribute('aria-expanded','false');$('#mobile-nav').hidden=true;menuButton.querySelector('span').textContent='+';}));

  let unit='gesamt';
  const number = value => new Intl.NumberFormat('de-DE',{maximumFractionDigits:1}).format(value);
  function statMarkup(key){
    const u=data.units[unit],metric=u.metrics[key];
    const ceiling=Math.ceil(Math.max(...metric.values.filter(v=>v!==null))*1.15/5)*5 || 5;
    return `<h3 class="stat-title">${escape(metric.label)}</h3><p class="chart-unit">${escape(u.label)} · ${escape(metric.unit)}</p><div class="bar-chart" style="--bar-count:${u.years.length}" role="img" aria-label="${escape(metric.label)}: ${metric.values.map((v,i)=>`${u.years[i]}: ${v===null?'nicht belegt':number(v)}`).join('; ')}. Alle Balken beginnen bei null."><span class="chart-zero">0</span>${metric.values.map((value,i)=>`<div class="bar-column"><div class="bar ${String(u.years[i]).includes('/')?'snapshot-bar':''}" style="height:${value===null?0:value/ceiling*100}%"><span class="bar-number">${value===null?'—':number(value)}</span></div><span class="bar-year">${u.years[i]}</span></div>`).join('')}</div>`;
  }
  function tableMarkup(u){
    return `<caption>${escape(u.label)} · ${escape(u.period)}</caption><thead><tr><th scope="col">Kennzahl</th>${u.years.map(y=>`<th scope="col">${escape(y)}</th>`).join('')}</tr></thead><tbody>${[...Object.values(u.metrics),...(u.additional||[])].map(m=>`<tr><th scope="row">${escape(m.label)}<small>${escape(m.unit||'')} · ${escape(m.source)}${m.note?`<br>${escape(m.note)}`:''}</small></th>${m.values.map(v=>`<td>${v===null?'<span aria-label="Nicht belegt">—</span>':number(v)}</td>`).join('')}</tr>`).join('')}</tbody>`;
  }
  function renderTable(){
    const u=data.units[unit];
    $('#data-table').innerHTML=tableMarkup(u);
    $('#table-source').textContent=u.source;
  }
  function renderStats(){
    const u=data.units[unit],select=$('#metric');
    const old=select.value;
    select.innerHTML=Object.entries(u.metrics).map(([key,m])=>`<option value="${key}">${escape(m.label)}</option>`).join('');
    select.value=u.metrics[old]?old:Object.keys(u.metrics)[0];
    $('.metric-controls').hidden=unit==='mitte'||unit==='gesamt';
    if(unit==='mitte'){
      $('#stat-visual').innerHTML=`<h3 class="stat-title">Der Löschzug heute</h3><p class="chart-unit">Stand 26. Oktober 2026</p><div class="current-stats"><div><strong>43</strong><span>Aktive</span><small>Personalexport · Zugehörigkeit bestätigt</small></div><div><strong>16</strong><span>erfasste Berichte</span><small>6 Brand · 7 Hilfeleistung · 1 Fehlalarm · 2 Dienstleistung</small></div><div><strong>813,2</strong><span>erfasste Personenstunden</span><small>einschließlich Tätigkeiten in anderen Einheiten</small></div></div><p class="current-detail">Davon 256,5 Personenstunden für Lehrgänge und Seminare. Eine vollständige Jahresbilanz und die Zahl aller gemeinsamen Übungen lassen sich aus diesem Zwischenstand noch nicht ableiten.</p>`;
      $('#data-context').textContent=u.note+' Ein Hilfeleistungsbericht mit Datum 01.01.2026, 00:00 Uhr bleibt zu prüfen. Die 16 Berichte sind daher ausdrücklich als Exportbestand ausgewiesen.';
    }else{
      $('#stat-visual').innerHTML=statMarkup(select.value);
      $('#data-context').textContent=u.metrics[select.value].note;
    }
    renderTable();
    $('#statistics-panel').setAttribute('aria-labelledby',`tab-${unit}`);
  }
  function activateUnit(button){unit=button.dataset.unit;$$('[data-unit]').forEach(b=>{b.setAttribute('aria-selected',String(b===button));b.tabIndex=b===button?0:-1;});renderStats();}
  $$('[data-unit]').forEach(button=>{
    button.addEventListener('click',()=>activateUnit(button));
    button.addEventListener('keydown',e=>{const tabs=$$('[data-unit]');let i=tabs.indexOf(button);if(e.key==='ArrowRight')i=(i+1)%tabs.length;else if(e.key==='ArrowLeft')i=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')i=0;else if(e.key==='End')i=tabs.length-1;else return;e.preventDefault();tabs[i].focus();activateUnit(tabs[i]);});
  });
  $('#metric').addEventListener('change',renderStats);
  renderStats();
  $('#print-data').innerHTML=Object.values(data.units).map(u=>`<div class="print-unit"><table>${tableMarkup(u)}</table><p class="source-inline">${escape(u.source)}</p></div>`).join('');

  const slides=[
    {tag:'Unser Beitrag · Lehnheim und Stangenrod',title:'Zwei Wehren.<br>Ein Standort.',description:'Eine gemeinsame Zukunft für den Brandschutz in unseren Orten.',photo:65},
    {tag:'Feuerwehr der Vergangenheit',title:'Zukunft braucht<br>eine Geschichte.',description:'1935: Stangenrod.<br>1951: Lehnheim.<br>Generationen, die Verantwortung übernehmen.',photo:0,link:'https://youtu.be/lsIuLxd_YvE',linkText:'Chronik auf YouTube'},
    {tag:'Warum Veränderung nötig war',title:'Gemeinsame Aufgaben.<br>Neue Möglichkeiten.',description:'Beengte Gerätehäuser. Wachsende Anforderungen. Der Wunsch, Personal, Technik und Ausbildung zu bündeln.',photo:9},
    {tag:'Unser Weg',title:'Vier Jahre<br>gemeinsam geübt.',description:'„In dem Moment, als unsere beiden Wehren endgültig zu einer Einsatzabteilung wurden, hatten wir bereits vier Jahre komplett gemeinsam geübt.“',photo:19,source:'Stephan Hahn · Rede Sonntag, S. 3'},
    {tag:'Das gemeinsame Zuhause',title:'Aus einem Plan<br>wird unser Haus.',description:'Relativ mittig zwischen beiden Orten.<br>Für beide gut erreichbar.<br>Ein gemeinsamer Neuanfang.',photo:77,link:'https://youtu.be/0JslBPGW3Is',linkText:'Bauzeitraffer auf YouTube'},
    {tag:'Beide Ortswehren → Löschzug Mitte',title:'43 Aktive.<br>Eine Mannschaft.',description:'Gemeinsame Personalbasis, gemeinsame Ausbildung und ein gemeinsamer Standort.',type:'stats',source:'2022–2025: Summe beider Jahresendstände. Oktober 2026: bestätigter Personalexport. Personalstärke ist keine Aussage zur Tagesverfügbarkeit.'},
    {tag:'21.–23. August 2026',title:'Gemeinsam gewachsen.<br>Gemeinsam feiern.',description:'Beide Orte erleben ihre gemeinsame Feuerwehr. Das Fest wird zum öffentlichen Abschluss unseres Projekts.',photo:58},
    {tag:'Die Arbeit hinter dem Fest',title:'„Die vielen Stunden<br>Arbeit, die<br>dahinterstecken.“',description:'„Was man dabei nicht sofort sieht, sind die vielen Stunden Arbeit, die dahinterstecken.“',photo:36,source:'Stephan Hahn · Rede Freitag. Titel: gekürzter Auszug.'},
    {tag:'Unser Projektergebnis',title:'Aus zwei Wehren<br>wird gemeinsame<br>Verantwortung.',description:'Gemeinsame Einsatzabteilung und Führung.<br>Ein bezogenes Feuerwehrhaus.<br>Gemeinsame Jugend- und neue Minifeuerwehr.<br>Ein Fest als öffentlicher Projektabschluss.',photo:65},
    {tag:'Was andere mitnehmen können',title:'Zuhören.<br>Gemeinsam üben.<br>Neu anfangen.',description:'Bedenken zulassen. Extern moderieren.<br>Den Standort für beide Orte wählen.<br>Zusammenarbeit vor der Gründung leben.',photo:13},
    {tag:'Der Blick nach vorn',title:'„Wir wollen eine<br>Feuerwehr für<br>morgen aufstellen.“',description:'Gemeinsame Jugendfeuerwehr.<br>Minifeuerwehr gegründet.<br>Unser Weg geht weiter.',photo:69,source:'Stephan Hahn · Rede Sonntag, S. 4'}
  ];
  let slideIndex=0;
  const present=$('#presentation');
  function renderSlide(){
    const s=slides[slideIndex];
    const media=s.type==='stats'?`<div class="slide-stats" role="img" aria-label="Aktive beider Wehren zusammen: 2022 42; 2023 45; 2024 41; 2025 43; Oktober 2026 43">${data.units.gesamt.metrics.active.values.map((v,i)=>`<div class="slide-stat" style="height:${v/50*100}%"><strong>${v}</strong><span>${data.units.gesamt.years[i]}</span></div>`).join('')}</div>`:`<img src="${image(s.photo)}" alt="${escape(photoCaptions[s.photo]||'Unser Projekt')}">`;
    $('#presentation-content').innerHTML=`<article class="presentation-slide ${s.type==='stats'?'stat-slide':''}"><div><p class="eyebrow">${s.tag}</p><h2 id="presentation-title">${s.title}</h2><p class="slide-description">${s.description}</p>${s.link?`<a class="text-link" href="${s.link}" target="_blank" rel="noopener noreferrer">${s.linkText} ↗</a>`:''}${s.source?`<p class="slide-source">${s.source}</p>`:''}</div>${media}</article>`;
    $('#present-counter').textContent=`${String(slideIndex+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
    $('#present-prev').disabled=slideIndex===0;$('#present-next').disabled=slideIndex===slides.length-1;
  }
  function changeSlide(delta){const next=slideIndex+delta;if(next>=0&&next<slides.length){slideIndex=next;renderSlide();}}
  $('#present-start').addEventListener('click',()=>{slideIndex=0;renderSlide();present.showModal();document.body.classList.add('modal-open');$('#present-close').focus();});
  $('#present-close').addEventListener('click',()=>present.close());
  present.addEventListener('close',()=>{document.body.classList.remove('modal-open');$('#present-start').focus();});
  $('#present-prev').addEventListener('click',()=>changeSlide(-1));$('#present-next').addEventListener('click',()=>changeSlide(1));
  document.addEventListener('keydown',e=>{
    if(present.open&&(e.key==='ArrowRight'||e.key==='PageDown')){e.preventDefault();changeSlide(1);}
    else if(present.open&&(e.key==='ArrowLeft'||e.key==='PageUp')){e.preventDefault();changeSlide(-1);}
    else if(galleryDialog.open&&e.key==='ArrowRight'&&galleryIndex<galleryItems.length-1){e.preventDefault();galleryIndex++;renderPhoto();}
    else if(galleryDialog.open&&e.key==='ArrowLeft'&&galleryIndex>0){e.preventDefault();galleryIndex--;renderPhoto();}
  });
  let printState=null;
  function preparePrint(){if(printState)return;printState={unit,metric:$('#metric').value,details:$$('details').map(d=>d.open)};activateUnit($('#tab-gesamt'));$('#metric').value='active';renderStats();$$('details').forEach(d=>d.open=true);}
  function restorePrint(){if(!printState)return;const old=printState;printState=null;activateUnit($(`#tab-${old.unit}`));$('#metric').value=old.metric;renderStats();$$('details').forEach((d,i)=>d.open=old.details[i]);}
  $('#print-report').addEventListener('click',()=>{preparePrint();window.print();});
  window.addEventListener('beforeprint',preparePrint);window.addEventListener('afterprint',restorePrint);
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){$$('.desktop-nav a').forEach(a=>{const active=a.hash===`#${entry.target.id}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -65% 0px'});$$('.chapter').forEach(section=>observer.observe(section));}
})();
