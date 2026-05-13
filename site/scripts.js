/*
  Breizh Agrimat V2 — Common Scripts
  Handles: i18n init, scroll reveal, GSAP animations,
  Lenis smooth scroll, Splide carousels, header scroll,
  mobile nav, counter animations
*/

// ===== HEADER SCROLL =====
(function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===== MOBILE NAV =====
(function initMobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.mobile-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ===== LANGUAGE SWITCHER =====
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (typeof I18N !== 'undefined') {
      I18N.setLang(btn.dataset.lang);
    }
  });
});

// ===== SCROLL REVEAL =====
function initReveal() {
  if (typeof IntersectionObserver === 'undefined') {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ===== ANIMATED COUNTERS =====
function animateCounter(el, target, suffix) {
  if (!el || !target) return;
  suffix = suffix || '';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = target + suffix;
    return;
  }
  let current = 0;
  const step = Math.max(1, Math.floor(target / 30));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = current.toLocaleString('en-GB') + suffix;
  }, 40);
}

function initCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter, 10);
    const suffix = el.dataset.counterSuffix || '';
    if (typeof IntersectionObserver === 'undefined') {
      el.textContent = target + suffix;
      return;
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(el, target, suffix);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
  });
}


// ===== GSAP HERO ANIMATIONS =====
function initHeroAnimations() {
  if (typeof gsap === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroTag = document.querySelector('.hero-tag');
  const heroTitle = document.querySelector('.hero h1');
  const heroSub = document.querySelector('.hero-sub');
  const heroCtas = document.querySelector('.hero-ctas');
  const heroStats = document.querySelector('.hero-stats');

  if (!heroTitle) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (heroTag) {
    tl.fromTo(heroTag, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.1);
  }

  tl.fromTo(heroTitle, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.2);

  if (heroSub) {
    tl.fromTo(heroSub, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 0.4);
  }
  if (heroCtas) {
    tl.fromTo(heroCtas, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6 }, 0.55);
  }
  if (heroStats) {
    tl.fromTo(heroStats, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.7);
  }
}

// ===== GSAP SCROLL ANIMATIONS =====
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.pillar').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.1,
        scrollTrigger: { trigger: card, start: 'top 85%', once: true }
      }
    );
  });

  document.querySelectorAll('.step').forEach((step, i) => {
    gsap.fromTo(step,
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0, duration: 0.5, delay: i * 0.1,
        scrollTrigger: { trigger: step, start: 'top 85%', once: true }
      }
    );
  });

  document.querySelectorAll('.testimonial').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.5, delay: i * 0.12,
        scrollTrigger: { trigger: card, start: 'top 85%', once: true }
      }
    );
  });
}

// ===== SPLIDE INIT =====
function initSplide() {
  if (typeof Splide === 'undefined') return;

  document.querySelectorAll('.splide.testimonials-slider').forEach(el => {
    new Splide(el, {
      type: 'slide',
      perPage: 3,
      gap: '1.5rem',
      pagination: false,
      arrows: true,
      breakpoints: {
        1024: { perPage: 2 },
        768: { perPage: 1 },
      },
    }).mount();
  });
}

// ===== COMMON UTILITIES =====
const WA_PATH = 'M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 0 0 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411';

function eur(n) {
  return n ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n) : (typeof I18N !== 'undefined' ? I18N.t('stock.onrequest') : 'On request');
}
function num(n) {
  return n ? new Intl.NumberFormat('en-GB').format(n) : '—';
}
function waLink(eq) {
  const txt = `Hello Esteban, I'm interested in the ${eq.brand} ${eq.model} (${eq.year}). Could you send more info / photos?`;
  return `https://wa.me/33769499010?text=${encodeURIComponent(txt)}`;
}

// ===== MOBILE FILTER BAR HIDE ON SCROLL =====
function initFilterScroll() {
  var filters = document.querySelector('.filters');
  if (!filters || window.innerWidth > 768) return;
  var lastY = window.scrollY;
  window.addEventListener('scroll', function() {
    var y = window.scrollY;
    if (y > lastY && y > 140) {
      filters.classList.add('filters--hidden');
    } else {
      filters.classList.remove('filters--hidden');
    }
    lastY = y;
  }, {passive: true});
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  if (typeof I18N !== 'undefined') I18N.init();
  initReveal();
  initCounters();
  initHeroAnimations();
  initScrollAnimations();
  initSplide();
  initFilterScroll();
});
