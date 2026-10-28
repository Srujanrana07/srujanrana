/**
 * Srujan Rana Portfolio - Minimal & Delightful Craft Engine
 * Zero-dependency, ultra-clean, accessible JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTyping();
  initFilters();
  initModals();
  initClipboard();
  initScrollSpy();
  initCardSpotlight();
  initScrollProgress();
  initScrollReveal();
  initAcousticPlayground();
  initCommandPalette();
  initAsciiOcean();
});

/* ========================================================================
   Ambient ASCII ocean: drifting character field and roaming sharks
   ======================================================================== */
function initAsciiOcean() {
  const canvas = document.getElementById('ascii-ocean');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sharkStyles = [
    { name: "GREAT WHITE", lines: ["                                         ;::tt'","                                          .;t%r.","     :                                    ;;SSS';","      :t:                                  't%%t:'","       :r;;                                 :t%%rt'","        ;tt':'                              ':%ttt:`","         ;:S%rt`           ',               `:t%SS:r;r:;:'t';;;':'","          ;tS%:t:;,       `:';:      ;;rt;tr;r%X%%tSXtt%Xt%t%tSSSr:r':","           ::%S%ttr:'         `;r't:::ttSt%tSXX8X8XSXXX8XSXX8%8S%%tSSo:,","            ,;tXS%%;:r'tr;:t;'t%t%S%X%XX8%88%S88#X#@8#X##8@8@X@#@%X%%%St;'","            ,rt%Stt:tr::tr';r:;S%XSSSXtX8XS8S88##8X@8#X88X8@8@8X%8X8XStt':","           `'%%tStrr;         .::tt:;r%ttt%X%Xt8XX%%SX8%X8SX8S8%XtX%So;:","          'rS%t:;::       ;;t;.      `'::':;;;%SXXSSt%SXtXt%tXt%;t;t''","         ;ttSt;:           ':               ;t:S%t;r:rt:;trr;;r;:'","        `;t;:.                              :'%XtS;.","       '::,                                 `rStS''","      'r;                                  `tSSS''","     `                                    ,rtS:;'","                                          ';t:r:"] },
    { name: "HAMMERHEAD", lines: ["                                        `;:;;","     ;`                                  't;r;                         ::;O","      ::;                                'r%S:;.                       ::':","       ,t;;                               'tr%%:;                     ,:tr:","        ':rt''                             .tSS%;:                    ;;%:'","         .r:tt::                            't%%t:;:                 ;r%Sr,","          ;:tt;trt'                       :;;;XStSt;tr':;;:;:t''     `t:t;;","           .':ttSStt'          '';;r;t;r:::tSSt%%%Xt%t%S%S%%tSrt;;; :;tSt:;","            :;SSSXSt:;r;:t:'rtt:tX%tSXStt%%%SSX@#X%X88X8%8%S%%XXStr;ttS%tr:","            '::t8tttt:;;rrt;r:::ttSXStttSStt%8X@@8X%XXX88XS8S%SSStr;;r%SS';","           ;;t%Xtrrt,          '';ttr:':t;r%t%8%XStt%tXS%SXtXtrr:r` `t:%S:,","          ;trtSr:r;                       :trtt%SSr;rr:t;:;;::t:     .;St:.","         ';;t:t:                            ':St%:r`                 ;':S';","        ':t:t,                             :ttX%t'                    ;;t;'","       :;;;                               `:%%t::                     .;%:;","      ;:,                                ::SS;r'                       ';;;","     ;'                                  :'r;:                         ';tO"] },
    { name: "WHALE SHARK", lines: ["                                        ,;t::'","                                         'r:r:'","    '                                     ::%S:;:","     :'                                   ':%S%t:'","      ,'`                                  ';`'tt;;'","       ;rt:                                 ';;'::',;","        .tr;;                                   ;.,..'.`'t:,'r::.:r:`:","         't;;r;                         ';,';:r';'``S'',X``,'`S.`,.`,`;:o'","          `;S:r:.                `;;`.trrt,,`.S,'..XXS`.`',`'8S%''XXX,.Sr;;","           `:t%%;:'      ,r::t.'t:'''S..''t',8S.`.,88X,,.,''.#@..``8`,``%r:","           .rtXXS;r;;r:::tS,'`',SX'....'`'888'....`@.,.'@@...8#,.'.'```tt:`","           ;;S%%%%:;t;t:'ttt.'S%St.'`.X`,XX@,``'`'@X@..X88``.XX8,.#'``,%%r,","           'rtS%t;'      ;'r,';r:,`''%t''``8''``''`@#.'.@X@@``,`'88#@%,.S:,","          ';:tr;'                ,t','','''St,``.,'%8`,,,X%'`.,,.XSXX'`.,r,","         .'t;:'                         ,'',.'`t;`,,...,,``.'`tX,,S''.'r;'","        'rr;'                                   ,;`':;'`':';,r::``''``","       ;;:.                                 '`:`:..;'","      ';'                                  ':.X.``'.","     ':                                   'rttSS:'","    .                                     ''%tr:'","                                         :':':."] },
    { name: "TIGER SHARK", lines: ["                                         't;:rr,","     ,                                    't:tS:'","      ,r'                                  .r;t:;;","       ;:;.                                 :;tS%:`","        :::rt'                              ,'r;S%;;","         ;r;t;:;                             .;;;t:;;;r:t;r;';rtt::'t;","          ;:tSr:t',                 'tr::rtrt:tt;r%%tr:t;StS:tt:ttSS%:r:;","           'tt%tSSt::      :tt:tr::;rt%%rt;r%S%::;tXXXtt:;S8%t;;%%8XS%oS:,","            ;;;%S%S;t:;':::::r:%S%;;:rXS8r;:;X88::rr#88::r;88X:t8#8@%%%t%r:","            :rtXS%%;:rrt:;t;:trt%S;;ttS8%r;;:X%8r;t;@@Xtttt8#X:t8X88#SXS%::","           ,r;SXXt;;.      ':t;:ttr;tS%tt:;;ttS;::r%88t:rt88X;r:X%XStttS;.","          ';rtrtr',                 '::r;::rrt;;;r%tS;::tXSX:;t;X%ttr:o;;","         ;rS;r':                             ;;r:S;r;:t:r;rrrr':rt::;'","        ::r;r:                              :':t%;;`","       ';::                                 ;;r%t:'","      ';.                                  :;t%:t:","     `                                    ':;%tt;","                                         .':;'t'"] },
    { name: "THRESHER", lines: ["   ':r:","  :'rrt;`                                    .ttr;","   .':r%:t;                                   .rS;.","     ,;';St:;                                  :'%r'","        '::St::t,                               :;t::;","          ';;:ttr;::'                            ':;Sr:","             `::trr:::ttt` ''                   ;t%StSt::t;:;;'rtt`","                 ::r;:r;t;;rt;;r'         ;r';:;::tS8%XX%ttS%XX%%t:;;o`","                      .trt';:S%::;tr'r;;';r%X%%St%8%XX%X%%8%SX%%%%%t%::';","                           ::::;:;r;':'rt;;%S%XtSSSS8%SS%%%%SXS%XSXSt;:r:","                             ;:;          ,;tr;;;ttXS%%tX%XXtXSStt:tto.","                           ;,                   :'SSXS;'';rr:trr''.","                                                 :ttS:;","                                                ,t%t;:","                                               ';t::","                                              ;tt;:","                                             ;':::"] },
    { name: "MAKO", lines: ["     :","      ;.                                  ;t'r:","       :t'                                 'r;t;;","        ;';,                                ::%:r;","         ;:::::                              ':ttrt`","          ;'tS;:;                             ,ttttr;:","           ;;tXtt;'                       .;rrrSX%Xttrr;;r':;'r;:'","            :rtX%t:;'           ';r::t;:t'rtStSXXS8XS%%XS%SX%St%t::ro'","            .;%%StS:r;;t:;t;r't:t%StS%StS%XX%S%8#88#8X8XXS8SX%%8%Sttt;:tr,","            ':SSSX%Sr;:::;;::r;rr%%ttXXStS%%%8888#88%@8%%8XSXS%8SSttrt';::","            :;tt%;r':           .t:::';';t::tS%SSXS%XSXSStX%%XXS;;;ro`","           ';S%t;r.                       :t:trtttXt%trrrr:';t:::'","          ';St::;                             :t%%t;t;","         :'r'r;                              `t:%;r;","        :;';                                ,rt%':","       .;'                                 ';%':;","      ;'                                  'r;;.","     :"] }
  ];
  const glyphs = ' .·:;*%0123456789';
  const sharks = Array.from({ length: sharkStyles.length }, (_, i) => ({
    x: [0.18, 0.79, 0.51, 0.15, 0.84, 0.52][i],
    y: [0.22, 0.25, 0.48, 0.72, 0.72, 0.88][i],
    angle: [-0.35, 2.7, 1.3, -1.2, 0.7, -0.7][i],
    speed: [28, 22, 16, 19, 14, 24][i],
    scale: [0.86, 0.58, 0.67, 0.6, 0.62, 0.55][i],
    alpha: [0.58, 0.48, 0.46, 0.48, 0.45, 0.44][i],
    phase: i * 1.7, style: i
  }));
  let width = 0, height = 0, dpr = 1, frame = 0, last = 0, raf = 0;
  let sprite = null, spriteScale = 1, sharkFontSize = 11, sharkCellW = 7;

  function makeSprite() {
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    const color = light ? [82, 88, 98] : [226, 231, 238];
    sharkFontSize = width < 640 ? 8 : 11;
    sharkCellW = sharkFontSize * 0.63;
    spriteScale = width < 640 ? 0.52 : Math.min(1, width / 1500);
    sprite = sharkStyles.map(({ name, lines }, styleIndex) => {
      const maxCols = Math.max(...lines.map(line => line.length));
      const characters = [];
      lines.forEach((line, row) => {
        [...line].forEach((char, col) => {
          if (char === ' ') return;
          const density = '@#8X%S'.includes(char) ? 0.78 : ('.:;t%'.includes(char) ? 0.38 : 0.58);
          characters.push({ char, col, row, density });
        });
      });
      return {
        name,
        width: maxCols * sharkCellW,
        height: lines.length * sharkFontSize * 1.1,
        rowCount: lines.length,
        maxCols,
        tailAxis: styleIndex === 4 ? 'vertical' : 'horizontal',
        characters,
        color
      };
    });
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    makeSprite();
  }

  function draw(now) {
    raf = 0;
    if (document.hidden) return;
    const elapsed = Math.min(now - (last || now), 50);
    last = now;
    frame += reducedMotion.matches ? 0 : elapsed;
    ctx.clearRect(0, 0, width, height);
    // A quiet bed of drifting ASCII particles gives the sharks an ocean to swim through.
    const cols = Math.ceil(width / 17), rows = Math.ceil(height / 22);
    ctx.font = `${width < 640 ? 9 : 10}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.textAlign = 'center';
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const hash = (col * 31 + row * 17) % 19;
        if (hash > 2) continue;
        const phase = reducedMotion.matches ? 0 : Math.floor(frame / 850);
        const glyph = glyphs[(col * 7 + row * 11 + phase) % glyphs.length];
        ctx.fillStyle = `rgba(155,190,220,${0.08 + (hash % 3) * 0.025})`;
        ctx.fillText(glyph, col * 17, row * 22 + 12);
      }
    }
    sharks.forEach(shark => {
      if (!reducedMotion.matches) {
        const seconds = frame / 1000;
        let turnRate = 0.28 * Math.sin(seconds * 0.31 + shark.phase)
          + 0.14 * Math.sin(seconds * 0.12 + shark.phase * 1.7);
        const steerX = shark.x < 0.15 ? (0.15 - shark.x) * 10 : shark.x > 0.85 ? (0.85 - shark.x) * 10 : 0;
        const steerY = shark.y < 0.15 ? (0.15 - shark.y) * 10 : shark.y > 0.85 ? (0.85 - shark.y) * 10 : 0;
        if (steerX || steerY) {
          const towardCenter = Math.atan2(steerY, steerX);
          const difference = Math.atan2(Math.sin(towardCenter - shark.angle), Math.cos(towardCenter - shark.angle));
          turnRate += Math.sin(difference) * Math.min(1.5, Math.hypot(steerX, steerY) * 1.5);
        }
        shark.angle += turnRate * elapsed / 1000;
        shark.x += Math.cos(shark.angle) * shark.speed * elapsed / 1000 / Math.max(400, width);
        shark.y += Math.sin(shark.angle) * shark.speed * elapsed / 1000 / Math.max(400, height);
      }
      const depth = (Math.sin(frame * 0.00024 + shark.phase) + 1) / 2;
      const scale = shark.scale * spriteScale * (0.91 + depth * 0.13);
      const sharkSprite = sprite?.[shark.style];
      if (!sharkSprite) return;
      const centerX = shark.x * width;
      const centerY = shark.y * height;
      const opacity = shark.alpha * (0.28 + depth * 0.82);
      const tailBeat = frame * 0.003 + shark.phase;
      ctx.font = `${depth > 0.7 ? '600' : '400'} ${sharkFontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textBaseline = 'middle';
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(centerX, centerY);
      // Most designs face right; the thresher is drawn vertically with its tail below.
      const verticalTail = sharkSprite.tailAxis === 'vertical';
      ctx.rotate(shark.angle + (verticalTail ? Math.PI / 2 : 0));
      ctx.scale(scale, scale);
      ctx.fillStyle = `rgb(${sharkSprite.color.join(',')})`;
      ctx.strokeStyle = `rgba(${sharkSprite.color.join(',')},${0.4 + depth * 0.4})`;
      ctx.lineWidth = depth > 0.72 ? 0.55 : 0;
      sharkSprite.characters.forEach(({ char, col, row, density }) => {
        const alongBody = col / Math.max(1, sharkSprite.maxCols - 1);
        const x = col * sharkCellW - sharkSprite.width / 2;
        const y = row * sharkFontSize * 1.1 - sharkSprite.height / 2;
        // Keep the marked head fixed; flex only the tail end for each design's layout.
        const tailProgress = verticalTail
          ? row / Math.max(1, sharkSprite.rowCount - 1)
          : 1 - alongBody;
        const tail = Math.pow(Math.max(0, (tailProgress - 0.58) / 0.42), 2);
        const flex = Math.sin(tailBeat - tailProgress * 2.8) * tail * 34 * spriteScale;
        ctx.globalAlpha = opacity * density;
        const charX = x + (verticalTail ? flex : 0);
        const charY = y + (verticalTail ? 0 : flex);
        ctx.fillText(char, charX, charY);
        if (depth > 0.72) ctx.strokeText(char, charX, charY);
      });
      ctx.restore();
    });
    if (!reducedMotion.matches) raf = requestAnimationFrame(draw);
  }

  function start() { if (!raf) raf = requestAnimationFrame(draw); }
  window.redrawAsciiOcean = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    last = 0;
    makeSprite();
    draw(performance.now());
    if (!reducedMotion.matches) start();
  };
  resize();
  start();
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { last = 0; start(); } });
  reducedMotion.addEventListener?.('change', () => { if (reducedMotion.matches) { cancelAnimationFrame(raf); raf = 0; draw(performance.now()); } else start(); });
}

/* ==========================================================================
   Scroll Reading Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }, { passive: true });
}

/* ==========================================================================
   Scroll-Reveal Entrance Animations
   ========================================================================== */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal-item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  items.forEach(item => observer.observe(item));
}

/* ==========================================================================
   Theme Management
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const icon = document.getElementById('theme-icon');
  
  const saved = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const current = saved || (systemDark ? 'dark' : 'dark');

  document.documentElement.setAttribute('data-theme', current);
  updateIcon(current);

  toggleBtn?.addEventListener('click', toggleTheme);

  function toggleTheme() {
    const active = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = active === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcon(next);
    window.redrawAsciiOcean?.();
  }

  function updateIcon(theme) {
    if (!icon) return;
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  window.switchTheme = toggleTheme;
}

/* ==========================================================================
   Typing Animation in Hero
   ========================================================================== */
function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'AI Engineer & Agentic Systems Builder',
    'Machine Learning Engineer',
    'Autonomous Agent & MCP Specialist',
    'M.Tech Scholar at IIIT Bhubaneswar',
    'Deep Learning & Acoustic Signal Researcher',
    'IIT Madras Data Science Scholar'
  ];

  let pIndex = 0;
  let cIndex = 0;
  let deleting = false;

  function tick() {
    const full = phrases[pIndex];
    if (deleting) {
      el.textContent = full.substring(0, cIndex - 1);
      cIndex--;
    } else {
      el.textContent = full.substring(0, cIndex + 1);
      cIndex++;
    }

    let speed = deleting ? 30 : 65;

    if (!deleting && cIndex === full.length) {
      speed = 2200;
      deleting = true;
    } else if (deleting && cIndex === 0) {
      deleting = false;
      pIndex = (pIndex + 1) % phrases.length;
      speed = 350;
    }

    setTimeout(tick, speed);
  }

  tick();
}

/* ==========================================================================
   Project Category Filtering
   ========================================================================== */
function initFilters() {
  const buttons = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.craft-project-card');

  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const cats = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || cats.includes(filter)) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   Interactive Acoustic Signal Playground (Voice Stress Research Simulation)
   ========================================================================== */
function initAcousticPlayground() {
  const toggleBtn = document.getElementById('sim-toggle-btn');
  const drawer = document.getElementById('sim-playground');
  const canvas = document.getElementById('sim-canvas');
  const sampleBtn = document.getElementById('sim-sample-btn');
  const resultBadge = document.getElementById('sim-result-badge');
  const mfccVal = document.getElementById('sim-mfcc-val');
  const attnVal = document.getElementById('sim-attn-val');
  const latencyVal = document.getElementById('sim-latency-val');

  if (!toggleBtn || !drawer || !canvas) return;

  const ctx = canvas.getContext('2d');
  let animId = null;
  let phase = 0;
  let isSimActive = false;

  const profiles = [
    {
      name: 'Sample A: Baseline Speech (Calm)',
      freq: 0.05,
      amp: 16,
      noise: 2,
      mfcc: '128 Bins · Energy: 0.18',
      attn: 'Low Peak Entropy',
      latency: '14.2ms',
      stress: '12% Stress · Calm / Normal',
      statusClass: ''
    },
    {
      name: 'Sample B: Cognitive Load (Elevated)',
      freq: 0.11,
      amp: 24,
      noise: 7,
      mfcc: '128 Bins · Energy: 0.54',
      attn: 'Focal Attention Shift',
      latency: '13.9ms',
      stress: '48% Stress · Moderate Arousal',
      statusClass: 'neutral-stress'
    },
    {
      name: 'Sample C: Acoustic Vocal Tremor (High Stress)',
      freq: 0.18,
      amp: 30,
      noise: 14,
      mfcc: '128 Bins · Energy: 0.88',
      attn: 'High Harmonic Variance',
      latency: '14.5ms',
      stress: '89% Stress · High Vocal Stress',
      statusClass: 'high-stress'
    }
  ];

  let currentProfileIdx = 0;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.parentElement.clientHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  function drawWaveform() {
    if (!isSimActive) return;

    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight;
    const p = profiles[currentProfileIdx];

    ctx.clearRect(0, 0, w, h);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // Draw main waveform
    ctx.beginPath();
    ctx.strokeStyle = currentProfileIdx === 2 ? '#ef4444' : (currentProfileIdx === 1 ? '#f59e0b' : '#10b981');
    ctx.lineWidth = 2;

    for (let x = 0; x < w; x++) {
      const noise = (Math.sin(x * 0.2 + phase * 2) * p.noise);
      const y = (h / 2) + Math.sin(x * p.freq + phase) * p.amp + noise;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw secondary harmonic line
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 2) {
      const y = (h / 2) + Math.cos(x * (p.freq * 1.5) + phase * 1.2) * (p.amp * 0.6);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    phase += 0.08;
    animId = requestAnimationFrame(drawWaveform);
  }

  function updateTelemetry() {
    const p = profiles[currentProfileIdx];
    if (mfccVal) mfccVal.textContent = p.mfcc;
    if (attnVal) attnVal.textContent = p.attn;
    if (latencyVal) latencyVal.textContent = p.latency;
    if (resultBadge) {
      resultBadge.textContent = p.stress;
      resultBadge.className = `sim-badge-result ${p.statusClass}`;
    }
  }

  toggleBtn.addEventListener('click', () => {
    isSimActive = drawer.classList.toggle('active');
    toggleBtn.innerHTML = isSimActive 
      ? '<i class="fas fa-chart-line"></i> <span>Hide Acoustic Sandbox</span>'
      : '<i class="fas fa-wave-square"></i> <span>⚡ Live Acoustic Sandbox</span>';

    if (isSimActive) {
      resizeCanvas();
      updateTelemetry();
      drawWaveform();
    } else if (animId) {
      cancelAnimationFrame(animId);
    }
  });

  sampleBtn?.addEventListener('click', () => {
    currentProfileIdx = (currentProfileIdx + 1) % profiles.length;
    updateTelemetry();
  });

  window.addEventListener('resize', () => {
    if (isSimActive) resizeCanvas();
  }, { passive: true });
}

/* ==========================================================================
   Command Palette (⌘K / Ctrl+K)
   ========================================================================== */
function initCommandPalette() {
  const trigger = document.getElementById('cmd-palette-trigger');
  const backdrop = document.getElementById('cmd-backdrop');
  const input = document.getElementById('cmd-search-input');
  const options = document.querySelectorAll('.cmd-option');

  if (!backdrop) return;

  function openPalette() {
    backdrop.classList.add('active');
    if (input) {
      input.value = '';
      input.focus();
    }
    filterCommands('');
  }

  function closePalette() {
    backdrop.classList.remove('active');
  }

  function filterCommands(query) {
    const q = query.toLowerCase().trim();
    options.forEach(opt => {
      const text = opt.textContent.toLowerCase();
      opt.style.display = text.includes(q) ? 'flex' : 'none';
    });
  }

  trigger?.addEventListener('click', openPalette);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePalette();
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (backdrop.classList.contains('active')) closePalette();
      else openPalette();
    } else if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closePalette();
    }
  });

  input?.addEventListener('input', (e) => {
    filterCommands(e.target.value);
  });

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      const action = opt.getAttribute('data-action');
      closePalette();
      executeCommand(action);
    });
  });

  function executeCommand(action) {
    switch (action) {
      case 'nav-about':
        window.location.hash = '#about';
        break;
      case 'nav-experience':
        window.location.hash = '#experience';
        break;
      case 'nav-education':
        window.location.hash = '#education';
        break;
      case 'nav-projects':
        window.location.hash = '#projects';
        break;
      case 'nav-skills':
        window.location.hash = '#skills';
        break;
      case 'nav-writing':
        window.location.hash = '#writing';
        break;
      case 'nav-contact':
        window.location.hash = '#contact';
        break;
      case 'toggle-theme':
        if (window.switchTheme) window.switchTheme();
        break;
      case 'contact-agentic':
        window.location.href = 'mailto:ranasrujan@gmail.com?subject=%5BOpportunity%5D%20Agentic%20AI%20%2F%20AI%20Engineer%20Role&body=Hi%20Srujan%2C%0A%0AWe%20saw%20your%20portfolio%20and%20would%20love%20to%20discuss%20an%20AI%20%2F%20Agentic%20AI%20role%20at...';
        break;
      case 'copy-email':
        copyEmail();
        break;
      case 'open-resume':
        window.open('authors/Srujan_Rana_Resume.pdf', '_blank');
        break;
      case 'open-github':
        window.open('https://github.com/Srujanrana07', '_blank');
        break;
      case 'open-linkedin':
        window.open('https://www.linkedin.com/in/srujan-rana/', '_blank');
        break;
      default:
        break;
    }
  }

  function copyEmail() {
    navigator.clipboard?.writeText('ranasrujan@gmail.com').then(() => {
      const toast = document.getElementById('toast-pill');
      if (toast) {
        toast.textContent = 'Copied ranasrujan@gmail.com to clipboard';
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 2800);
      }
    });
  }
}

/* ==========================================================================
   Certificate Preview Modal
   ========================================================================== */
function initModals() {
  const backdrop = document.getElementById('modal-backdrop');
  const caption = document.getElementById('modal-caption');
  const viewport = document.getElementById('modal-viewport');
  const dismiss = document.getElementById('modal-dismiss');
  const triggers = document.querySelectorAll('[data-cert-src]');

  if (!backdrop || !triggers.length) return;

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const src = btn.getAttribute('data-cert-src');
      const title = btn.getAttribute('data-cert-title') || 'Certificate Preview';
      const isPdf = src.toLowerCase().endsWith('.pdf');

      caption.textContent = title;
      viewport.innerHTML = '';

      if (isPdf) {
        const iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.title = title;
        viewport.appendChild(iframe);
      } else {
        const img = document.createElement('img');
        img.src = src;
        img.alt = title;
        viewport.appendChild(img);
      }

      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function close() {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (viewport) viewport.innerHTML = '';
    }, 200);
  }

  dismiss?.addEventListener('click', close);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) close();
  });
}

/* ==========================================================================
   Copy to Clipboard
   ========================================================================== */
function initClipboard() {
  const triggers = document.querySelectorAll('.copy-email-trigger');
  const toast = document.getElementById('toast-pill');

  triggers.forEach(btn => {
    btn.addEventListener('click', async () => {
      const email = 'ranasrujan@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        popToast('Copied ranasrujan@gmail.com to clipboard');
      } catch (err) {
        const input = document.createElement('input');
        input.value = email;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        popToast('Copied ranasrujan@gmail.com to clipboard');
      }
    });
  });

  function popToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 2800);
  }
}

/* ==========================================================================
   ScrollSpy for Navbar
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-item-link');

  if (!sections.length || !links.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const h = sec.offsetHeight;
      const top = sec.offsetTop - 140;
      const id = sec.getAttribute('id');

      if (scrollY > top && scrollY <= top + h) {
        links.forEach(l => {
          l.classList.remove('active');
          if (l.getAttribute('href') === `#${id}`) {
            l.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   Card Spotlight Effect
   ========================================================================== */
function initCardSpotlight() {
  const cards = document.querySelectorAll('.craft-project-card, .experience-item, .education-item');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}
