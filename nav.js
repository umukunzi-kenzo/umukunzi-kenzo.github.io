// Get the menu button and the menu list
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// On small screens "Let's Talk" lives inside the menu, so it never blocks the bar.
// We build that menu item here, so every page gets it without editing its HTML.
const ctaLink = document.querySelector('.nav-cta');

if (ctaLink && !navMenu.querySelector('.nav-menu-cta')) {
  const item = document.createElement('li');
  item.className = 'nav-menu-cta';

  const link = document.createElement('a');
  link.href = ctaLink.getAttribute('href');
  link.textContent = ctaLink.textContent;

  item.appendChild(link);
  navMenu.appendChild(item);
}

// In order to open or close the menu, we add or remove the "open" class
function setMenu(isOpen) {
  navMenu.classList.toggle('open', isOpen);
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
}

navToggle.addEventListener('click', () => {
  setMenu(!navMenu.classList.contains('open'));
});

// Close the menu after tapping a link
navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

// Close the menu when tapping outside it, or pressing Esc
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-nav')) setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

// Close the menu if the screen becomes wide (for example, rotating a tablet)
window.matchMedia('(min-width: 769px)').addEventListener('change', (event) => {
  if (event.matches) setMenu(false);
});