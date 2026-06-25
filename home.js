// ============================================
// HOME.JS — Hero Slideshow
// ============================================
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.sdot');
const counter = document.getElementById('counter');
let cur = 0;
let timer;

function switchSlide(idx) {
  slides[cur].classList.remove('active');
  dots[cur].classList.remove('active');
  cur = idx;
  slides[cur].classList.add('active');
  dots[cur].classList.add('active');
  if (counter) counter.textContent = String(cur + 1).padStart(2, '0') + ' / 03';
  clearInterval(timer);
  timer = setInterval(() => switchSlide((cur + 1) % 3), 6000);
}
timer = setInterval(() => switchSlide((cur + 1) % 3), 6000);
