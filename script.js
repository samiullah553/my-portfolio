// ============================================================
// SAMIULLAH — DEVOPS PORTFOLIO — script.js
// ============================================================

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ── TYPING ANIMATION ── */
const commands = [
  'whoami',
  'cat skills.txt',
  'terraform apply',
  'kubectl get pods',
  'docker ps -a',
  'aws ecs list-clusters',
];
let cmdIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedCmd');

function typeCmd() {
  const current = commands[cmdIndex];
  if (isDeleting) {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      cmdIndex = (cmdIndex + 1) % commands.length;
      setTimeout(typeCmd, 500);
      return;
    }
    setTimeout(typeCmd, 60);
  } else {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeCmd, 1800);
      return;
    }
    setTimeout(typeCmd, 90);
  }
}
typeCmd();

/* ── SKILL BARS — animate on scroll ── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const width = el.getAttribute('data-width');
      el.style.width = width + '%';
      skillObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(el => skillObserver.observe(el));

/* ── FADE-UP ANIMATIONS ── */
const fadeEls = document.querySelectorAll(
  '.skill-category, .project-card, .timeline-item, .about-card, .highlight, .contact-card'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => fadeObserver.observe(el));

/* ── ACTIVE NAV LINK ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

/* ── CONTACT FORM ── */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !subject || !message) {
    showToast('Please fill in all fields.', 'error');
    return;
  }

  // Simulate sending
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  setTimeout(() => {
    submitBtn.textContent = '✓ Message Sent!';
    form.reset();
    showToast('Message sent! I\'ll get back to you soon.', 'success');
    setTimeout(() => {
      submitBtn.textContent = 'Send Message →';
      submitBtn.disabled = false;
    }, 3000);
  }, 1500);
});

/* ── TOAST NOTIFICATION ── */
function showToast(msg, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem;
    background: ${type === 'success' ? 'var(--accent)' : '#ff5f56'};
    color: ${type === 'success' ? '#000' : '#fff'};
    font-family: var(--font-mono); font-size: 0.82rem;
    padding: 0.85rem 1.5rem;
    border-radius: 8px;
    z-index: 9999;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
    max-width: 320px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ── SMOOTH SCROLL OFFSET (for fixed navbar) ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});
