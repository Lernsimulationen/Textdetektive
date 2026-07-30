/* Classroom Buzzer: browser-only Supabase client and local QR encoder. */
(() => {
  const URL = 'https://vshsluoxhusnyzpszsbm.supabase.co';
  const KEY = 'sb_publishable_i8fEatnRvmPXXnrtoKN4FQ_QHYMe9z3';
  const app = document.getElementById('app');
  const colors = ['#5b43ef', '#e7476d', '#008d98', '#e48800', '#4c8d2b', '#b63caa'];
  const names = ['Tiger', 'Orcas', 'Kometen', 'Eulen', 'Roboter', 'Vulkane', 'Phönix', 'Saturn'];
  let state = null;
  let view = location.hash.startsWith('#student') ? 'student' : 'teacher';
  let me = sessionStorage.getItem('buzzer-participant') || '';
  let timer;

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' }[c]));
  async function api(table, method = 'GET', query = '', body) {
    const response = await fetch(`${URL}/rest/v1/${table}${query ? `?${query}` : ''}`, {
      method, headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', Prefer: 'return=representation' }, body: body ? JSON.stringify(body) : undefined
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) throw new Error(data?.message || 'Supabase-Verbindung fehlgeschlagen.');
    return data;
  }
  async function load(id) {
    const [session, participants, responses] = await Promise.all([
      api('sessions', 'GET', `id=eq.${id}&select=*`), api('participants', 'GET', `session_id=eq.${id}&select=*&order=created_at`), api('responses', 'GET', `session_id=eq.${id}&select=*&order=created_at`)
    ]);
    if (!session[0]) { state = null; return; }
    const s = session[0], settings = s.settings || {};
    const roundStart = settings.roundStartedAt ? Date.parse(settings.roundStartedAt) : 0;
    state = { id:s.id, code:s.code, active:s.active, mode:s.mode, group:s.group_mode, settings, participants:participants.map(p => ({id:p.id,name:p.display_name,color:p.color})), responses:responses.filter(r => Date.parse(r.created_at) >= roundStart).map(r => ({id:r.participant_id,value:r.value,at:r.created_at})) };
  }
  async function loadCode(code) {
    const rows = await api('sessions', 'GET', `code=eq.${encodeURIComponent(code.toUpperCase())}&select=*`);
    if (!rows[0]) throw new Error('Sitzung nicht gefunden oder abgelaufen.');
    await load(rows[0].id);
  }
  async function create() {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    const rows = await api('sessions', 'POST', '', { code });
    await load(rows[0].id);
  }
  async function update(changes) { await api('sessions', 'PATCH', `id=eq.${state.id}`, changes); await load(state.id); }
  function startPolling() { clearInterval(timer); timer = setInterval(async () => { if (!state) return; const joining = view === 'student' && !state.participants.some(p => p.id === me); if (joining) return; try { const before = JSON.stringify(state); await load(state.id); if (JSON.stringify(state) !== before) render(); } catch (_) {} }, 900); }

  function resultChart() {
    const options = state.mode === 'truefalse' ? ['Richtig', 'Falsch'] : state.mode === 'poll' ? ['A','B','C','D'] : [];
    if (!options.length) return '';
    const maximum = Math.max(1, ...options.map(o => state.responses.filter(r => r.value === o).length));
    return `<div class="chart">${options.map((o,i) => { const n=state.responses.filter(r => r.value === o).length; return `<div class="bar-row"><b>${o}</b><div class="bar-track"><span style="width:${Math.round(n/maximum*100)}%;--bar:${['#5b43ef','#e7476d','#008d98','#e48800'][i]}"></span></div><strong>${n}</strong></div>`; }).join('')}</div>`;
  }
  function teacher() {
    if (!state) return `<main class="welcome"><div class="brand">● Classroom Buzzer</div><h1>Unterricht.<br>Sofort aktiv.</h1><p>Eine Sitzung erstellen, Code teilen, loslegen.</p><button class="primary" data-action="new">Neue Sitzung erstellen</button></main>`;
    const first = state.responses[0], winner = first && state.participants.find(p => p.id === first.id);
    const rows = state.responses.map((r,i) => { const p = state.participants.find(x => x.id === r.id); return p ? `<li><b>${i+1}</b><span class="dot" style="background:${p.color}"></span>${esc(p.name)} <small>${esc(r.value)}</small></li>` : ''; }).join('') || '<li>Noch keine Antworten</li>';
    const settings = state.settings || {};
    const pollEditor = state.mode === 'poll' ? `<div class="poll-editor"><small>ANTWORTOPTIONEN</small>${(settings.pollOptions || ['A','B','C','D']).map((option, index) => `<input data-poll-option="${index}" maxlength="18" value="${esc(option)}" aria-label="Antwortoption ${index + 1}">`).join('')}</div>` : '';
    return `<main class="dashboard"><header><div class="brand">● Classroom Buzzer <span>Lehrersteuerung</span></div><div class="top-actions"><button class="quiet" data-action="student">Schüleransicht</button><button class="quiet" data-action="fullscreen">Vollbild</button></div></header><section class="campus-banner"><img src="./assets/essen-campus.png" alt="Illustration eines modernen Schulhofs im Ruhrgebiet"><div><small>GESAMTSCHULE · ESSENER NORDEN</small><h2>Gemeinsam aktiv lernen.</h2><p>Kurze Impulse, klare Rückmeldungen, alle im Blick.</p></div></section><section class="hero"><div><small>SITZUNGSCODE</small><h1 class="code">${state.code}</h1><p>${state.participants.length} Teilnehmende · ${state.active ? '<span class="live">● LIVE</span>' : 'Bereit zum Start'}</p></div><div class="qr" id="qr" aria-label="QR-Code"></div><div class="actions"><button class="${state.active ? 'danger':'primary'}" data-action="toggle">${state.active ? 'Sitzung stoppen':'Sitzung starten'}</button><button class="quiet" data-action="round">Neue Runde</button><button class="quiet" data-action="copy">Link kopieren</button></div></section><section class="teacher-grid"><aside class="card teacher-controls"><h2>Rundensteuerung</h2><label>Aktivität<select id="mode"><option value="buzzer">Buzzer</option><option value="truefalse">Richtig / Falsch</option><option value="poll">Umfrage</option><option value="speed">Schnelligkeit</option></select></label><label class="switch"><input id="group" type="checkbox"> Gruppenmodus</label><label class="switch"><input id="multi" type="checkbox"> Mehrfachantworten</label><label>Timer<select id="timer"><option value="0">Kein Timer</option><option value="15">15 Sekunden</option><option value="30">30 Sekunden</option><option value="60">60 Sekunden</option></select></label>${pollEditor}<hr><button class="quiet" data-action="round">↻ Runde zurücksetzen</button><button class="quiet" data-action="export">⇩ Ergebnisse als CSV</button></aside><section class="card results"><div class="result-head"><div><small>LIVE-AUSWERTUNG</small><h2>${state.mode === 'speed' ? 'Reihenfolge' : 'Ergebnisse'}</h2></div><span class="count-pill">${state.responses.length} Antworten</span></div>${winner ? `<div class="winner"><span>${esc(winner.name)}</span><small>${esc(first.value)}</small></div>` : '<div class="result-empty">Die Runde ist bereit. Starte die Sitzung, sobald alle dabei sind.</div>'}${resultChart()}<ol>${rows}</ol></section><aside class="card participants-card"><div class="result-head"><h2>Teilnehmende</h2><span class="count-pill">${state.participants.length}</span></div><div class="participant-list">${state.participants.map(p => `<div class="participant"><span class="dot" style="background:${p.color}"></span>${esc(p.name)}<small>verbunden</small></div>`).join('') || '<p>Noch niemand dabei.</p>'}</div></aside></section></main>`;
  }
  function student() {
    if (!state) return `<main class="student"><div class="brand">● Classroom Buzzer</div><section class="card student-card"><h1>Sitzung beitreten</h1><p>Gib den Sitzungscode ein.</p><input id="code" maxlength="6" placeholder="ABC123"><button class="primary" data-action="load">Sitzung öffnen</button></section></main>`;
    const p = state.participants.find(x => x.id === me);
    if (!p) return `<main class="student"><div class="brand">● Classroom Buzzer</div><section class="card student-card"><small>SITZUNG ${state.code}</small><h1>Willkommen!</h1><p>${state.group ? 'Wähle eine Gruppe.' : 'Gib deine Initialen ein (maximal drei Zeichen).'}</p>${state.group ? `<select id="name">${names.map(n => `<option>${n}</option>`).join('')}</select>` : '<input id="name" maxlength="3" placeholder="MS">'}<button class="primary" data-action="join">Beitreten</button></section></main>`;
    const sent = !state.settings.multipleWinners && state.responses.some(r => r.id === me);
    const controls = state.mode === 'truefalse' ? '<div class="answers"><button class="answer yes" data-answer="Richtig">✓<br><small>Richtig</small></button><button class="answer no" data-answer="Falsch">×<br><small>Falsch</small></button></div>' : state.mode === 'poll' ? `<div class="answers">${(state.settings.pollOptions || ['A','B','C','D']).map(a => `<button class="answer poll" data-answer="${esc(a)}">${esc(a)}</button>`).join('')}</div>` : `<button class="buzzer" data-answer="${state.mode === 'speed' ? 'Bereit':'Buzzer'}" ${!state.active || sent ? 'disabled':''}>${sent ? 'GESENDET':'DRÜCK MICH!'}</button>`;
    return `<main class="student"><div class="student-top"><span class="dot" style="background:${p.color}"></span><b>${esc(p.name)}</b><span>${state.active ? '● Live':'Warte auf Start …'}</span></div><section class="play"><small>${state.mode.toUpperCase()}</small><h1>${state.active ? 'Deine Antwort zählt.':'Gleich geht’s los.'}</h1>${controls}</section></main>`;
  }
  function render() {
    app.innerHTML = view === 'teacher' ? teacher() : student();
    if (state && view === 'teacher') { const mode = document.getElementById('mode'), group = document.getElementById('group'), multi = document.getElementById('multi'), timerSetting = document.getElementById('timer'); mode.value = state.mode; group.checked = state.group; multi.checked = !!state.settings.multipleWinners; timerSetting.value = String(state.settings.timerSeconds || 0); mode.onchange = () => update({mode:mode.value}); group.onchange = () => update({group_mode:group.checked}); multi.onchange = () => update({settings:{...state.settings,multipleWinners:multi.checked}}); timerSetting.onchange = () => update({settings:{...state.settings,timerSeconds:Number(timerSetting.value)}}); document.querySelectorAll('[data-poll-option]').forEach(input => input.onchange = () => { const options = [...document.querySelectorAll('[data-poll-option]')].map(field => field.value.trim() || '–'); update({settings:{...state.settings,pollOptions:options}}); }); const qr = document.getElementById('qr'); if (qr) void showQr(qr, `${location.href.split('#')[0]}#student?code=${state.code}`); }
    document.querySelectorAll('[data-action]').forEach(el => el.onclick = () => act(el.dataset.action));
    document.querySelectorAll('[data-answer]').forEach(el => el.onclick = () => answer(el.dataset.answer));
  }
  async function act(action) { try {
    if (action === 'new') await create();
    else if (action === 'toggle') await update({active:!state.active});
    else if (action === 'round') await update({active:false,settings:{...state.settings,roundStartedAt:new Date().toISOString()}});
    else if (action === 'student') { view = 'student'; location.hash = `student?code=${state.code}`; }
    else if (action === 'load') await loadCode(document.getElementById('code').value);
    else if (action === 'join') { const name = document.getElementById('name').value.trim().toUpperCase(); if (!name) return; const rows = await api('participants','POST','',{session_id:state.id,display_name:name,color:colors[state.participants.length % colors.length]}); me = rows[0].id; sessionStorage.setItem('buzzer-participant',me); await load(state.id); }
    else if (action === 'copy') { await navigator.clipboard.writeText(`${location.href.split('#')[0]}#student?code=${state.code}`); alert('Einladungslink kopiert.'); }
    else if (action === 'export') { const lines = [['Platz','Name','Antwort','Zeit'], ...state.responses.map((response,index) => { const participant = state.participants.find(p => p.id === response.id); return [index + 1, participant?.name || 'Unbekannt', response.value, new Date(response.at).toLocaleTimeString('de-DE')]; })]; const csv = lines.map(line => line.map(value => `"${String(value).replaceAll('"','""')}"`).join(';')).join('\n'); const link = document.createElement('a'); link.href = window.URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8'})); link.download = `classroom-buzzer-${state.code}.csv`; link.click(); window.URL.revokeObjectURL(link.href); }
    else if (action === 'fullscreen') await document.documentElement.requestFullscreen?.();
    render();
  } catch (error) { alert(error.message || 'Verbindung fehlgeschlagen.'); } }
  async function answer(value) { if (!state?.active || !me || (!state.settings.multipleWinners && state.responses.some(r => r.id === me))) return; try { navigator.vibrate?.(35); await api('responses','POST','',{session_id:state.id,participant_id:me,value}); await load(state.id); render(); } catch (error) { alert(error.message || 'Antwort konnte nicht gesendet werden.'); } }

  async function showQr(element, text) {
    try { element.innerHTML = await QRCode.toString(text, { type: 'svg', errorCorrectionLevel: 'M', margin: 1 }); }
    catch (_) { element.textContent = 'QR-Code nicht verfügbar'; }
  }

  // Fallback-Encoder ohne externe Dienste, falls die lokale Bibliothek nicht geladen wird.
  function qrSvg(text) { const bytes = new TextEncoder().encode(text); if (bytes.length > 134) return '<small>Link ist zu lang – bitte Link kopieren.</small>'; const size=41, m=Array.from({length:size},()=>Array(size).fill(null)); const set=(r,c,v)=>{if(r>=0&&r<size&&c>=0&&c<size)m[r][c]=v}; const finder=(r,c)=>{for(let y=-1;y<=7;y++)for(let x=-1;x<=7;x++)set(r+y,c+x,x>=0&&x<=6&&y>=0&&y<=6&&(x===0||x===6||y===0||y===6||(x>=2&&x<=4&&y>=2&&y<=4)))}; finder(0,0);finder(size-7,0);finder(0,size-7); for(let i=8;i<size-8;i++){set(6,i,i%2===0);set(i,6,i%2===0)} for(let y=-2;y<=2;y++)for(let x=-2;x<=2;x++)set(34+y,34+x,Math.max(Math.abs(x),Math.abs(y))!==1); const fmt=0x77c4; for(let i=0;i<15;i++){const b=((fmt>>i)&1)===1;if(i<6)set(i,8,b);else if(i<8)set(i+1,8,b);else set(size-15+i,8,b);if(i<8)set(8,size-i-1,b);else if(i<9)set(8,15-i,b);else set(8,14-i,b)} set(size-8,8,true);
    const bits=[0,1,0,0,...Array.from({length:8},(_,i)=>(bytes.length>>(7-i))&1),...Array.from(bytes).flatMap(b=>Array.from({length:8},(_,i)=>(b>>(7-i))&1))]; while(bits.length%8)bits.push(0); const dat=[];for(let i=0;i<bits.length;i+=8)dat.push(bits.slice(i,i+8).reduce((a,b)=>a*2+b,0)); while(dat.length<136)dat.push(dat.length%2?0x11:0xec); const exp=[],log=[];let x=1;for(let i=0;i<255;i++){exp[i]=x;log[x]=i;x<<=1;if(x&256)x^=0x11d}for(let i=255;i<512;i++)exp[i]=exp[i-255];const mul=(a,b)=>a&&b?exp[log[a]+log[b]]:0;let gen=[1];for(let i=0;i<18;i++){const next=Array(gen.length+1).fill(0);gen.forEach((v,j)=>{next[j]^=v;next[j+1]^=mul(v,exp[i])});gen=next}const ecc=block=>{const r=Array(18).fill(0);block.forEach(v=>{const f=v^r.shift();r.push(0);gen.slice(1).forEach((g,i)=>r[i]^=mul(g,f))});return r};const a=dat.slice(0,68),b=dat.slice(68);const ea=ecc(a),eb=ecc(b),code=[];for(let i=0;i<68;i++)code.push(a[i],b[i]);for(let i=0;i<18;i++)code.push(ea[i],eb[i]);let k=0,row=size-1,dir=-1;for(let col=size-1;col>0;col-=2){if(col===6)col--;for(;;){for(let j=0;j<2;j++)if(m[row][col-j]===null){let bit=k<code.length*8?((code[k>>3]>>(7-(k&7)))&1):0;k++;if((row+col-j)%2===0)bit^=1;set(row,col-j,!!bit)}row+=dir;if(row<0||row>=size){row-=dir;dir=-dir;break}}}let out=`<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="QR-Code">`;for(let r=0;r<size;r++)for(let c=0;c<size;c++)if(m[r][c])out+=`<path d="M${c} ${r}h1v1h-1z"/>`;return out+'</svg>'; }

  const hashCode = new URLSearchParams(location.hash.split('?')[1] || '').get('code');
  if (hashCode) loadCode(hashCode).then(() => { startPolling(); render(); }).catch(() => render()); else { startPolling(); render(); }
})();
