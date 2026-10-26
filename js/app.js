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
});

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
