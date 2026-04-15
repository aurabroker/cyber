/* ===================================================
   AURA CONSULTING · CYBER PAGE · app.js
   =================================================== */

/* ─── GRID BACKGROUND ─────────────────────────────── */
(function initGrid() {
  const cv = document.getElementById('grid-canvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');

  function resize() {
    cv.width  = window.innerWidth;
    cv.height = document.body.scrollHeight;
  }

  function draw() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.strokeStyle = 'rgba(26,143,206,0.07)';
    ctx.lineWidth   = 0.5;
    const sz = 64;
    for (let x = 0; x < cv.width;  x += sz) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x, cv.height); ctx.stroke(); }
    for (let y = 0; y < cv.height; y += sz) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(cv.width, y);   ctx.stroke(); }
  }

  resize(); draw();
  window.addEventListener('resize', () => { resize(); draw(); });
})();


/* ─── ATTACK COUNTER ──────────────────────────────── */
(function initCounter() {
  const el = document.getElementById('attack-main');
  if (!el) return;

  const now     = new Date();
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const elapsed  = Math.floor((now - dayStart) / 1000);
  const rate     = 1.85; // attacks/sec estimate (global)
  let count      = Math.floor(elapsed * rate);

  function fmt(n) { return n.toLocaleString('pl-PL'); }
  el.textContent = fmt(count);

  setInterval(() => {
    count += Math.floor(Math.random() * 3) + 1;
    el.textContent = fmt(count);
  }, 900);
})();


/* ─── SPLIT-FLAP CLOCKS ───────────────────────────── */
(function initClocks() {
  const ZONES = [
    {
      id: 'tok', tz: 'Asia/Tokyo',
      alerts: ['RANSOMWARE · 14 ATAKÓW/H', 'APT41 · AKTYWNOŚĆ', 'PHISHING · SEKTOR BANK', 'BOTNET · AKTYWNY'],
      ok: false,
    },
    {
      id: 'lon', tz: 'Europe/London',
      alerts: ['LLOYD\'S · OCHRONA AKTYWNA', 'CFC UNDERWRITING · UP', 'CYBER PATROL · NOMINAL', 'REINSURANCE · ONLINE'],
      ok: true,
    },
    {
      id: 'nyc', tz: 'America/New_York',
      alerts: ['RANSOMHUB · 8 KAMPANII', 'FIN7 · SEKTOR RETAIL', 'BEC FRAUD · $2.1M/DOBĘ', 'DARKNET · AUKCJE DANYCH'],
      ok: false,
    },
    {
      id: 'waw', tz: 'Europe/Warsaw',
      alerts: ['CERT.PL · ALERT POZIOM 2', 'AURA SHIELD · AKTYWNA', 'NIS2 · COMPLIANCE OK', 'UODO · MONITORING ON'],
      ok: true,
    },
  ];

  const alertIdx = {};
  ZONES.forEach(z => alertIdx[z.id] = 0);

  function pad2(n) { return String(n).padStart(2, '0'); }

  function setFlap(id, ch) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.textContent !== ch) {
      el.textContent = ch;
      el.classList.remove('flip');
      void el.offsetWidth;
      el.classList.add('flip');
    }
  }

  function updateZone(z) {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: z.tz, hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(new Date());

    const tp = {};
    parts.forEach(p => tp[p.type] = p.value);
    const h = pad2(parseInt(tp.hour   || '0'));
    const m = pad2(parseInt(tp.minute || '0'));

    setFlap(z.id + '-h0', h[0]);
    setFlap(z.id + '-h1', h[1]);
    setFlap(z.id + '-m0', m[0]);
    setFlap(z.id + '-m1', m[1]);

    const dateStr = new Intl.DateTimeFormat('en-GB', {
      timeZone: z.tz, weekday: 'short', day: '2-digit', month: 'short'
    }).format(new Date()).toUpperCase();

    const dEl = document.getElementById(z.id + '-date');
    if (dEl) dEl.textContent = dateStr;
  }

  function rotateAlert(z) {
    const el = document.getElementById(z.id + '-alert');
    if (!el) return;
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = z.alerts[alertIdx[z.id]];
      el.style.opacity = '1';
    }, 250);
    alertIdx[z.id] = (alertIdx[z.id] + 1) % z.alerts.length;
  }

  ZONES.forEach(z => { updateZone(z); rotateAlert(z); });
  setInterval(() => ZONES.forEach(updateZone), 10000);
  setInterval(() => ZONES.forEach(rotateAlert), 4500);
})();


/* ─── TICKER ──────────────────────────────────────── */
(function initTicker() {
  const el = document.getElementById('ticker');
  if (!el) return;

  const items = [
    { red: true,  text: 'RANSOMWARE · Atak na sieć szpitala · Niemcy · 3 tygodnie przestoju' },
    { red: false, text: 'PHISHING · Utrata 2,1M EUR · Firma logistyczna · Polska · 2024' },
    { red: true,  text: 'DATA BREACH · 430 000 rekordów klientów · Retailer · Czechy' },
    { red: false, text: 'BEC FRAUD · CEO Scam · Straty 890K PLN · Warszawa · Q3 2024' },
    { red: true,  text: 'SUPPLY CHAIN · Kompromitacja SaaS · 140 firm dotkniętych jednocześnie' },
    { red: false, text: 'DDoS · 48h przestoju · E-commerce · Polska · Black Friday 2023' },
    { red: true,  text: 'RANSOMWARE · Kancelaria prawna · 3TB zaszyfrowanych danych klientów' },
    { red: false, text: 'INSIDER THREAT · Wyciek bazy klientów · Sektor finansowy · Kraków' },
    { red: true,  text: 'CRYPTOJACKING · Infrastruktura chmurowa · 220K EUR strat energetycznych' },
    { red: false, text: 'KARA RODO · UODO · 1,1M PLN nałożone na administratora danych' },
    { red: true,  text: 'APT41 · Atak na infrastrukturę krytyczną · Europa Środkowa · 2024' },
    { red: false, text: 'NIS2 · Nowe wymogi bezpieczeństwa · Deadline implementacji: Oct 2024' },
  ];

  const doubled = [...items, ...items];
  el.innerHTML = doubled.map(it =>
    `<span class="ticker-item"><span class="ticker-dot${it.red ? ' red' : ''}"></span>${it.text}</span>`
  ).join('');
})();


/* ─── THREAT MAP ──────────────────────────────────── */
(function initThreatMap() {
  const cv = document.getElementById('threat-canvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');

  // Responsive canvas sizing
  function resizeCanvas() {
    const wrap = cv.parentElement;
    const W = wrap.clientWidth;
    const H = Math.max(360, Math.round(W * 0.48));
    cv.width  = W;
    cv.height = H;
    return { W, H };
  }

  let dim = resizeCanvas();
  window.addEventListener('resize', () => {
    dim = resizeCanvas();
    buildCityPositions();
  });

  // ── WORLD MAP DATA (simplified Mercator polygons) ──
  // Coordinates: [lon, lat] → mapped to canvas
  const LAND_POLYS = [
    // North America
    [[  -168, 71],[-140,70],[-132,56],[-124,49],[-94,49],[-83,46],[-76,44],[-66,45],[-65,43],[-70,41],[-75,35],[-80,25],[-85,21],[-91,16],[-87,15],[-83,10],[-77,8],[-77,7],[-80,25],[-90,20],[-95,19],[-97,22],[-105,23],[-110,24],[-117,32],[-120,34],[-124,37],[-124,49],[-130,55],[-140,60],[-155,60],[-165,61],[-168,71]],
    // Greenland
    [[-45,83],[-20,83],[-18,77],[-25,70],[-44,65],[-52,67],[-55,76],[-45,83]],
    // South America
    [[-82,8],[-78,8],[-75,10],[-63,12],[-60,8],[-52,5],[-50,1],[-50,-5],[-40,-15],[-38,-10],[-35,-8],[-35,-12],[-40,-20],[-45,-23],[-49,-26],[-53,-33],[-58,-38],[-62,-42],[-65,-46],[-66,-52],[-70,-55],[-73,-52],[-72,-46],[-70,-40],[-72,-35],[-72,-30],[-70,-18],[-75,-12],[-77,-8],[-82,0],[-80,5],[-82,8]],
    // Europe
    [[28,70],[32,65],[28,62],[22,60],[18,60],[14,56],[10,56],[8,58],[5,58],[3,51],[2,51],[-2,48],[-5,48],[-5,44],[0,44],[3,43],[6,44],[8,44],[12,44],[14,46],[16,48],[18,48],[20,50],[22,52],[24,56],[22,58],[25,60],[28,65],[28,70]],
    // Scandinavia
    [[28,71],[22,71],[18,68],[14,66],[8,62],[6,58],[8,56],[10,56],[12,58],[18,62],[22,68],[28,71]],
    // Africa
    [[-5,36],[0,36],[10,37],[12,36],[16,32],[24,30],[34,28],[42,12],[44,10],[45,12],[42,18],[38,22],[38,30],[34,36],[20,38],[10,38],[-5,36]],
    // Sub-Saharan Africa
    [[42,12],[50,12],[50,5],[42,0],[36,-5],[34,-10],[36,-20],[38,-25],[34,-30],[28,-34],[20,-35],[14,-30],[12,-18],[10,-5],[8,4],[10,10],[16,12],[24,12],[32,12],[38,12],[42,12]],
    // Middle East
    [[26,36],[34,36],[38,36],[42,38],[46,38],[50,38],[56,28],[56,20],[44,14],[42,12],[36,16],[32,20],[26,32],[26,36]],
    // South Asia
    [[56,28],[60,22],[68,24],[74,24],[80,28],[86,28],[88,26],[90,22],[92,20],[86,14],[80,10],[76,8],[74,20],[68,20],[60,22],[56,28]],
    // East & SE Asia
    [[88,26],[92,26],[100,26],[108,20],[110,18],[120,18],[124,24],[128,34],[132,36],[136,34],[140,36],[140,40],[132,42],[128,50],[122,50],[116,50],[110,44],[104,40],[100,36],[96,36],[88,34],[88,26]],
    // Japan
    [[130,32],[132,34],[134,36],[136,36],[138,38],[140,40],[142,42],[142,43],[138,44],[136,42],[132,38],[130,34],[130,32]],
    // Australia
    [[114,-22],[122,-18],[130,-12],[136,-12],[140,-18],[148,-20],[152,-24],[152,-30],[148,-38],[142,-38],[136,-36],[130,-32],[118,-28],[114,-22]],
    // Russia (simplified)
    [[28,70],[40,68],[52,68],[60,68],[70,68],[80,68],[90,68],[100,68],[110,68],[120,68],[136,68],[140,60],[136,54],[130,50],[120,48],[110,50],[100,52],[90,52],[80,50],[70,54],[60,56],[50,52],[40,50],[36,46],[30,44],[28,46],[26,50],[28,60],[28,70]],
  ];

  // City definitions [lon, lat]
  const CITIES_GEO = [
    { name: 'WARSAW',     lon: 21.0,  lat: 52.2,  target: true },
    { name: 'LONDON',     lon: -0.1,  lat: 51.5,  target: true },
    { name: 'FRANKFURT',  lon: 8.7,   lat: 50.1,  target: true },
    { name: 'AMSTERDAM',  lon: 4.9,   lat: 52.4,  target: true },
    { name: 'PARIS',      lon: 2.3,   lat: 48.9,  target: true },
    { name: 'TOKYO',      lon: 139.7, lat: 35.7,  target: false },
    { name: 'BEIJING',    lon: 116.4, lat: 39.9,  target: false },
    { name: 'SEOUL',      lon: 126.9, lat: 37.6,  target: false },
    { name: 'MOSCOW',     lon: 37.6,  lat: 55.8,  target: false },
    { name: 'KYIV',       lon: 30.5,  lat: 50.5,  target: false },
    { name: 'NEW YORK',   lon: -74.0, lat: 40.7,  target: false },
    { name: 'CHICAGO',    lon: -87.6, lat: 41.9,  target: false },
    { name: 'LOS ANGELES',lon: -118.2,lat: 34.0,  target: false },
    { name: 'SINGAPORE',  lon: 103.8, lat: 1.4,   target: false },
    { name: 'MUMBAI',     lon: 72.8,  lat: 19.1,  target: false },
    { name: 'SAO PAULO',  lon: -46.6, lat: -23.5, target: false },
    { name: 'DUBAI',      lon: 55.3,  lat: 25.2,  target: false },
    { name: 'JOHANNESBURG',lon:28.1,  lat: -26.2, target: false },
    { name: 'TORONTO',    lon: -79.4, lat: 43.7,  target: false },
    { name: 'SYDNEY',     lon: 151.2, lat: -33.9, target: false },
  ];

  let cities = [];

  // Mercator projection
  function project(lon, lat, W, H) {
    const x = ((lon + 180) / 360) * W;
    const latRad = lat * Math.PI / 180;
    const mercN  = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y      = (H / 2) - (W * mercN / (2 * Math.PI));
    return { x, y };
  }

  function buildCityPositions() {
    const { W, H } = dim;
    cities = CITIES_GEO.map(c => {
      const { x, y } = project(c.lon, c.lat, W, H);
      return { ...c, x, y };
    });
  }

  buildCityPositions();

  // ── PARTICLES ──
  const ATTACK_TYPES = [
    { name: 'RANSOMWARE',   color: '#e83030', weight: 3 },
    { name: 'PHISHING',     color: '#f59e0b', weight: 4 },
    { name: 'DDoS',         color: '#1A8FCE', weight: 2 },
    { name: 'BEC FRAUD',    color: '#e83030', weight: 2 },
    { name: 'APT',          color: '#8b5cf6', weight: 1 },
    { name: 'SUPPLY CHAIN', color: '#f59e0b', weight: 1 },
  ];

  function weightedType() {
    const pool = [];
    ATTACK_TYPES.forEach(t => { for (let i = 0; i < t.weight; i++) pool.push(t); });
    return pool[Math.floor(Math.random() * pool.length)];
  }

  let particles = [];
  let totalAttacks = 0, totalBlocked = 0;
  const typeCounts = {};
  ATTACK_TYPES.forEach(t => typeCounts[t.name] = 0);

  function spawnAttack() {
    const srcs = cities.filter(c => !c.target);
    const dsts = cities.filter(c =>  c.target);
    if (!srcs.length || !dsts.length) return;

    const src  = srcs[Math.floor(Math.random() * srcs.length)];
    const dst  = dsts[Math.floor(Math.random() * dsts.length)];
    const type = weightedType();
    const blocked = Math.random() > 0.28;

    particles.push({
      sx: src.x, sy: src.y,
      ex: dst.x, ey: dst.y,
      t: 0, dur: 90 + Math.random() * 50,
      color: type.color,
      type: type.name,
      src: src.name, dst: dst.name,
      blocked,
      trail: [],
      done: false,
      flash: 0,
    });

    totalAttacks++;
    if (blocked) totalBlocked++;
    typeCounts[type.name]++;

    addLogRow(src.name, dst.name, type, blocked);
    updateStats();
    renderTypeBars();
  }

  // ── DRAW ──
  function drawMap() {
    const { W, H } = dim;
    ctx.clearRect(0, 0, W, H);

    // Ocean
    ctx.fillStyle = '#030509';
    ctx.fillRect(0, 0, W, H);

    // Scanlines subtle
    ctx.fillStyle = 'rgba(26,143,206,0.012)';
    for (let y = 0; y < H; y += 4) {
      ctx.fillRect(0, y, W, 1);
    }

    // Land polygons
    LAND_POLYS.forEach(poly => {
      ctx.beginPath();
      poly.forEach(([lon, lat], i) => {
        const { x, y } = project(lon, lat, W, H);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle   = '#0d1525';
      ctx.strokeStyle = 'rgba(26,143,206,0.18)';
      ctx.lineWidth   = 0.5;
      ctx.fill();
      ctx.stroke();
    });

    // Lat/lon grid
    ctx.strokeStyle = 'rgba(26,143,206,0.06)';
    ctx.lineWidth   = 0.4;
    for (let lon = -180; lon <= 180; lon += 30) {
      ctx.beginPath();
      for (let lat = -80; lat <= 80; lat += 5) {
        const { x, y } = project(lon, lat, W, H);
        lat === -80 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    for (let lat = -60; lat <= 80; lat += 30) {
      ctx.beginPath();
      for (let lon = -180; lon <= 180; lon += 5) {
        const { x, y } = project(lon, lat, W, H);
        lon === -180 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Cities
    cities.forEach(c => {
      if (c.target) {
        // Concentric rings
        for (let r = 4; r <= 14; r += 5) {
          ctx.beginPath();
          ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(26,143,206,${0.5 - r * 0.025})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(c.x, c.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#1A8FCE';
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(c.x, c.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(232,48,48,0.65)';
        ctx.fill();
      }

      // Label
      ctx.font      = `${Math.max(7, Math.round(W * 0.009))}px 'DM Mono', monospace`;
      ctx.fillStyle = c.target
        ? 'rgba(26,143,206,0.75)'
        : 'rgba(232,48,48,0.45)';
      ctx.fillText(c.name, c.x + 5, c.y - 4);
    });
  }

  function drawParticles() {
    particles = particles.filter(p => !p.done);

    particles.forEach(p => {
      p.t++;
      const progress = p.t / p.dur;
      if (progress >= 1) { p.done = true; return; }

      // Quadratic bezier with arc midpoint
      const midX = (p.sx + p.ex) / 2;
      const midY = Math.min(p.sy, p.ey) - dim.H * 0.18;
      const t    = progress;
      const nt   = 1 - t;

      const px = nt * nt * p.sx + 2 * nt * t * midX + t * t * p.ex;
      const py = nt * nt * p.sy + 2 * nt * t * midY + t * t * p.ey;

      p.trail.push({ x: px, y: py });
      if (p.trail.length > 22) p.trail.shift();

      // Trail
      p.trail.forEach((pt, i) => {
        const a = (i / p.trail.length) * (1 - progress) * 0.55;
        ctx.globalAlpha = a;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Head
      ctx.globalAlpha = 0.9;
      ctx.fillStyle   = p.color;
      ctx.beginPath();
      ctx.arc(px, py, 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Impact flash
      if (p.t >= p.dur - 3) {
        p.flash = (p.flash || 0) + 1;
        if (p.blocked) {
          ctx.strokeStyle = '#1A8FCE';
          ctx.lineWidth   = 1.5;
          for (let r = 3; r <= 12; r += 4) {
            ctx.globalAlpha = (1 - r / 14) * 0.8;
            ctx.beginPath();
            ctx.arc(p.ex, p.ey, r, 0, Math.PI * 2);
            ctx.stroke();
          }
        } else {
          ctx.fillStyle   = '#e83030';
          ctx.globalAlpha = 0.85;
          ctx.beginPath();
          ctx.arc(p.ex, p.ey, 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    });
  }

  function loop() {
    drawMap();
    drawParticles();
    requestAnimationFrame(loop);
  }

  loop();
  setInterval(spawnAttack, 1100);

  // ── SIDEBAR ──
  function addLogRow(src, dst, type, blocked) {
    const el  = document.getElementById('attack-log');
    if (!el) return;
    const dot = type.color === '#e83030' ? 'red' : type.color === '#f59e0b' ? 'amber' : 'blue';
    const row = document.createElement('div');
    row.className = 'log-row';
    row.innerHTML = `<div class="log-dot ${dot}"></div><div class="log-text"><strong>${src}</strong> → ${dst}<br>${type.name} · ${blocked ? 'ZABLOKOWANY' : 'PRZEBIŁ SIĘ'}</div>`;
    el.insertBefore(row, el.firstChild);
    while (el.children.length > 7) el.removeChild(el.lastChild);
  }

  function updateStats() {
    const s = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
    s('ms-total',    totalAttacks);
    s('ms-blocked',  totalBlocked);
    s('ms-active',   particles.length);
  }

  function renderTypeBars() {
    const el = document.getElementById('type-bars');
    if (!el) return;
    const max = Math.max(1, ...Object.values(typeCounts));
    el.innerHTML = '';
    ATTACK_TYPES.forEach(t => {
      const cnt = typeCounts[t.name] || 0;
      const pct = Math.round(cnt / max * 100);
      const div = document.createElement('div');
      div.className = 'type-row';
      div.innerHTML = `
        <div class="type-row-top">
          <span style="color:${t.color}">${t.name}</span>
          <span>${cnt}</span>
        </div>
        <div class="type-bar-bg">
          <div class="type-bar-fill" style="width:${pct}%;background:${t.color}"></div>
        </div>`;
      el.appendChild(div);
    });
  }

  // Map clock
  function updateMapClock() {
    const el = document.getElementById('map-clock');
    if (!el) return;
    el.textContent = new Date().toUTCString().slice(17, 25) + ' UTC';
  }

  setInterval(updateMapClock, 1000);
  updateMapClock();
  renderTypeBars();
})();


/* ─── CTA HANDLER ─────────────────────────────────── */
function handleCTA() {
  const input = document.getElementById('cta-email');
  if (!input) return;
  const val = input.value.trim();
  if (!val || !val.includes('@')) {
    input.style.borderColor = '#e83030';
    setTimeout(() => input.style.borderColor = '', 1500);
    return;
  }
  input.value = '';
  input.placeholder = 'Dziękujemy! Odezwiemy się w 24h.';
  input.style.borderColor = '#1A8FCE';
  setTimeout(() => {
    input.placeholder = 'twoj@email.pl';
    input.style.borderColor = '';
  }, 4000);
}
