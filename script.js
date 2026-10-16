(() => {
  'use strict';
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = String(new Date().getFullYear()));
  // Progressive video enhancement: first show the genuine still; only reveal motion on successful playback.
  const heroVideo = document.getElementById('maison-hero-video');
  if (heroVideo) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = navigator.connection?.saveData || false;
    const canAnimate = () => !reduceMotion.matches && !saveData;
    let requested = false;
    function startHeroVideo() {
      if (!canAnimate() || document.hidden) return;
      if (!requested) { heroVideo.src = heroVideo.dataset.src; requested = true; }
      const promise = heroVideo.play();
      if (promise && typeof promise.catch === 'function') promise.catch(() => heroVideo.classList.remove('is-playing'));
    }
    function stopHeroVideo() { heroVideo.pause(); heroVideo.classList.remove('is-playing'); }
    heroVideo.addEventListener('playing', () => heroVideo.classList.add('is-playing'));
    heroVideo.addEventListener('error', stopHeroVideo);
    heroVideo.addEventListener('stalled', () => { if (heroVideo.readyState < 2) heroVideo.classList.remove('is-playing'); });
    reduceMotion.addEventListener?.('change', () => canAnimate() ? startHeroVideo() : stopHeroVideo());
    document.addEventListener('visibilitychange', () => document.hidden ? stopHeroVideo() : startHeroVideo());
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) startHeroVideo(); else stopHeroVideo();
      }, { threshold: 0.05 });
      observer.observe(heroVideo.closest('.cover'));
    } else startHeroVideo();
  }
  const toggle = document.querySelector('.nav-toggle');
  const mobile = document.getElementById('mobile-nav');
  const onWork = document.body.classList.contains('page-work');
  document.querySelectorAll('[data-nav]').forEach(a => { if (a.dataset.nav === (onWork ? 'work' : 'home')) a.setAttribute('aria-current', 'page'); });
  let prevFocus = null;
  function closeMenu(focus = false) {
    if (!toggle || !mobile || mobile.hidden) return;
    mobile.hidden = true;
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    if (focus) toggle.focus();
  }
  function openMenu() {
    if (!toggle || !mobile) return;
    prevFocus = document.activeElement;
    mobile.hidden = false;
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    mobile.querySelector('a')?.focus();
  }
  toggle?.addEventListener('click', () => mobile?.hidden ? openMenu() : closeMenu(true));
  mobile?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(true); });
  document.addEventListener('pointerdown', e => { if (mobile && !mobile.hidden && !e.target.closest('.site-header')) closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
  // Keep keyboard focus inside the expanded mobile menu until it is dismissed.
  mobile?.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const visible = [...mobile.querySelectorAll('a')];
    const first = visible[0], last = visible[visible.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); toggle?.focus(); }
    if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); toggle?.focus(); }
  });
  const copy = document.querySelector('.copy-email');
  copy?.addEventListener('click', async () => {
    const note = document.querySelector('.copy-notice');
    try { await navigator.clipboard.writeText(copy.dataset.email); if (note) note.textContent = 'Email address copied.'; }
    catch { if (note) note.textContent = 'Please select and copy the email address.'; }
  });
  const dialog = document.querySelector('.lightbox');
  if (!dialog) return;
  let photos = [];
  try { photos = JSON.parse(document.getElementById('photo-data')?.textContent || '[]'); }
  catch (err) { console.error('Unable to load the photo manifest', err); }
  if (!photos.length) return;
  let active = 0, opener = null, touchStart = null;
  const image = dialog.querySelector('.lightbox-image');
  const label = dialog.querySelector('.lightbox-caption');
  function setImage(index) {
    active = (index + photos.length) % photos.length;
    const photo = photos[active];
    image.src = photo.url;
    image.alt = photo.alt;
    label.textContent = photo.alt;
  }
  function openImage(id, button) {
    const index = photos.findIndex(x => x.id === id);
    if (index < 0) return;
    opener = button;
    setImage(index);
    try { dialog.showModal(); } catch (e) { console.error('Image viewer could not open', e); return; }
    document.body.style.overflow = 'hidden';
    dialog.querySelector('.lightbox-close').focus();
  }
  function closeImage() { if (dialog.open) dialog.close(); }
  document.querySelectorAll('.gallery-open').forEach(button => button.addEventListener('click', () => openImage(Number(button.dataset.imageId), button)));
  dialog.querySelector('.lightbox-close').addEventListener('click', closeImage);
  dialog.querySelector('.lightbox-next').addEventListener('click', () => setImage(active + 1));
  dialog.querySelector('.lightbox-prev').addEventListener('click', () => setImage(active - 1));
  dialog.addEventListener('click', e => { if (e.target === dialog) closeImage(); });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; image.removeAttribute('src'); opener?.focus(); });
  dialog.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); setImage(active + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); setImage(active - 1); }
  });
  image.addEventListener('touchstart', e => { touchStart = e.touches[0]?.clientX ?? null; }, { passive: true });
  image.addEventListener('touchend', e => {
    if (touchStart === null) return;
    const delta = (e.changedTouches[0]?.clientX ?? touchStart) - touchStart;
    if (Math.abs(delta) > 52) setImage(active + (delta < 0 ? 1 : -1));
    touchStart = null;
  }, { passive: true });
})();
