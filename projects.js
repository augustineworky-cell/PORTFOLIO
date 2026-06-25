// ============================================
// PROJECTS.JS — Projects Page Logic
// ============================================
function openProject(url) {
  window.open(url, '_blank');
}

// Add hover sound or animation effects here
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-2px)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});
