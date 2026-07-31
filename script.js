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

  /* ---- Scroll reveal ------------------------------------------------------
     Per house system spec: opacity 0 -> 100%, Y translate 12-18px max,
     duration 1.2-1.8s, ease: easeInOut. No spring, no bounce, no scale.
     Luxury moves slowly — each section fades in once, on first approach,
     and never re-triggers on scroll-back. Respects prefers-reduced-motion
     by doing nothing at all (elements stay visible, no motion). */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.house, .philosophy .pillar, .works__grid .work, .house-note, .standard__content, ' +
      '.collection .pillar, .journal-card, .collaborate, .provenance'
    );

    revealTargets.forEach(function (el) {
      el.classList.add('reveal');
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
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

})();
