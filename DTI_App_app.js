/* ──────────────────────────────────────────
   DTI App — JavaScript
────────────────────────────────────────── */

'use strict';

// ── NAV SCROLL BEHAVIOUR ────────────────
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // scrolled class
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // active nav link
  let current = '';
  sections.forEach(function(sec) {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(function(link) {
    link.classList.toggle('active', link.dataset.section === current);
  });

  // reveal elements
  revealElements();
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── HAMBURGER MENU ──────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close menu on link click
navLinksContainer.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

// ── SCROLL REVEAL ───────────────────────
function revealElements() {
  const reveals = document.querySelectorAll('.reveal');
  const windowH = window.innerHeight;
  reveals.forEach(function(el) {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowH - 80) {
      el.classList.add('visible');
    }
  });
}
revealElements();

// ── SMOOTH SCROLL ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});

// ── COUNTER ANIMATION ───────────────────
function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = 'true';

  const rawText = el.textContent.trim();
  // Extract numeric portion and suffix
  const match = rawText.match(/^([+\-]?)([\d.]+)(.*)$/);
  if (!match) return;

  const prefix = match[1] || '';
  const target = parseFloat(match[2]);
  const suffix = match[3] || '';
  const isFloat = match[2].includes('.');
  const duration = 1400;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = target * ease;
    el.textContent = prefix + (isFloat ? value.toFixed(1) : Math.round(value)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Observe stat numbers
const statNums = document.querySelectorAll('.stat-card-num, .stat-num, .ev-num, .impact-val');
const counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(function(el) { counterObserver.observe(el); });

// ── TOOL CARD HOVER RIPPLE ──────────────
document.querySelectorAll('.tool-card').forEach(function(card) {
  card.addEventListener('mouseenter', function(e) {
    this.style.setProperty('--gx', e.offsetX + 'px');
    this.style.setProperty('--gy', e.offsetY + 'px');
  });
});

// ── PROGRESS BAR ON SCROLL ─────────────
const progressBar = document.createElement('div');
progressBar.style.cssText = [
  'position:fixed',
  'top:0',
  'left:0',
  'height:3px',
  'background:linear-gradient(90deg,#065A82,#17C3B2)',
  'z-index:9999',
  'transition:width 0.1s linear',
  'width:0',
  'pointer-events:none',
].join(';');
document.body.appendChild(progressBar);

window.addEventListener('scroll', function() {
  const scrollTop = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
  progressBar.style.width = pct + '%';
}, { passive: true });

// ── BACK TO TOP ─────────────────────────
const backTop = document.createElement('button');
backTop.innerHTML = '↑';
backTop.setAttribute('aria-label', 'Back to top');
backTop.style.cssText = [
  'position:fixed',
  'bottom:28px',
  'right:24px',
  'width:44px',
  'height:44px',
  'border-radius:50%',
  'background:#17C3B2',
  'color:#021526',
  'border:none',
  'font-size:18px',
  'font-weight:700',
  'cursor:pointer',
  'z-index:200',
  'opacity:0',
  'transform:translateY(12px)',
  'transition:opacity 0.3s,transform 0.3s',
  'box-shadow:0 4px 20px rgba(23,195,178,0.35)',
].join(';');
document.body.appendChild(backTop);

window.addEventListener('scroll', function() {
  if (window.scrollY > 400) {
    backTop.style.opacity = '1';
    backTop.style.transform = 'translateY(0)';
  } else {
    backTop.style.opacity = '0';
    backTop.style.transform = 'translateY(12px)';
  }
}, { passive: true });

backTop.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

console.log('%cDTI Problem Statement App', 'color:#17C3B2;font-size:16px;font-weight:bold;font-family:monospace');
console.log('%cEdTech vs Phone Distraction — Built for GitHub Portfolio', 'color:#94A3B8;font-size:12px');
