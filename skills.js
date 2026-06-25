// ============================================
// SKILLS.JS — Skills Page Logic
// ============================================
// Animate skill percentages on load
function animateSkills() {
  document.querySelectorAll('.skill-pct').forEach(el => {
    el.style.opacity = '0';
    setTimeout(() => {
      el.style.transition = 'opacity 0.5s ease';
      el.style.opacity = '1';
    }, 300);
  });
}
animateSkills();
