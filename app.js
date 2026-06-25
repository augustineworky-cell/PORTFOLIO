// ============================================
// APP.JS — Main Navigation Controller
// ============================================
function go(id) {
  // Hide home
  const home = document.getElementById('home');
  home.style.display = 'none';

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Remove active nav
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  // Show selected
  if (id === 'home') {
    home.style.display = 'flex';
  } else {
    const page = document.getElementById(id);
    if (page) page.classList.add('active');
  }

  // Set active nav
  const navEl = document.getElementById('nav-' + id);
  if (navEl) navEl.classList.add('active');

  window.scrollTo(0, 0);
}

// Init — show home on load
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('home').style.display = 'flex';
});
