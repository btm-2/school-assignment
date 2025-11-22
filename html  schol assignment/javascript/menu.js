document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  console.log('menu.js loaded', { burgerExists: !!burger, navExists: !!nav, navLinksCount: navLinks.length });

  if (!burger) console.warn('.burger element not found');
  if (!nav) console.warn('.nav-links element not found');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('active');
      burger.classList.toggle('active');
      console.log('toggled menu', nav.classList.contains('active'));
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
        console.log('nav link clicked - menu closed');
      });
    });

    document.addEventListener('click', (e) => {
      if (!burger.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('active');
        burger.classList.remove('active');
      }
    });
  }
});