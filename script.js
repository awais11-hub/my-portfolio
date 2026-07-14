// ===== AOS INIT =====
AOS.init({ duration: 750, once: true, offset: 70, easing: 'ease-out-cubic' });

// ===== NAVBAR SCROLL =====
const navbar       = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.innerHTML = navLinks.classList.contains('open')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// ===== TYPING EFFECT =====
const taglines = [
  'Designing Websites That Build Trust & Drive Results',
  'WordPress & WooCommerce Expert',
  'Elementor | ARMember | PHP | MySQL',
  'Turning Your Vision Into a Live Website',
];
let taglineIndex = 0, charIndex = 0, isDeleting = false;
const taglineEl = document.getElementById('typing-text');

function typeEffect() {
  const current = taglines[taglineIndex];
  if (isDeleting) {
    taglineEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      taglineIndex = (taglineIndex + 1) % taglines.length;
      setTimeout(typeEffect, 600);
      return;
    }
    setTimeout(typeEffect, 38);
  } else {
    taglineEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2400);
      return;
    }
    setTimeout(typeEffect, 58);
  }
}
typeEffect();

// ===== PARTICLES CANVAS =====
const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

function initParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 16000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x    : Math.random() * canvas.width,
      y    : Math.random() * canvas.height,
      r    : Math.random() * 1.8 + 0.4,
      dx   : (Math.random() - 0.5) * 0.35,
      dy   : (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.15,
    });
  }
}
initParticles();

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(167,139,250,${p.alpha})`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    for (let j = i + 1; j < particles.length; j++) {
      const q    = particles[j];
      const dist = Math.hypot(p.x - q.x, p.y - q.y);
      if (dist < 110) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(124,58,237,${0.12 * (1 - dist / 110)})`;
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ===== ANIMATED COUNTERS =====
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.getAttribute('data-target'));
    const start  = performance.now();
    const dur    = 1800;
    const update = now => {
      const t    = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(ease * target);
      if (t < 1) requestAnimationFrame(update);
      else el.textContent = target;
    };
    requestAnimationFrame(update);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

// ===== SKILL BARS =====
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.style.width = entry.target.getAttribute('data-width') + '%';
    skillObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-fill').forEach(f => skillObserver.observe(f));

// ===== SCROLL TO TOP =====
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== SMOOTH SCROLL WITH NAV OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});
