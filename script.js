// ============ NAV SCROLL STATE ============
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}, { passive: true });

// ============ MOBILE MENU ============
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ============ SCROLL REVEAL (IntersectionObserver) ============
const revealEls = document.querySelectorAll('.reveal-up, .fade-in, .reveal-line, .reveal-zoom');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Hero elements should reveal immediately on load, not on scroll
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hero .fade-in, .hero .reveal-line').forEach(el => {
    setTimeout(() => el.classList.add('in-view'), 100);
  });
});

// ============ FAQ ACCORDION ============
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');

  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // close all others
    document.querySelectorAll('.faq-item.open').forEach(other => {
      if (other !== item) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      }
    });

    if (isOpen) {
      item.classList.remove('open');
      a.style.maxHeight = null;
    } else {
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// ============ SUBTLE PARALLAX ON HERO GLOW ============
const heroGlowA = document.querySelector('.hero-glow--a');
const heroGlowB = document.querySelector('.hero-glow--b');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    if (heroGlowA) heroGlowA.style.setProperty('--py', `${y * 0.18}px`);
    if (heroGlowB) heroGlowB.style.setProperty('--py', `${y * -0.12}px`);
  }
}, { passive: true });
