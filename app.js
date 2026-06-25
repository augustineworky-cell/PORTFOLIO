// ============================================
// APP.JS — Navigation with GSAP transitions
// ============================================
function go(id) {
  const curtain = document.getElementById('curtain');
  const home = document.getElementById('home');

  gsap.to(curtain, {
    scaleY: 1,
    duration: 0.32,
    ease: 'power3.in',
    transformOrigin: 'bottom center',
    onComplete: () => {
      // Hide everything
      home.style.display = 'none';
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));

      // Show target
      if (id === 'home') {
        home.style.display = 'block';
      } else {
        const p = document.getElementById(id);
        if (p) p.classList.add('active');
      }

      // Update nav active state
      const navEl = document.getElementById('nav-' + id);
      if (navEl) navEl.classList.add('active');

      window.scrollTo(0, 0);

      // Curtain reveal
      gsap.to(curtain, {
        scaleY: 0,
        duration: 0.38,
        ease: 'power3.out',
        transformOrigin: 'top center',
        delay: 0.05
      });

      // Page animations
      if (typeof animatePageIn === 'function') animatePageIn(id);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('home').style.display = 'block';
});
