// JavaScript to add smooth scroll on page load
document.addEventListener('DOMContentLoaded', function() {
    const introSection = document.querySelector('.intro');
    setTimeout(() => {
        introSection.style.transform = 'translateX(0)';
        introSection.style.opacity = '1';
    }, 500); // Delay for smooth effect
});


 
  // Wait for the page to fully load
  window.addEventListener('load', function () {
    // Select the elements you want to animate
    const introText = document.querySelector('.intro-text');
    const imageWrapper = document.querySelector('.image-wrapper');
    
    // Add the class that triggers the animation
    introText.classList.add('animate-in');
    imageWrapper.classList.add('animate-in');
  });
 
 
 
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
 
