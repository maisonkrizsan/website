/* ==========================================================================
   MAISON KRIZSAN — script.js
   Vanilla JS only. No frameworks, no dependencies.
   ========================================================================== */

(function () {
  'use strict';

  /* ---- Header state on scroll ------------------------------------------ */
  const header = document.getElementById('site-header');
  const SCROLL_THRESHOLD = 40;

  function updateHeaderState() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  /* ---- Mobile nav toggle ------------------------------------------------ */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    function setMenuState(isOpen) {
      navMenu.classList.toggle('is-open', isOpen);
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('nav-locked', isOpen);
    }

    navToggle.addEventListener('click', function () {
      const isOpen = !navMenu.classList.contains('is-open');
      setMenuState(isOpen);
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuState(false);
      });
    });

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        setMenuState(false);
        navToggle.focus();
      }
    });

    /* Close the menu on resize back to desktop width, so it never gets
       stuck open behind the desktop nav layout. */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860 && navMenu.classList.contains('is-open')) {
        setMenuState(false);
      }
    });
  }

})();
