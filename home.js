// ============================================
// HOME.JS — Hero Slideshow (legacy guard)
// ============================================
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.sdot');
const counter = document.getElementById('counter');

if (slides.length > 0) {
  let cur = 0;
  let timer;

  function switchSlide(idx) {
    slides[cur].classList.remove('active');
    if (dots[cur]) dots[cur].classList.remove('active');
    cur = idx;
    slides[cur].classList.add('active');
    if (dots[cur]) dots[cur].classList.add('active');
    if (counter) counter.textContent = String(cur + 1).padStart(2, '0') + ' / 0' + slides.length;
    clearInterval(timer);
    timer = setInterval(() => switchSlide((cur + 1) % slides.length), 6000);
  }
  timer = setInterval(() => switchSlide((cur + 1) % slides.length), 6000);
}
