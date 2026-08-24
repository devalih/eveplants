const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');

function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  navigation?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(willOpen));
  navigation?.classList.toggle('is-open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  document.querySelectorAll('video').forEach((video) => video.pause());
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !prefersReducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
