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
  // V6 motion system: scroll-linked movement belongs to CSS ViewTimeline.
  // No scroll-time DOM measurements or JavaScript transform writes.
  // Keep images static in browsers without ViewTimeline or when motion is reduced.
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


/* Maison's Moving Exhibition. Progressive enhancement: original photography remains if JS is unavailable. */
(() => {
  'use strict';
  if (!document.body.classList.contains('page-home')) return;
  const root = document.getElementById('selected-work');
  const oldStory = root?.querySelector('.work-story');
  if (!root || !oldStory || root.dataset.maisonFlow) return;
  const figures = [...oldStory.querySelectorAll('figure[data-photo-id]')];
  const photograph = id => figures.find(figure => Number(figure.dataset.photoId) === id);
  // Original selected imagery: one monumental still followed by the 11-frame editorial sequence.
  const ids = [7, 10, 22, 33, 8, 19, 21, 54, 56, 63, 12];
  if (!photograph(15) || !ids.every(id => photograph(id)?.querySelector('img'))) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = Boolean(navigator.connection?.saveData);

  const styles = document.createElement('style');
  styles.id = 'maison-flow-styles';
  styles.textContent = "/* MAISON KRIZSAN / The Moving Exhibition. Scoped to homepage selected photography. */\n.mflow { --flow-h:clamp(305px,32vw,465px); --flow-gap:clamp(14px,1.75vw,28px); position:relative; padding-bottom:clamp(110px,12vw,184px); overflow:hidden; }\n.mflow .section-heading { align-items:end; padding-bottom:clamp(36px,4.1vw,62px); }\n.mflow .section-heading h2 { margin-top:17px; max-width:800px; font-size:clamp(44px,5.2vw,78px); line-height:1.09; letter-spacing:-.045em; }\n.mflow-viewport { width:100%; overflow-x:auto; overflow-y:hidden; overscroll-behavior-x:contain; scrollbar-width:none; cursor:grab; -webkit-user-select:none; user-select:none; position:relative; }\n.mflow-viewport::-webkit-scrollbar { display:none; }\n.mflow[data-active] .mflow-viewport { overflow:hidden; touch-action:pan-y; }\n.mflow[data-manual] .mflow-viewport { overflow-x:auto; touch-action:auto; cursor:auto; }\n.mflow-viewport.is-dragging { cursor:grabbing; }\n.mflow-rail { display:flex; align-items:center; gap:var(--flow-gap); width:max-content; }\n.mflow[data-active] .mflow-rail { will-change:transform; }\n.mflow-set { display:flex; align-items:center; gap:var(--flow-gap); flex:none; }\n.mflow-set[aria-hidden=\"true\"] { pointer-events:none; }\n.mflow[data-manual] .mflow-set[aria-hidden=\"true\"] { display:none; }\n.mflow-photo { margin:0; height:var(--flow-h); width:calc(var(--flow-h)*var(--photo-ratio)); flex:0 0 auto; min-width:0; background:#e4e0d8; overflow:hidden; }\n.mflow-photo a { display:block; width:100%; height:100%; outline-offset:4px; }\n.mflow-photo img { display:block; height:100%; width:100%; object-fit:contain; object-position:center; pointer-events:none; -webkit-user-drag:none; transition:none!important; transform:none!important; animation:none!important; }\n.mflow-meta { display:flex; justify-content:space-between; align-items:baseline; gap:30px; padding-top:27px; }\n.mflow-meta a { font:500 12px/1.5 Manrope,Arial,sans-serif; text-decoration:none; border-bottom:1px solid #868077; padding-bottom:7px; }\n.mflow-meta a:hover { color:#746f66; }\n.mflow-meta button { border:0; border-bottom:1px solid #868077; color:var(--ink,#21211f); font:500 11px/1.5 Manrope,Arial,sans-serif; background:none; padding:4px 0 7px; cursor:pointer; }\n.mflow-meta button[hidden] { display:none; }\n.mflow-meta button:focus-visible,.mflow-meta a:focus-visible { outline:2px solid currentColor; outline-offset:5px; }\n.mflow-still { padding-top:clamp(118px,13vw,195px); }\n.mflow-still a { display:block; width:100%; text-decoration:none; }\n.mflow-still img { display:block; width:100%; height:auto; max-height:none; object-fit:contain; transform:none!important; animation:none!important; }\n.mflow .selected-more { padding:clamp(60px,7vw,105px) 0 0; }\n@media (max-width:760px) {\n  .mflow { --flow-h:clamp(245px,72vw,316px); --flow-gap:13px; padding-bottom:98px; }\n  .mflow .section-heading { padding-bottom:35px; }\n  .mflow .section-heading h2 { font-size:clamp(42px,9.2vw,59px); line-height:1.1; margin-top:15px; }\n  .mflow-meta { padding-top:22px; gap:15px; }\n  .mflow-meta a { font-size:12px; }\n  .mflow-meta button { font-size:11px; }\n  .mflow-still { padding-top:100px; }\n  .mflow .selected-more { padding-top:64px; }\n}\n@media (prefers-reduced-motion:reduce) {\n  .mflow .mflow-viewport { overflow-x:auto!important; touch-action:auto!important; cursor:auto!important; }\n  .mflow .mflow-rail { transform:none!important; will-change:auto!important; }\n  .mflow .mflow-set[aria-hidden=\"true\"] { display:none!important; }\n}\n";
  document.head.append(styles);

  function makeFrame(id) {
    const photo = photograph(id);
    const original = photo.querySelector('img');
    const figure = document.createElement('figure');
    figure.className = 'mflow-photo';
    const ratio = Number(original.getAttribute('width')) / Number(original.getAttribute('height'));
    figure.style.setProperty('--photo-ratio', String(Number.isFinite(ratio) && ratio > 0 ? ratio : (original.naturalWidth / original.naturalHeight || 1.333)));
    const link = document.createElement('a');
    link.href = '/work';
    link.setAttribute('aria-label', `Explore the photographic work: ${original.alt}`);
    const image = original.cloneNode(true);
    image.removeAttribute('style');
    image.removeAttribute('class');
    image.decoding = 'async';
    image.loading = 'lazy';
    image.draggable = false;
    image.setAttribute('sizes', ratio < 1 ? '(max-width:760px) 245px, 440px' : '(max-width:760px) 425px, 680px');
    link.append(image);
    figure.append(link);
    return figure;
  }

  const heading = root.querySelector('.section-heading');
  const headingText = heading?.querySelector('h2');
  if (headingText) headingText.textContent = 'Places with presence.';
  // Remove competing CTA from old heading if present, and give the strip one understated link.
  heading?.querySelector('a.text-link')?.remove();

  const viewport = document.createElement('div');
  viewport.className = 'mflow-viewport';
  viewport.tabIndex = 0;
  viewport.setAttribute('role', 'region');
  viewport.setAttribute('aria-label', 'Selected Maison Krizsan photographs. Drag or scroll horizontally to browse.');
  const rail = document.createElement('div');
  rail.className = 'mflow-rail';
  const set = document.createElement('div');
  set.className = 'mflow-set';
  ids.forEach(id => set.append(makeFrame(id)));
  rail.append(set);
  viewport.append(rail);

  const meta = document.createElement('div');
  meta.className = 'mflow-meta shell';
  const explore = document.createElement('a');
  explore.href = '/work';
  explore.textContent = 'Explore the photographic work';
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Pause movement';
  button.setAttribute('aria-pressed', 'false');
  meta.append(explore, button);

  const still = document.createElement('figure');
  still.className = 'mflow-still shell';
  const stillLink = document.createElement('a');
  stillLink.href = '/work';
  stillLink.setAttribute('aria-label', 'Explore the photographic work: Arcaded beachfront architecture');
  const stillImage = photograph(15).querySelector('img').cloneNode(true);
  stillImage.className = '';
  stillImage.removeAttribute('style');
  stillImage.removeAttribute('data-cinema');
  stillImage.loading = 'lazy';
  stillImage.decoding = 'async';
  stillImage.setAttribute('sizes', '(max-width:760px) 95vw, 90vw');
  stillLink.append(stillImage);
  still.append(stillLink);
  const more = root.querySelector('.selected-more');
  if (!more) return;
  root.classList.add('mflow');
  root.dataset.maisonFlow = 'true';
  oldStory.remove();
  root.append(viewport, meta, still);

  // Paired tracks make a mathematically seamless wrap without a timed CSS-animation jump.
  const twin = set.cloneNode(true);
  twin.setAttribute('aria-hidden', 'true');
  twin.inert = true;
  twin.querySelectorAll('a').forEach(link => link.tabIndex = -1);
  twin.querySelectorAll('img').forEach(img => { img.alt = ''; img.setAttribute('aria-hidden', 'true'); });
  rail.append(twin);
  root.toggleAttribute('data-manual', reduced.matches || saveData);
  root.toggleAttribute('data-active', !reduced.matches && !saveData);
  let paused = false, hovering = false, focusWithin = false, pressing = false, visible = false;
  let pos = 0, cycle = 1, raf = 0, lastStamp = 0, velocity = 0, momentum = 0, dragDist = 0;
  let lastX = 0, lastTime = 0, suppressClick = false;
  const speed = () => window.innerWidth <= 760 ? 22 : 28;
  const canRun = () => visible && !document.hidden && !paused && !hovering && !focusWithin && !pressing && !reduced.matches && !saveData;
  function paint() { rail.style.transform = `translate3d(${pos.toFixed(2)}px,0,0)`; }
  function wrap() { pos = ((pos % cycle) + cycle) % cycle; if (pos > 0) pos -= cycle; }
  function measure() {
    cycle = Math.max(1, twin.offsetLeft - set.offsetLeft);
    wrap(); paint();
  }
  function stop() { if (raf) cancelAnimationFrame(raf); raf = 0; lastStamp = 0; }
  function start() { if (!raf && (canRun() || (visible && !document.hidden && !paused && Math.abs(momentum) > 2 && !reduced.matches && !saveData))) raf = requestAnimationFrame(step); }
  function step(timestamp) {
    raf = 0;
    const dt = Math.min(50, lastStamp ? timestamp - lastStamp : 16.67);
    lastStamp = timestamp;
    if (!visible || document.hidden || pressing || reduced.matches || saveData) { stop(); return; }
    if (Math.abs(momentum) > 2) {
      pos += momentum * dt / 1000;
      momentum *= Math.exp(-dt / 170);
    } else if (canRun()) {
      momentum = 0;
      pos -= speed() * dt / 1000;
    } else { stop(); return; }
    wrap(); paint(); start();
  }
  function updateButton() {
    button.hidden = reduced.matches || saveData;
    button.textContent = paused ? 'Resume movement' : 'Pause movement';
    button.setAttribute('aria-label', paused ? 'Resume automatic gallery movement' : 'Pause automatic gallery movement');
    button.setAttribute('aria-pressed', String(paused));
  }
  button.addEventListener('click', () => { paused = !paused; momentum = 0; updateButton(); if (paused) stop(); else start(); });
  viewport.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { hovering = true; stop(); } });
  viewport.addEventListener('pointerleave', () => { hovering = false; start(); });
  viewport.addEventListener('focusin', () => { focusWithin = true; stop(); });
  viewport.addEventListener('focusout', e => { if (!viewport.contains(e.relatedTarget)) { focusWithin = false; start(); } });
  viewport.addEventListener('pointerdown', e => {
    if (reduced.matches || saveData || (e.pointerType === 'mouse' && e.button !== 0)) return;
    pressing = true; dragDist = 0; momentum = 0; velocity = 0; suppressClick = false;
    lastX = e.clientX; lastTime = performance.now();
    viewport.classList.add('is-dragging'); stop();
  });
  viewport.addEventListener('pointermove', e => {
    if (!pressing) return;
    const dx = e.clientX - lastX, now = performance.now();
    velocity = dx / Math.max(1,now - lastTime) * 1000;
    const before = dragDist;
    dragDist += Math.abs(dx);
    if (before <= 8 && dragDist > 8) viewport.setPointerCapture?.(e.pointerId);
    pos += dx; wrap(); paint();
    lastX = e.clientX; lastTime = now;
  });
  function release() {
    if (!pressing) return;
    pressing = false;
    viewport.classList.remove('is-dragging');
    suppressClick = dragDist > 8;
    momentum = suppressClick ? Math.max(-320,Math.min(320,velocity * .34)) : 0;
    start();
  }
  viewport.addEventListener('pointerup', release);
  viewport.addEventListener('pointercancel', release);
  viewport.addEventListener('lostpointercapture', release);
  viewport.addEventListener('click', e => {
    if (suppressClick) { e.preventDefault(); e.stopPropagation(); suppressClick = false; }
  },true);
  reduced.addEventListener?.('change', () => {
    root.toggleAttribute('data-manual', reduced.matches || saveData);
    root.toggleAttribute('data-active', !reduced.matches && !saveData);
    momentum = 0; stop(); pos = 0; paint(); measure(); updateButton(); start();
  });
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  window.addEventListener('resize', () => { measure(); start(); }, { passive:true });
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(set);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (!visible) { momentum = 0; stop(); } else start();
    }, { threshold:0.02 }).observe(viewport);
    new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;
      rail.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
      observer.disconnect();
    }, { rootMargin:'600px' }).observe(root);
  } else visible = true;
  updateButton(); measure(); start();
})();
