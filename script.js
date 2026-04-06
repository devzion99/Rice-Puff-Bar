/* ═══════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.usp-card, .testi-card, .compare-table-wrapper, .proof-stat, .section-header')
  .forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
    revealObserver.observe(el);
  });

/* ═══════════════════════════════════════════════
   NAV: ACTIVE SECTION HIGHLIGHT
═══════════════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--choc-dark)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => sectionObserver.observe(s));

/* ═══════════════════════════════════════════════
   NAV: BACKGROUND ON SCROLL
═══════════════════════════════════════════════ */
const navWrapper = document.querySelector('.nav-wrapper');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navWrapper.style.boxShadow = '0 2px 24px rgba(26,10,0,0.10)';
  } else {
    navWrapper.style.boxShadow = 'none';
  }
}, { passive: true });

/* ═══════════════════════════════════════════════
   SMOOTH SCROLL FOR ANCHOR LINKS
═══════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ═══════════════════════════════════════════════
   BAR PARALLAX ON MOUSE MOVE
═══════════════════════════════════════════════ */
const barWrapper = document.querySelector('.bar-wrapper');
if (barWrapper) {
  document.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 10;
    const y = (e.clientY / innerHeight - 0.5) * 6;
    barWrapper.style.transform = `rotate(${-3 + x * 0.3}deg) rotateX(${-y * 0.5}deg) translateY(${-y * 0.5}px)`;
  });
  document.addEventListener('mouseleave', () => {
    barWrapper.style.transform = 'rotate(-3deg)';
  });
}

/* ═══════════════════════════════════════════════
   FLOATING CHIPS PARALLAX
═══════════════════════════════════════════════ */
const floatingChips = document.querySelectorAll('.floating-chip');
if (floatingChips.length) {
  document.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const xFactor = (e.clientX / innerWidth - 0.5);
    const yFactor = (e.clientY / innerHeight - 0.5);
    floatingChips.forEach((chip, i) => {
      const depth = (i + 1) * 8;
      chip.style.transform = `translate(${xFactor * depth}px, ${yFactor * depth}px)`;
    });
  });
}

/* ═══════════════════════════════════════════════
   TICKER PAUSE / RESUME
═══════════════════════════════════════════════ */
// Already handled via CSS :hover — nothing extra needed.

/* ═══════════════════════════════════════════════
   MOBILE NAV TOGGLE (HAMBURGER)
═══════════════════════════════════════════════ */
const hamburger = document.querySelector('.nav-hamburger');
const navLinksList = document.querySelector('.nav-links');

if (hamburger && navLinksList) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinksList.style.display === 'flex';
    if (isOpen) {
      navLinksList.style.display = '';
      navLinksList.style.cssText = '';
    } else {
      navLinksList.style.cssText = `
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 68px;
        left: 0;
        right: 0;
        background: rgba(253,246,236,0.97);
        backdrop-filter: blur(16px);
        padding: 24px;
        gap: 20px;
        box-shadow: 0 8px 30px rgba(26,10,0,0.12);
        z-index: 99;
      `;
    }
  });

  // Close on link click
  navLinksList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinksList.style.cssText = '';
    });
  });
}
