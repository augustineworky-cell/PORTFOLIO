// ============================================
// APP.JS — Navigation + GSAP Premium Animations
// ============================================

// ── 1. BASE PAGE SWITCHER (no animation, handled by curtain wrapper) ──
function _switchPage(id) {
  const home = document.getElementById('home');
  home.style.display = 'none';
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));

  if (id === 'home') {
    home.style.display = 'block';
  } else {
    const p = document.getElementById(id);
    if (p) p.classList.add('active');
  }

  const navEl = document.getElementById('nav-' + id);
  if (navEl) {
    navEl.classList.add('active');
    moveNavPill(navEl);
  }

  window.scrollTo(0, 0);
}

// ── 2. CURTAIN PAGE TRANSITION ──
const curtain = document.getElementById('curtain');

function go(id) {
  gsap.timeline()
    .to(curtain, {
      height: '100%',
      duration: 0.42,
      ease: 'power3.inOut',
      onComplete: () => {
        _switchPage(id);
        animatePageIn(id);
      }
    })
    .to(curtain, {
      height: '0%',
      top: 'auto',
      bottom: '0',
      duration: 0.42,
      ease: 'power3.inOut',
      onComplete: () => {
        curtain.style.top = '0';
        curtain.style.bottom = 'auto';
      }
    });
}

// ── 3. CUSTOM CURSOR ──
const dot  = document.getElementById('cursor-dot');
const pill = document.getElementById('cursor-pill');
let mouseX = 0, mouseY = 0;
let dotX = 0,   dotY = 0;
let pillX = 0,  pillY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function lerp(a, b, t) { return a + (b - a) * t; }

function tickCursor() {
  dotX  = lerp(dotX,  mouseX, 0.18);
  dotY  = lerp(dotY,  mouseY, 0.18);
  pillX = lerp(pillX, mouseX, 0.12);
  pillY = lerp(pillY, mouseY, 0.12);
  dot.style.left  = dotX  + 'px';
  dot.style.top   = dotY  + 'px';
  pill.style.left = pillX + 'px';
  pill.style.top  = pillY + 'px';
  requestAnimationFrame(tickCursor);
}
tickCursor();

// Pill reveal on interactive elements (using GAZU class names)
const hoverEls = document.querySelectorAll(
  '.pfcard, .dcard, .pitem, .btn-blk, .btn-out, .tlnk, .clitem, nav a, .nav-logo'
);
hoverEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(pill, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
    gsap.to(dot,  { scale: 0, duration: 0.2 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(pill, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.in' });
    gsap.to(dot,  { scale: 1, duration: 0.2 });
  });
});

// ── 4. MAGNETIC NAV ──
document.querySelectorAll('.nav-left a, .nav-right a').forEach(link => {
  link.addEventListener('mousemove', e => {
    const r = link.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) * 0.3;
    const dy = (e.clientY - (r.top  + r.height / 2)) * 0.3;
    gsap.to(link, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
  });
  link.addEventListener('mouseleave', () => {
    gsap.to(link, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  });
});

// ── 5. NAV ACTIVE PILL ──
const navPill = document.createElement('div');
navPill.id = 'nav-pill';
document.querySelector('nav').appendChild(navPill);

function moveNavPill(el) {
  const navRect = document.querySelector('nav').getBoundingClientRect();
  const elRect  = el.getBoundingClientRect();
  gsap.to(navPill, {
    x:      elRect.left   - navRect.left,
    y:      elRect.top    - navRect.top,
    width:  elRect.width,
    height: elRect.height,
    duration: 0.4,
    ease: 'power3.out'
  });
}

// Init pill on the current active nav link
document.querySelectorAll('.nav-left a, .nav-right a').forEach(link => {
  link.addEventListener('click', () => moveNavPill(link));
  if (link.classList.contains('active')) {
    // Defer until layout is complete
    requestAnimationFrame(() => moveNavPill(link));
  }
});

// ── 6. PAGE-IN ANIMATIONS ──
function animatePageIn(id) {
  if (id === 'home') {
    // initHero() in the inline script handles first-load;
    // on re-entry just fade the eyebrow + bottom elements back in
    gsap.fromTo('.hero-eyebrow p',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.25 }
    );
    gsap.fromTo('#hbl',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.4 }
    );
    gsap.fromTo('#hbr',
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.5 }
    );
    return;
  }

  if (id === 'about') {
    gsap.from('.aname',    { opacity: 0, y: 40,  duration: 0.7, ease: 'power3.out', delay: 0.1 });
    gsap.from('.abio p',   { opacity: 0, y: 25,  duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.2 });
    gsap.from('.adetails', { opacity: 0, x: 30,  duration: 0.6, ease: 'power2.out', delay: 0.3 });
    gsap.from('.stag',     { opacity: 0, y: 15,  duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.45 });
    gsap.from('.avail',    { opacity: 0, y: 15,  duration: 0.4, ease: 'power2.out', delay: 0.6 });
  }

  if (id === 'projects') {
    gsap.from('.ptitle',  { opacity: 0, y: 40,  duration: 0.7, ease: 'power3.out', delay: 0.1 });
    gsap.from('.pfcard',  { opacity: 0, y: 50,  duration: 0.55, stagger: 0.12, ease: 'power2.out', delay: 0.2 });
  }

  if (id === 'skills') {
    gsap.from('.ptitle', { opacity: 0, y: 40,  duration: 0.7, ease: 'power3.out', delay: 0.1 });
    gsap.from('.skbox',  { opacity: 0, y: 40, scale: 0.96, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.2 });
  }

  if (id === 'contact') {
    gsap.from('.ptitle',       { opacity: 0, y: 30,  duration: 0.7, ease: 'power3.out', delay: 0.1 });
    gsap.from('.clitem',       { opacity: 0, x: -20, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.3 });
    gsap.from('.finp, .fta',   { opacity: 0, y: 20,  duration: 0.45, stagger: 0.1, ease: 'power2.out', delay: 0.4 });
  }

  if (id === 'resume') {
    gsap.from('.ptitle', { opacity: 0, y: 40,  duration: 0.7, ease: 'power3.out', delay: 0.1 });
    gsap.from('.tli',    { opacity: 0, x: -25, duration: 0.5, stagger: 0.09, ease: 'power2.out', delay: 0.2 });
    gsap.from('.citem',  { opacity: 0, y: 25,  duration: 0.45, stagger: 0.07, ease: 'power2.out', delay: 0.35 });
  }

  if (id === 'bci') {
    gsap.from('.proj-card', {opacity:0, y:50, duration:0.5, stagger:0.12, delay:0.1});
    gsap.from('.skill-box', {opacity:0, y:30, duration:0.5, stagger:0.08, delay:0.4});
  }
}

// ── 7. CARD HOVER LIFT (projects page + dark cards) ──
document.querySelectorAll('.pfcard, .dcard').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { y: -8, scale: 1.02, duration: 0.3, ease: 'power2.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
  });
});

// ── 8. INIT ──
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('home').style.display = 'block';
});
