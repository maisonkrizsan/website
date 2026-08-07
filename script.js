/* ==========================================================================
   MAISON KRIZSAN — script.js
   Vanilla JS only. No frameworks, no dependencies.
   ========================================================================== */

(function () {
  'use strict';

  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const SCROLL_THRESHOLD = 40;

  /* ---- Header state on scroll ------------------------------------------ */
  if (header) {
    function updateHeaderState() {
      header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
    }

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }

  /* ---- Mobile navigation ------------------------------------------------ */
  if (navToggle && navMenu) {
    function setMenuState(isOpen) {
      navMenu.classList.toggle('is-open', isOpen);
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-locked', isOpen);
    }

    navToggle.addEventListener('click', function () {
      setMenuState(!navMenu.classList.contains('is-open'));
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuState(false);
      });
    });

    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
        setMenuState(false);
        navToggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860 && navMenu.classList.contains('is-open')) {
        setMenuState(false);
      }
    });
  }

  /* ---- Scroll reveal ---------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.works__grid .work, .commission__title, .commission__copy, .service, ' +
      '.method__heading, .method__copy, .method__sequence, .house__heading, ' +
      '.house__copy, .identity, .philosophy .pillar, .standard__content, ' +
      '.collaborate, .provenance, .work-index__heading, .work-index__page-label, .pagination, .work-commission'
    );

    revealTargets.forEach(function (element) {
      element.classList.add('reveal');
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' }
    );

    revealTargets.forEach(function (element) {
      observer.observe(element);
    });
  }
})();
