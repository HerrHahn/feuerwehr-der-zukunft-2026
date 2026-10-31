(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const data = window.FDZ_DATA;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const image = id => `foto-${String(id).padStart(2, '0')}.webp`;
  const photoCaptions = {
    0:'Historischer Festzug der Feuerwehr Lehnheim vor dem damaligen Gerätehaus.',1:'Eigenleistung beim Umbau des alten Lehnheimer Gerätehauses.',2:'Arbeiten am Treppenbereich des alten Lehnheimer Gerätehauses.',3:'Tag der offenen Tür in Lehnheim, 2007.',4:'Historische Übung der Feuerwehr Lehnheim.',9:'Frühere räumliche Bedingungen in Stangenrod.',10:'Gemeinsame Dienstversammlung in der Gallushalle, November 2020.',12:'Im Gespräch über den gemeinsamen Weg: Dienstversammlung in der Gallushalle.',13:'Chancen und Bedenken auf Flipcharts: Beteiligung der Mannschaften.',14:'Gemeinsame Ausbildung vor dem Zusammenschluss.',15:'Gemeinsame praktische Ausbildung mit den Fahrzeugen beider Wehren.',16:'Zusammenarbeit im Feuerwehrdienst vor der Neugründung.',18:'Praktische Ausbildung im Mai 2025.',19:'Gemeinsame Übung im Mai 2025.',20:'Gemeinsame Verantwortung bei der Gründung des Löschzugs 2026.',21:'Die Gründungsversammlung des Löschzugs Grünberg-Mitte im Februar 2026.',22:'Der Blaulichtkorso zum Einzug führt durch beide Orte.',24:'Auf dem Weg zum gemeinsamen Standort.',26:'Ein gemeinsamer Standort für Mannschaft und Fahrzeuge.',27:'Das neue Feuerwehrhaus während der Bauphase 2024.',28:'Ein Blick in den Rohbau.',29:'Der Rohbau mit Kran und Gerüst.',30:'Die Räume des künftigen Feuerwehrhauses entstehen.',32:'Innenausbau im neuen Feuerwehrhaus.',33:'Der spätere gemeinsame Ausbildungsbereich im Ausbau.',34:'Vorbereitet für ein gemeinsames Festwochenende.',35:'Der Kommers am Freitag: beide Orte feiern gemeinsam.',36:'Begegnungen beim Kommers im Festzelt.',37:'Der Kommers bietet Raum für Grußworte und Erinnerungen.',38:'Musik und Publikum beim Kommers.',39:'Gesangverein Concordia Stangenrod',40:'Gäste im Festzelt beim Kommers.',41:'Bühnenprogramm am Freitagabend.',42:'Samstagabend: Musik und Begegnung im Festzelt.',44:'Die Kinzenbacher auf der Bühne am Samstag.',45:'Gemeinsam feiern am Samstagabend.',47:'Livemusik beim Festwochenende.',49:'Blick auf die Bühne am Samstagabend.',51:'Offizielle Einweihung am Sonntag, 23. August 2026.',54:'Das neue Gerätehaus wird zum Treffpunkt.',56:'Angebote für Familien beim Blaulicht-Erlebnistag.',58:'Begegnungen vor dem gemeinsamen Feuerwehrhaus am Sonntag.',60:'Historische Feuerwehrtechnik vor dem neuen Haus.',63:'Fahrzeugausstellung beim Blaulicht-Erlebnistag.',65:'Die Mannschaft und Jugendfeuerwehr vor ihrem gemeinsamen Zuhause.',66:'Gemeinsame Ausbildung im neuen Feuerwehrhaus.',67:'Die Gründung der Minifeuerwehr beim Festwochenende.',68:'Kinder und Betreuende bei der Gründung der Minifeuerwehr.',69:'Ein Anfang für die nächste Generation: Gründung der Minifeuerwehr.',70:'Jugendfeuerwehr bei einer gemeinsamen Aktivität.',71:'Praktische Übung der Jugendfeuerwehr.',72:'Die gemeinsame Jugendfeuerwehr am neuen Standort.',74:'Die Minifeuerwehr bei einem ihrer ersten Treffen.',75:'Die Minifeuerwehr entdeckt ihr neues Umfeld.',77:'Planung des neuen Feuerwehrhauses: Perspektive auf den Alarmhof. Planstand Mai 2023, Architektenkontor Faller + Krück Works GmbH.',78:'Planung des neuen Feuerwehrhauses: Perspektive Südost. Planstand Mai 2023, Architektenkontor Faller + Krück Works GmbH.',79:'Grundriss des gemeinsamen Feuerwehrhauses. Planungsunterlage von Faller + Krück Works GmbH.',80:'Nachwuchsarbeit im neuen Feuerwehrhaus: gemeinsam kreativ werden.',81:'Das bisherige Gerätehaus in Lehnheim.',82:'Das bisherige Gerätehaus in Stangenrod.'
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
      const cards=['active','groupLeaders','respiratory','respiratoryFit','alarms','youth','children','exercises','attendance'];
      $('#stat-visual').innerHTML=`<h3 class="stat-title">Der Löschzug heute</h3><p class="chart-unit">Stand Oktober 2026 · Übungsdaten als Teilstand</p><div class="current-stats">${cards.map(key=>{const m=u.metrics[key];const detail=key==='groupLeaders'?'davon 6 auch Zugführer':key==='exercises'?'nur die zwei dokumentierten Termine':key==='attendance'?'24 und 20 Teilnehmende · zwei Termine':key==='respiratoryFit'?'von 20 Atemschutzgeräteträgern':m.unit;return `<div><strong>${number(m.values[0])}</strong><span>${escape(m.label)}</span><small>${escape(detail)}</small></div>`;}).join('')}</div>`;
      $('#data-context').textContent=u.note;
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
    {tag:'Unser Beitrag · Lehnheim und Stangenrod',title:'Zwei Wehren.<br>Ein Standort.',description:'Gemeinsam organisiert. Gemeinsam ausgebildet. Für beide Orte da.',photo:65},
    {tag:'Unser Projektergebnis',title:'Eine Feuerwehr.<br>Gemeinsame<br>Verantwortung.',description:'46 Aktive und eine gemeinsame Führung.<br>Mannschaft und Technik an einem Standort.<br>21 Jugendliche und 18 Kinder.',photo:65},
    {tag:'Feuerwehr der Vergangenheit',title:'Zukunft braucht<br>eine Geschichte.',description:'1935: Stangenrod.<br>1951: Lehnheim.<br>Generationen, die Verantwortung übernehmen.',photo:0,link:'https://youtu.be/lsIuLxd_YvE',linkText:'Chronik auf YouTube'},
    {tag:'Warum Veränderung nötig war',title:'Gemeinsame Aufgaben.<br>Neue Möglichkeiten.',description:'Beengte Gerätehäuser. Wachsende Anforderungen. Wenige Arbeitsplätze vor Ort. Ein breiter gemeinsamer Personalpool.',photo:81},
    {tag:'Unser Weg',title:'Zuhören.<br>Gemeinsam üben.<br>Zusammenfinden.',description:'Bedenken ernst nehmen und extern moderieren.<br>Vier Jahre gemeinsame Ausbildung vor der Gründung.<br>Beide Orte gestalten den Neuanfang.',photo:13},
    {tag:'Das gemeinsame Zuhause',title:'Ein neuer Ort.<br>Für beide Orte.',description:'Relativ mittig und für beide gut erreichbar.<br>Seit März 2026 gemeinsamer Standort.<br>Praktische Jugendübungen werden auch im Winter möglich.',photo:77,link:'https://youtu.be/0JslBPGW3Is',linkText:'Bauzeitraffer auf YouTube'},
    {tag:'Personal und Führung gebündelt',title:'46 Aktive.<br>14 Gruppenführer.',description:'Davon 6 auch Zugführer.<br>Ein gemeinsamer Personalpool verbreitert die Möglichkeiten, Mannschaft und Führung zu besetzen.',photo:66,source:'Statistik des LZ Mitte · Oktober 2026. Qualifikationsbestand, keine gleichzeitige Verfügbarkeit.'},
    {tag:'Sichtbarkeit schafft Verantwortung',title:'„Und diese Verantwortung<br>nehmen wir hier beim<br>Löschzug Mitte an.“',description:'Presse, Festschrift und Fest machen die neue Einheit sichtbar. Den wachsenden Erwartungen stellen wir uns im gemeinsamen Dienst.',photo:65,source:'Stephan Hahn · Rede Sonntag, S. 2. Wörtliches Zitat.'},
    {tag:'21.–23. August 2026 · Projektabschluss',title:'Geschichte würdigen.<br>Gemeinschaft erleben.<br>Zukunft eröffnen.',description:'Freitag: Kommers und beide Jubiläen.<br>Samstag: Begegnung und gemeinsames Feiern.<br>Sonntag: Einweihung und Gründung der Minifeuerwehr.',photo:58},
    {tag:'Die Menschen hinter dem Fest',title:'„Dafür braucht es<br>Menschen.<br>Und die haben wir.“',description:'„Viele von uns haben dafür Abende und Wochenenden investiert, zusätzlich zu Beruf, Familie und unserem ganz normalen Feuerwehrdienst.“',photo:36,source:'Stephan Hahn · Titel: Rede Sonntag, S. 3; Zitat: Rede Freitag.'},
    {tag:'Nachwuchs wächst',title:'21 Jugendliche.<br>18 Kinder.',description:'Jugendfeuerwehr: fünf mehr als vor dem Zusammenschluss.<br>Minifeuerwehr: seit August 2026.<br>Neue Räume eröffnen neue Ausbildungsmöglichkeiten.',photo:72,source:'Statistik des LZ Mitte · bestätigt am 27.–29.10.2026.'},
    {tag:'Was andere mitnehmen können',title:'Unser Weg.<br>Euer nächster Schritt.',description:'Vier Arbeitsblätter zum Mitnehmen:<br>Beteiligung · Ausbildung · Standort · öffentlicher Abschluss.',photo:13,link:'leitfaden-zusammenwachsen.pdf',linkText:'Leitfaden öffnen'},
    {tag:'Der Blick nach vorn',title:'„Wir wollen eine<br>Feuerwehr für<br>morgen aufstellen.“',description:'Der Zusammenschluss ist umgesetzt.<br>Die nächste Generation wächst.<br>Die gemeinsame Verantwortung bleibt.',photo:69,source:'Stephan Hahn · Rede Sonntag, S. 4'}
  ];
  let slideIndex=0;
  const present=$('#presentation');
  function renderSlide(){
    const s=slides[slideIndex];
    const media=s.type==='stats'?`<div class="slide-stats" role="img" aria-label="Aktive beider Wehren zusammen: 2022 42; 2023 45; 2024 41; 2025 43; Oktober 2026 46">${data.units.gesamt.metrics.active.values.map((v,i)=>`<div class="slide-stat" style="height:${v/50*100}%"><strong>${v}</strong><span>${data.units.gesamt.years[i]}</span></div>`).join('')}</div>`:`<img src="${image(s.photo)}" alt="${escape(photoCaptions[s.photo]||'Unser Projekt')}">`;
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
