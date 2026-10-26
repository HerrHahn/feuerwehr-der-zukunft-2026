(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const data = window.FDZ_DATA;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const image = id => `foto-${String(id).padStart(2, '0')}.webp`;
  const photoCaptions = {
    0:'Historischer Festzug der Feuerwehr Lehnheim vor dem damaligen Gerätehaus.',1:'Eigenleistung beim Umbau des alten Lehnheimer Gerätehauses.',2:'Arbeiten am Treppenbereich des alten Lehnheimer Gerätehauses.',3:'Tag der offenen Tür in Lehnheim, 2007.',4:'Historische Übung der Feuerwehr Lehnheim.',9:'Frühere räumliche Bedingungen in Stangenrod.',10:'Gemeinsame Dienstversammlung in der Gallushalle, November 2020.',12:'Im Gespräch über den gemeinsamen Weg: Dienstversammlung in der Gallushalle.',13:'Chancen und Bedenken auf Flipcharts: Beteiligung der Mannschaften.',14:'Gemeinsame Ausbildung vor dem Zusammenschluss.',15:'Gemeinsame praktische Ausbildung mit den Fahrzeugen beider Wehren.',16:'Zusammenarbeit im Feuerwehrdienst vor der Neugründung.',18:'Praktische Ausbildung im Mai 2025.',19:'Gemeinsame Übung im Mai 2025.',20:'Gemeinsame Verantwortung bei der Gründung des Löschzugs 2026.',21:'Die Gründungsversammlung des Löschzugs Grünberg-Mitte im Februar 2026.',22:'Der Blaulichtkorso zum Einzug führt durch beide Orte.',24:'Auf dem Weg zum gemeinsamen Standort.',26:'Ein gemeinsamer Standort für Mannschaft und Fahrzeuge.',27:'Das neue Feuerwehrhaus während der Bauphase 2024.',28:'Ein Blick in den Rohbau.',29:'Der Rohbau mit Kran und Gerüst.',30:'Die Räume des künftigen Feuerwehrhauses entstehen.',32:'Innenausbau im neuen Feuerwehrhaus.',33:'Der spätere gemeinsame Ausbildungsbereich im Ausbau.',34:'Vorbereitet für ein gemeinsames Festwochenende.',35:'Der Kommers am Freitag: beide Orte feiern gemeinsam.',36:'Begegnungen beim Kommers im Festzelt.',37:'Der Kommers bietet Raum für Grußworte und Erinnerungen.',38:'Musik und Publikum beim Kommers.',39:'Gemeinsam auf der Bühne am Freitagabend.',40:'Gäste im Festzelt beim Kommers.',41:'Bühnenprogramm am Freitagabend.',42:'Samstagabend: Musik und Begegnung im Festzelt.',44:'Die Kinzenbacher auf der Bühne am Samstag.',45:'Gemeinsam feiern am Samstagabend.',47:'Livemusik beim Festwochenende.',49:'Blick auf die Bühne am Samstagabend.',51:'Offizielle Einweihung am Sonntag, 23. August 2026.',54:'Das neue Gerätehaus wird zum Treffpunkt.',56:'Angebote für Familien beim Blaulicht-Erlebnistag.',58:'Begegnungen vor dem gemeinsamen Feuerwehrhaus am Sonntag.',60:'Historische Feuerwehrtechnik vor dem neuen Haus.',63:'Fahrzeugausstellung beim Blaulicht-Erlebnistag.',65:'Die Mannschaft und Jugendfeuerwehr vor ihrem gemeinsamen Zuhause.',66:'Gemeinsame Ausbildung im neuen Feuerwehrhaus.',67:'Die Gründung der Minifeuerwehr beim Festwochenende.',68:'Kinder und Betreuende bei der Gründung der Minifeuerwehr.',69:'Ein Anfang für die nächste Generation: Gründung der Minifeuerwehr.',70:'Jugendfeuerwehr bei einer gemeinsamen Aktivität.',71:'Praktische Übung der Jugendfeuerwehr.',72:'Die gemeinsame Jugendfeuerwehr am neuen Standort.',74:'Die Minifeuerwehr bei einem ihrer ersten Treffen.',75:'Die Minifeuerwehr entdeckt ihr neues Umfeld.'
  };
  const galleries = {
    geschichte:{title:'Feuerwehr der Vergangenheit',photos:[0,1,2,3,4,9]},
    weg:{title:'Unser gemeinsamer Weg',photos:[10,12,13,14,15,18,19,20,21,66]},
    bau:{title:'Bauphase und Einzug',photos:[29,27,28,30,32,33,22,24,26,65]},
    freitag:{title:'Freitag · Kommers und Jubiläen',photos:[34,35,36,37,38,39,40,41]},
    samstag:{title:'Samstag · Gemeinsam feiern',photos:[42,44,45,47,49]},
    sonntag:{title:'Sonntag · Einweihung und Blaulicht-Erlebnistag',photos:[51,54,56,58,60,63,67,68,69]},
    nachwuchs:{title:'Unsere nächste Generation',photos:[72,70,71,67,68,69,74,75]}
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

  let unit='lehnheim';
  function statMarkup(key){
    const metric=data.metrics[key];
    const ceiling=Math.ceil(Math.max(...metric.values)*1.15/5)*5;
    return `<h3 class="stat-title">${escape(metric.label)}</h3><p class="chart-unit">Lehnheim · ${escape(metric.unit)}</p><div class="bar-chart" role="img" aria-label="${escape(metric.label)} in Lehnheim: ${metric.values.map((v,i)=>`${data.units.lehnheim.years[i]}: ${v}`).join('; ')}. Alle Balken beginnen bei null."><span class="chart-zero">0</span>${metric.values.map((value,i)=>`<div class="bar-column"><div class="bar" style="height:${value/ceiling*100}%"><span class="bar-number">${value}</span></div><span class="bar-year">${data.units.lehnheim.years[i]}</span></div>`).join('')}</div>`;
  }
  function renderTable(){
    const rows=[...Object.values(data.metrics),...data.additional];
    $('#data-table tbody').innerHTML=rows.map(m=>`<tr><th scope="row">${escape(m.label)}<small style="display:block;color:#65686b;font-size:11px">${escape(m.source)}</small></th>${m.values.map(v=>`<td>${v===null?'<span aria-label="Nicht belegt">—</span>':v}</td>`).join('')}</tr>`).join('');
    $('#table-source').innerHTML='Quellen: Lehnheim, jeweils „5 Personelles“, „2 Ausbildung“, „3 Einsätze“ und „4 Lehrgänge“ der Jahre 2022–2025. Für 2022 DOCX; 2023–2025 jeweils PDF, S. 1 (Lehrgänge: S. 2). Jugend: „2023_24 Jahresbericht der Jugendfeuerwehr.docx“, Berichtsjahr 2023. Striche bedeuten „nicht belegt“.<br><br><strong>Atemschutz-Stichtage:</strong> 2022/2023 jeweils 31. Dezember; 2024 zum Berichtsdatum 25. Januar 2025; 2025 ohne ausdrücklich genannten Status-Stichtag. „Status Grün“ folgt der Formulierung der Berichte. Jugendtermine umfassen Übungen und Ausflüge. Die Teilnehmer-Bezugsgruppe ist vor einem Vergleich zu bestätigen.';
  }
  function renderStats(){
    const pending=unit!=='lehnheim';
    $('.metric-controls').hidden=pending;
    $('.data-details').hidden=pending;
    if(pending){
      const middle=unit==='mitte';
      $('#stat-visual').innerHTML=`<div class="empty-stats"><p class="eyebrow">${escape(data.units[unit].period)}</p><h3>${middle?'Der aktuelle Stand des Löschzugs folgt.':'Die Stangenröder Vergleichszahlen folgen.'}</h3><p>${middle?'Hier ergänzen wir den angekündigten Export für Oktober 2026 mit genauem Stichtag. Personalstände und Aktivitäten im bisherigen Kalenderjahr werden getrennt ausgewiesen.':'Hier ergänzen wir die historischen Jahreswerte aus Stangenrod. Erst mit beiden Ortswehren lässt sich die frühere gemeinsame Personalstärke nachvollziehbar darstellen.'}</p><div class="placeholder-metrics"><div><strong>—</strong><span>Aktive</span><small>Daten folgen</small></div><div><strong>—</strong><span>Ausbildung und Beteiligung</span><small>Daten folgen</small></div><div><strong>—</strong><span>Einsätze und Nachwuchs</span><small>Daten folgen</small></div></div></div>`;
      $('#data-context').textContent='Es werden keine Werte geschätzt. Fehlende Angaben bedeuten nicht, dass keine Personen oder Aktivitäten vorhanden waren.';
    } else {
      const key=$('#metric').value;
      $('#stat-visual').innerHTML=statMarkup(key);
      $('#data-context').textContent=data.metrics[key].note;
    }
    $('#statistics-panel').setAttribute('aria-labelledby',`tab-${unit}`);
  }
  function activateUnit(button){unit=button.dataset.unit;$$('[data-unit]').forEach(b=>{b.setAttribute('aria-selected',String(b===button));b.tabIndex=b===button?0:-1;});renderStats();}
  $$('[data-unit]').forEach(button=>{
    button.addEventListener('click',()=>activateUnit(button));
    button.addEventListener('keydown',e=>{const tabs=$$('[data-unit]');let i=tabs.indexOf(button);if(e.key==='ArrowRight')i=(i+1)%tabs.length;else if(e.key==='ArrowLeft')i=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')i=0;else if(e.key==='End')i=tabs.length-1;else return;e.preventDefault();tabs[i].focus();activateUnit(tabs[i]);});
  });
  $('#metric').addEventListener('change',renderStats);
  renderTable();renderStats();

  const slides=[
    {tag:'Unser Beitrag · Lehnheim und Stangenrod',title:'Zwei Wehren.<br>Ein Standort.',description:'Eine gemeinsame Zukunft für den Brandschutz in unseren Orten.',photo:65},
    {tag:'Feuerwehr der Vergangenheit',title:'Zukunft braucht<br>eine Geschichte.',description:'1935: Stangenrod.<br>1951: Lehnheim.<br>Generationen, die Verantwortung übernehmen.',photo:0,link:'https://youtu.be/lsIuLxd_YvE',linkText:'Chronik auf YouTube'},
    {tag:'Warum Veränderung nötig war',title:'Gemeinsame Aufgaben.<br>Neue Möglichkeiten.',description:'Beengte Gerätehäuser. Wachsende Anforderungen. Der Wunsch, Personal, Technik und Ausbildung zu bündeln.',photo:9},
    {tag:'Unser Weg',title:'Vier Jahre<br>gemeinsam geübt.',description:'„In dem Moment, als unsere beiden Wehren endgültig zu einer Einsatzabteilung wurden, hatten wir bereits vier Jahre komplett gemeinsam geübt.“',photo:19,source:'Stephan Hahn · Rede Sonntag, S. 3'},
    {tag:'Das gemeinsame Zuhause',title:'Aus einem Plan<br>wird unser Haus.',description:'Spatenstich 2023 · Richtfest 2024<br>Einzug am 21. März 2026',photo:29,link:'https://youtu.be/0JslBPGW3Is',linkText:'Bauzeitraffer auf YouTube'},
    {tag:'Lehnheim · Jahresberichte 2022–2025',title:'Die Menschen<br>hinter den Zahlen.',description:'Aktive zum Jahresende: 25, 25, 24, 26.<br>Stangenrod und LZ Mitte Oktober 2026 werden ergänzt.',type:'stats',source:'Lehnheim, Personalberichte 2022–2025. Kein vollständiger Vorher-nachher-Vergleich des Zusammenschlusses.'},
    {tag:'21.–23. August 2026',title:'Gemeinsam gewachsen.<br>Gemeinsam feiern.',description:'Beide Orte erleben ihre gemeinsame Feuerwehr. Das Fest wird zum öffentlichen Abschluss unseres Projekts.',photo:58},
    {tag:'Die Arbeit hinter dem Fest',title:'„Die vielen Stunden<br>Arbeit, die<br>dahinterstecken.“',description:'„Was man dabei nicht sofort sieht, sind die vielen Stunden Arbeit, die dahinterstecken.“',photo:36,source:'Stephan Hahn · Rede Freitag. Titel: gekürzter Auszug.'},
    {tag:'Der Blick nach vorn',title:'„Wir wollen eine<br>Feuerwehr für<br>morgen aufstellen.“',description:'Gemeinsame Jugendfeuerwehr.<br>Minifeuerwehr gegründet.<br>Unser Weg geht weiter.',photo:69,source:'Stephan Hahn · Rede Sonntag, S. 4'}
  ];
  let slideIndex=0;
  const present=$('#presentation');
  function renderSlide(){
    const s=slides[slideIndex];
    const media=s.type==='stats'?`<div class="slide-stats" role="img" aria-label="Aktive Lehnheim: 2022 25; 2023 25; 2024 24; 2025 26">${data.metrics.active.values.map((v,i)=>`<div class="slide-stat" style="height:${v/30*100}%"><strong>${v}</strong><span>${data.units.lehnheim.years[i]}</span></div>`).join('')}</div>`:`<img src="${image(s.photo)}" alt="${escape(photoCaptions[s.photo]||'Unser Projekt')}">`;
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
  function preparePrint(){if(printState)return;printState={unit,metric:$('#metric').value,details:$$('details').map(d=>d.open)};activateUnit($('#tab-lehnheim'));$('#metric').value='active';renderStats();$$('details').forEach(d=>d.open=true);}
  function restorePrint(){if(!printState)return;const old=printState;printState=null;activateUnit($(`#tab-${old.unit}`));$('#metric').value=old.metric;renderStats();$$('details').forEach((d,i)=>d.open=old.details[i]);}
  $('#print-report').addEventListener('click',()=>{preparePrint();window.print();});
  window.addEventListener('beforeprint',preparePrint);window.addEventListener('afterprint',restorePrint);
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){$$('.desktop-nav a').forEach(a=>{const active=a.hash===`#${entry.target.id}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -65% 0px'});$$('.chapter').forEach(section=>observer.observe(section));}
})();
