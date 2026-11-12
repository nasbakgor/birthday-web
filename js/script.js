/* ============================================================
   SCRIPT.JS — "A Little Universe For You"
   Full interactive birthday website logic
   ============================================================ */

'use strict';

/* ── Shortcuts ──────────────────────────────────────────────── */
const $  = id  => document.getElementById(id);
const qs = (s, ctx = document) => ctx.querySelector(s);
const qa = (s, ctx = document) => [...ctx.querySelectorAll(s)];

/* ── State ──────────────────────────────────────────────────── */
const state = {
  entered:   false,
  lbIndex:   0,
  wishMade:  false,
};

/* ═══════════════════════════════════════════════════════════
   BOOT
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initStarCanvas();
  initCursor();
  initLanding();
});

function bootMainSite() {
  populateData();
  buildReasons();
  buildGallery();
  buildTimeline();
  buildEnvelopes();
  populateLetter();
  populateWish();
  initNavbar();
  initScrollReveal();
  initScrollProgress();
  initLightbox();
  initTimelineProgress();
  initLetterEnvelope();
  initWishStar();
  initBackTop();
  initConfetti();
}

/* ═══════════════════════════════════════════════════════════
   1. STAR CANVAS BACKGROUND
═══════════════════════════════════════════════════════════ */
function initStarCanvas() {
  const canvas = $('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  // Generate stars
  const stars = Array.from({ length: 220 }, () => ({
    x:    Math.random(),
    y:    Math.random(),
    r:    Math.random() * 1.4 + 0.3,
    alpha: Math.random() * 0.7 + 0.1,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.0008 + 0.0003,
    drift: (Math.random() - 0.5) * 0.00005,
  }));

  // Shooting star
  let shootTimer = 0;
  let shoot = null;

  function spawnShoot() {
    shoot = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      len: Math.random() * 100 + 60,
      speed: Math.random() * 8 + 6,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      alpha: 1,
      life: 1,
    };
  }

  function drawStars(now) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
      s.phase += s.speed;
      s.x += s.drift;
      if (s.x < 0) s.x = 1;
      if (s.x > 1) s.x = 0;

      const a = s.alpha * (0.6 + 0.4 * Math.sin(s.phase));
      ctx.beginPath();
      ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(216,228,250,${a.toFixed(2)})`;
      ctx.fill();
    });

    // Shooting star
    shootTimer++;
    if (shootTimer > 300 && !shoot) {
      spawnShoot();
      shootTimer = 0;
    }
    if (shoot) {
      shoot.life -= 0.03;
      if (shoot.life <= 0) { shoot = null; }
      else {
        shoot.x += Math.cos(shoot.angle) * shoot.speed;
        shoot.y += Math.sin(shoot.angle) * shoot.speed;
        const grad = ctx.createLinearGradient(
          shoot.x, shoot.y,
          shoot.x - Math.cos(shoot.angle) * shoot.len,
          shoot.y - Math.sin(shoot.angle) * shoot.len
        );
        grad.addColorStop(0, `rgba(232,213,163,${shoot.life.toFixed(2)})`);
        grad.addColorStop(1, 'rgba(232,213,163,0)');
        ctx.beginPath();
        ctx.moveTo(shoot.x, shoot.y);
        ctx.lineTo(
          shoot.x - Math.cos(shoot.angle) * shoot.len,
          shoot.y - Math.sin(shoot.angle) * shoot.len
        );
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    requestAnimationFrame(drawStars);
  }
  requestAnimationFrame(drawStars);
}

/* ═══════════════════════════════════════════════════════════
   2. CUSTOM CURSOR
═══════════════════════════════════════════════════════════ */
function initCursor() {
  const dot  = $('cursor-dot');
  const ring = $('cursor-ring');
  if (!dot || !ring) return;

  // Only on pointer devices
  if (!window.matchMedia('(hover: hover)').matches) return;

  let mx = 0, my = 0, rx = 0, ry = 0, raf;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  const lerp = (a, b, n) => a + (b - a) * n;

  const tick = () => {
    dot.style.left  = `${mx}px`;
    dot.style.top   = `${my}px`;
    rx = lerp(rx, mx, 0.14);
    ry = lerp(ry, my, 0.14);
    ring.style.left = `${rx}px`;
    ring.style.top  = `${ry}px`;
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  // Hover state on interactive elements
  const addHover = el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  };
  document.querySelectorAll('a, button, [role="button"], .polaroid-wrap, .reason-card, .env-card')
    .forEach(addHover);

  document.addEventListener('mousedown', () => ring.classList.add('clicking'));
  document.addEventListener('mouseup',   () => ring.classList.remove('clicking'));
}

/* ═══════════════════════════════════════════════════════════
   3. LANDING / ENTER
═══════════════════════════════════════════════════════════ */
function initLanding() {
  const btn     = $('btn-enter');
  const landing = $('landing');
  const overlay = $('page-overlay');
  const main    = $('main-site');

  if (!btn) return;

  // Fade in overlay
  overlay.classList.remove('fade-out');

  // Animate overlay away on first load
  requestAnimationFrame(() => {
    setTimeout(() => {
      overlay.classList.add('fade-out');
      document.body.classList.remove('landing-active');
    }, 100);
  });

  btn.addEventListener('click', () => {
    if (state.entered) return;
    state.entered = true;
    btn.style.opacity = '0.4';
    btn.style.pointerEvents = 'none';

    // Fade out landing
    overlay.classList.remove('fade-out');
    overlay.style.transition = 'opacity 0.9s var(--ease-out)';

    setTimeout(() => {
      landing.style.display = 'none';
      main.style.display    = 'block';
      $('navbar').classList.add('scrolled');
      overlay.classList.add('fade-out');
      document.body.classList.remove('landing-active');
      window.scrollTo(0, 0);
      bootMainSite();
    }, 850);
  });
}

/* ═══════════════════════════════════════════════════════════
   4. POPULATE DATA
═══════════════════════════════════════════════════════════ */
function populateData() {
  const d = universeData;
  const p = d.person;

  // Birthday badge label
  const label = $('intro-birthday-label');
  if (label) label.textContent = `Happy Birthday, ${p.name}`;

  // Age display
  const ageVal    = parseInt(p.age, 10);
  const ageNum    = $('age-num-value');
  const ageFilled = $('age-num-filled');
  if (ageNum)    ageNum.textContent = isNaN(ageVal) ? p.age : ageVal;
  if (ageFilled) ageFilled.textContent = isNaN(ageVal) ? p.age : ageVal;

  // Intro message
  const introMsg = $('intro-message-text');
  if (introMsg) introMsg.textContent = d.intro.message;

  // Wish section
  const wishName = $('wish-name');
  if (wishName) wishName.textContent = `My Favorite Person, ${p.nickname}.`;

  const wishMsg = $('wish-message');
  if (wishMsg) wishMsg.textContent = d.finalWish;
}

/* ═══════════════════════════════════════════════════════════
   5. BUILD REASONS
═══════════════════════════════════════════════════════════ */
function buildReasons() {
  const grid = $('reasons-grid');
  if (!grid) return;
  grid.innerHTML = '';

  universeData.reasons.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'reason-card reveal';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('data-stagger', i);
    card.setAttribute('aria-label', `Reason ${i + 1}: ${r.title}. Click to reveal.`);
    card.dataset.flipped = 'false';

    card.innerHTML = `
      <div class="card-front">
        <div>
          <span class="card-icon" aria-hidden="true">${esc(r.icon)}</span>
          <div class="card-title">${esc(r.title)}</div>
          <div class="card-hint">tap to reveal</div>
        </div>
        <div class="card-num" aria-hidden="true">0${i + 1}</div>
      </div>
      <div class="card-back">
        <p class="card-back-message">${esc(r.message)}</p>
        <span class="card-back-close">tap again to close</span>
      </div>`;

    const toggle = () => {
      const flipped = card.dataset.flipped === 'true';
      card.classList.toggle('flipped', !flipped);
      card.dataset.flipped = String(!flipped);
      card.setAttribute('aria-label',
        !flipped
          ? `Reason ${i + 1}: ${r.title}. ${r.message}. Click to close.`
          : `Reason ${i + 1}: ${r.title}. Click to reveal.`
      );
    };
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });

    grid.appendChild(card);
  });
  reObserve();
}

/* ═══════════════════════════════════════════════════════════
   6. BUILD GALLERY
═══════════════════════════════════════════════════════════ */
function buildGallery() {
  const grid = $('gallery-grid');
  if (!grid) return;
  grid.innerHTML = '';

  universeData.memories.forEach((mem, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'polaroid-wrap reveal';
    wrap.setAttribute('role', 'listitem');
    wrap.setAttribute('data-stagger', i % 8);
    wrap.dataset.index = i;
    wrap.setAttribute('tabindex', '0');
    wrap.setAttribute('aria-label', `Photo ${i + 1}: ${mem.caption || 'Memory'}`);

    wrap.innerHTML = `
      <div class="polaroid">
        <div class="polaroid-placeholder" id="ph-${i}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
          <span>photo${i + 1}.jpg</span>
        </div>
        <div class="polaroid-caption">${esc(mem.caption)}</div>
        <div class="polaroid-date">${esc(mem.date)}</div>
      </div>`;

    // Try loading image
    if (mem.src) {
      const img = new Image();
      img.onload = () => {
        const ph = $(`ph-${i}`);
        if (ph) {
          const el = document.createElement('img');
          el.src   = mem.src;
          el.alt   = mem.caption || `Memory ${i + 1}`;
          el.className = 'polaroid-img';
          ph.replaceWith(el);
        }
      };
      img.src = mem.src;
    }

    wrap.addEventListener('click', () => openLightbox(i));
    wrap.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
    });

    grid.appendChild(wrap);
  });
  reObserve();
}

/* ═══════════════════════════════════════════════════════════
   7. LIGHTBOX
═══════════════════════════════════════════════════════════ */
function initLightbox() {
  const lb    = $('lightbox');
  const close = $('lb-close');
  if (!lb) return;

  close.addEventListener('click', closeLightbox);
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  $('lb-prev').addEventListener('click', () => navLb(-1));
  $('lb-next').addEventListener('click', () => navLb(+1));

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navLb(-1);
    if (e.key === 'ArrowRight') navLb(+1);
  });

  // Touch swipe
  let startX = 0;
  lb.addEventListener('touchstart', e => { startX = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) navLb(dx < 0 ? 1 : -1);
  });
}

function openLightbox(idx) {
  state.lbIndex = idx;
  fillLightbox(idx);
  $('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  $('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function navLb(dir) {
  const len = universeData.memories.length;
  state.lbIndex = ((state.lbIndex + dir) + len) % len;
  fillLightbox(state.lbIndex);
}
function fillLightbox(idx) {
  const m   = universeData.memories[idx];
  const len = universeData.memories.length;

  $('lb-counter').textContent = `${String(idx + 1).padStart(2,'0')} / ${String(len).padStart(2,'0')}`;
  $('lb-caption').textContent = m.caption || '';
  $('lb-date').textContent    = m.date    || '';

  const img = $('lb-img');
  const ph  = $('lb-placeholder');
  img.style.display = 'none';
  if (ph) ph.style.display = 'flex';

  if (m.src) {
    const loader = new Image();
    loader.onload = () => {
      img.src = m.src; img.alt = m.caption || '';
      img.style.display = 'block';
      if (ph) ph.style.display = 'none';
    };
    loader.onerror = () => {
      img.style.display = 'none';
      if (ph) ph.style.display = 'flex';
    };
    loader.src = m.src;
  }
}

/* ═══════════════════════════════════════════════════════════
   8. BUILD TIMELINE
═══════════════════════════════════════════════════════════ */
function buildTimeline() {
  const wrap = $('timeline');
  if (!wrap) return;
  wrap.innerHTML = '';

  universeData.story.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 't-item';
    div.setAttribute('role', 'listitem');
    div.setAttribute('data-stagger', i);

    const hasPhoto = item.photo && item.photo !== null;
    div.innerHTML = `
      <div class="t-dot" aria-hidden="true"></div>
      <div class="t-date">${esc(item.date)}</div>
      <div class="t-title">${esc(item.title)}</div>
      <div class="t-text">${esc(item.text)}</div>
      ${hasPhoto
        ? `<div class="t-photo has-photo">
             <img src="${esc(item.photo)}" alt="${esc(item.title)}" loading="lazy" />
           </div>`
        : `<div class="t-photo"></div>`
      }`;
    wrap.appendChild(div);
  });

  // Individual reveal for t-items
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.stagger || 0, 10);
        setTimeout(() => e.target.classList.add('visible'), delay * 120);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  qa('.t-item', wrap).forEach(el => obs.observe(el));
}

function initTimelineProgress() {
  const wrap = $('timeline');
  if (!wrap) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => wrap.classList.add('animated'), 400);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  obs.observe(wrap);
}

/* ═══════════════════════════════════════════════════════════
   9. BUILD ENVELOPES
═══════════════════════════════════════════════════════════ */
function buildEnvelopes() {
  const grid = $('envelopes-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const icons = ['✉', '✦', '☽', '◎', '✿'];

  universeData.envelopes.forEach((env, i) => {
    const card = document.createElement('div');
    card.className = 'env-card reveal';
    card.setAttribute('role', 'listitem');
    card.setAttribute('data-stagger', i);

    card.innerHTML = `
      <div class="env-closed">
        <div class="env-icon" aria-hidden="true">${icons[i] || '✉'}</div>
        <div class="env-label">${esc(env.label)}</div>
        <span class="env-hint-text">click to open</span>
      </div>
      <div class="env-opened" role="article" aria-label="${esc(env.label)}">
        <span class="env-letter-label">${esc(env.label)}</span>
        <p class="env-letter-text">${esc(env.message)}</p>
        <button class="env-close-btn" aria-label="Close this letter">↩ Close</button>
      </div>`;

    const openCard = () => {
      card.classList.add('open');
      card.setAttribute('aria-expanded', 'true');
    };
    const closeCard = () => {
      card.classList.remove('open');
      card.setAttribute('aria-expanded', 'false');
    };

    qs('.env-closed', card).addEventListener('click', openCard);
    qs('.env-close-btn', card).addEventListener('click', e => {
      e.stopPropagation();
      closeCard();
    });

    grid.appendChild(card);
  });
  reObserve();
}

/* ═══════════════════════════════════════════════════════════
   10. LETTER ENVELOPE
═══════════════════════════════════════════════════════════ */
function populateLetter() {
  const L = universeData.letter;
  const sal = $('letter-salutation');
  const bod = $('letter-body');
  const cls = $('letter-closing');
  const sig = $('letter-sig');

  if (sal) sal.textContent = L.salutation;
  if (bod) bod.textContent = L.body;
  if (cls) cls.textContent = L.closing;
  if (sig) sig.textContent = L.signature;
}

function initLetterEnvelope() {
  const env   = $('letter-env');
  const btn   = $('btn-open-letter');
  const paper = $('letter-paper');
  if (!env || !paper) return;

  const openLetter = () => {
    if (env.classList.contains('open')) return;
    env.classList.add('open');
    if (btn) { btn.style.opacity = '0'; btn.style.pointerEvents = 'none'; }
    setTimeout(() => {
      paper.classList.add('visible');
      paper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 700);
  };

  if (btn) btn.addEventListener('click', openLetter);
  env.addEventListener('click', openLetter);
  env.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLetter(); }
  });
}

/* ═══════════════════════════════════════════════════════════
   11. WISH STAR
═══════════════════════════════════════════════════════════ */
function populateWish() {
  // Already populated in populateData
}

function initWishStar() {
  const star   = $('wish-star');
  const reveal = $('wish-reveal');
  const glow   = $('wish-glow');
  if (!star) return;

  star.addEventListener('click', () => {
    if (state.wishMade) return;
    state.wishMade = true;
    star.setAttribute('aria-pressed', 'true');

    // Animate star
    star.classList.add('wished');
    if (glow) glow.classList.add('bright');

    // Spawn star particles
    spawnStarParticles(star);

    // Launch confetti
    setTimeout(() => launchConfetti(80), 300);

    // Reveal wish
    setTimeout(() => {
      reveal.classList.add('show');
      reveal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 600);
  });
}

function spawnStarParticles(el) {
  const rect   = el.getBoundingClientRect();
  const cx     = rect.left + rect.width / 2;
  const cy     = rect.top  + rect.height / 2;
  const syms   = ['✦', '✧', '·', '⋆', '★'];
  const angles = Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2);

  angles.forEach(a => {
    const sp = document.createElement('div');
    sp.className = 'float-star';
    const dist = 60 + Math.random() * 80;
    sp.style.cssText = `
      left: ${cx}px; top: ${cy}px;
      --tx: ${(Math.cos(a) * dist).toFixed(0)}px;
      --ty: ${(Math.sin(a) * dist - 40).toFixed(0)}px;
      --rot: ${((Math.random() - 0.5) * 60).toFixed(0)}deg;
      --dur: ${(0.8 + Math.random() * 0.8).toFixed(2)}s;
      --sz:  ${(0.8 + Math.random() * 0.8).toFixed(2)}rem;
      animation-delay: ${(Math.random() * 0.2).toFixed(2)}s;
    `;
    sp.textContent = syms[Math.floor(Math.random() * syms.length)];
    document.body.appendChild(sp);
    setTimeout(() => sp.remove(), 2000);
  });
}

/* ═══════════════════════════════════════════════════════════
   12. NAVBAR
═══════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar    = $('navbar');
  const hamburger = $('hamburger');
  const mobileNav = $('mobile-nav');
  const sections  = qa('.site-section');
  let   lastScroll = 0;

  navbar.classList.add('scrolled');

  window.addEventListener('scroll', () => {
    const cur = window.scrollY;
    navbar.classList.toggle('hidden', cur > lastScroll + 8 && cur > 200);
    if (cur < lastScroll) navbar.classList.remove('hidden');
    lastScroll = Math.max(cur, 0);

    // Active nav link
    let active = '';
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top < 120) active = sec.id;
    });
    qa('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${active}`);
    });
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    mobileNav.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  qa('#mobile-nav a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   13. SCROLL REVEAL
═══════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.stagger || 0, 10);
        setTimeout(() => e.target.classList.add('visible'), delay * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  qa('.reveal').forEach(el => obs.observe(el));

  // Age counter
  const ageNum = $('age-num-display');
  if (ageNum) {
    const agObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('animated');
          agObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    agObs.observe(ageNum);
  }
}

function reObserve() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.stagger || 0, 10);
        setTimeout(() => e.target.classList.add('visible'), delay * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  qa('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════════════════════════════
   14. SCROLL PROGRESS BAR
═══════════════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = $('progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${(scrolled / total * 100).toFixed(1)}%`;
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════
   16. BACK TO TOP
═══════════════════════════════════════════════════════════ */
function initBackTop() {
  const btn = $('back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ═══════════════════════════════════════════════════════════
   17. CONFETTI
═══════════════════════════════════════════════════════════ */
let ccv, cctx, particles = [], rafConf = null;

function initConfetti() {
  ccv  = $('confetti-canvas');
  if (!ccv) return;
  cctx = ccv.getContext('2d');
  const resize = () => { ccv.width = innerWidth; ccv.height = innerHeight; };
  resize();
  window.addEventListener('resize', resize);
}

function launchConfetti(n = 80) {
  if (!ccv) return;
  // Color palette matching the theme
  const cols = ['#D8E4FA','#526D9B','#C9A84C','#E8D5A3','#F2F5FC','#1C3157'];
  const W = ccv.width, H = ccv.height;

  for (let i = 0; i < n; i++) {
    particles.push({
      x:    W * 0.3 + Math.random() * W * 0.4,
      y:    H * 0.35,
      vx:   (Math.random() - 0.5) * 10,
      vy:   Math.random() * -7 - 2,
      size: Math.random() * 7 + 3,
      color: cols[Math.floor(Math.random() * cols.length)],
      rot:  Math.random() * 360,
      rotV: (Math.random() - 0.5) * 9,
      life: 1,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    });
  }
  if (!rafConf) confettiTick();
}

function confettiTick() {
  cctx.clearRect(0, 0, ccv.width, ccv.height);
  particles = particles.filter(p => p.life > 0.01);

  particles.forEach(p => {
    p.x  += p.vx;
    p.y  += p.vy;
    p.vy += 0.18;
    p.vx *= 0.99;
    p.rot += p.rotV;
    p.life -= 0.013;

    cctx.save();
    cctx.translate(p.x, p.y);
    cctx.rotate(p.rot * Math.PI / 180);
    cctx.globalAlpha = Math.max(p.life, 0);
    cctx.fillStyle   = p.color;
    if (p.shape === 'circle') {
      cctx.beginPath();
      cctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      cctx.fill();
    } else {
      cctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    }
    cctx.restore();
  });

  if (particles.length > 0) {
    rafConf = requestAnimationFrame(confettiTick);
  } else {
    rafConf = null;
    cctx.clearRect(0, 0, ccv.width, ccv.height);
  }
}

/* ═══════════════════════════════════════════════════════════
   UTILITY
═══════════════════════════════════════════════════════════ */
function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
