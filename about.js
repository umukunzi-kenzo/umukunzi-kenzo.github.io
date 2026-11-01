// ===== about.js (compact version, no libraries needed) =====

// ===== 0. Floating "Back to top" (works even with reduced motion) =====
(function () {
  const topBtn = document.querySelector('.top-btn');
  if (!topBtn) return;

  const bar = topBtn.querySelector('.top-bar');

  function updateTopBtn() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const amount = scrollable > 0 ? window.scrollY / scrollable : 0;

    // The line along the bottom grows as you scroll down the page
    bar.style.transform = `scaleX(${amount})`;

    // Show the button after scrolling down a bit
    topBtn.classList.toggle('show', window.scrollY > 400);
  }

  window.addEventListener('scroll', updateTopBtn, { passive: true });
  window.addEventListener('resize', updateTopBtn);
  updateTopBtn();
})();

// ===== Page animations =====
(function () {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If the user wants less motion, show everything right away
  if (reduceMotion || !('IntersectionObserver' in window)) {
    root.classList.remove('js');
    return;
  }

  // ===== 1. Fade items in when they enter the screen =====
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const item = entry.target;
        item.classList.add('visible');
        observer.unobserve(item);
        // Remove the delay after the fade, so hover effects stay fast
        setTimeout(() => (item.style.transitionDelay = ''), 1200);
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('[data-reveal]').forEach((item) => {
    // Small delay by position, so cards in the same row appear one after another
    const position = Array.from(item.parentElement.children).indexOf(item);
    item.style.transitionDelay = `${position * 80}ms`;
    observer.observe(item);
  });

  // ===== 2. Thin progress bar at the top =====
  const progress = document.querySelector('.progress');

  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const amount = scrollable > 0 ? window.scrollY / scrollable : 0;
    progress.style.transform = `scaleX(${amount})`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // ===== 3. Soft glow that follows the mouse (desktop only) =====
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const glow = document.querySelector('.spotlight');
    root.classList.add('has-cursor');
    glow.style.transition = 'transform 0.4s ease-out';

    window.addEventListener('mousemove', (event) => {
      glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    });
  }
})();