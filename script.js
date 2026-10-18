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


/* MAISON KRIZSAN · Final photographic editorial / homepage-only */
(() => {
  'use strict';
  if (!document.body.classList.contains('page-home')) return;
  const section = document.getElementById('selected-work');
  const studio = document.getElementById('studio');
  const commissions = document.getElementById('commissions');
  if (!section || !studio || !commissions || section.dataset.maisonFinal === 'true') return;

  const PHOTO = {"7":["batch-01/destination-07",0.75,"Chandelier within a tall arched interior"],"8":["batch-01/destination-08",0.75,"Formal landscape paths with cypress trees"],"9":["batch-01/destination-09",0.75,"Stone pavilion with terracotta dome and columns"],"10":["batch-01/destination-10",0.75,"Palm-lined entrance at dusk"],"12":["batch-01/destination-12",1.3333,"Grand white coastal hotel"],"14":["batch-01/destination-14",1.3333,"Afternoon light through arched curtains"],"15":["batch-01/destination-15",1.3333,"Arcaded beachfront architecture overlooking the sea"],"17":["batch-01/destination-17",1.3333,"Pacific shoreline from above"],"18":["batch-01/destination-18",1.3333,"Coastal garden overlooking the beach"],"19":["batch-01/destination-19",1.3333,"Classical coastal architecture with sculptural balustrade"],"21":["batch-01/destination-21",1.3333,"Architectural skylight viewed from beneath"],"22":["batch-01/destination-22",1.3333,"Modern sculptural architecture beneath blue sky"],"2":["batch-01/destination-02",1.33,"Tropical courtyard with wicker seating"],"4":["batch-01/destination-04",0.75,"Warm dining room and shelving"],"6":["batch-01/destination-06",0.75,"Golden stone arches in afternoon light"],"29":["batch-02/IMG_0767-1791703961",0.75,"Warm chandeliers in an elegant lobby"],"30":["batch-02/IMG_0778-1791703960",0.75,"Shaded garden courtyard with olive trees"],"31":["batch-02/IMG_0788-2-1791703960",0.75,"Pale architecture among mature trees"],"32":["batch-02/IMG_0816-1791704243",0.75,"Intimate lounge under a tall arched window"],"33":["batch-02/IMG_0826-1791704242",0.75,"Chandelier before grand symmetrical windows"],"35":["batch-02/IMG_0893-1791704243",0.75,"Warm light illuminating shelving and interiors"],"36":["batch-02/IMG_0940",0.75,"Tropical courtyard and still water"],"37":["batch-02/IMG_0945-2-1791705054",0.75,"Property facade illuminated at night"],"38":["batch-02/IMG_1106-2-1791706030",0.75,"Multi-level interior with warm architectural lights"],"39":["batch-02/IMG_1250-1791706031",1.3333,"Firelit lounge and inviting chairs"],"40":["batch-02/IMG_1396",1.3333,"Turquoise Pacific coast from above"],"42":["batch-02/IMG_1404",1.3333,"Monochrome shore and waves"],"43":["batch-02/IMG_1411",1.3333,"Sweeping beach and coastal hills"],"45":["batch-02/IMG_1464",1.3333,"Coastal gardens and distant hills"],"46":["batch-02/IMG_1480",1.3333,"Arched open doorway into an illuminated interior"],"47":["batch-02/IMG_1494",1.304,"Arched windows and chandelier in a luminous room"],"48":["batch-02/IMG_1497",1.3333,"Black and white view through curved windows"],"51":["batch-02/IMG_1515",1.3333,"White stairway among palm trees"],"52":["batch-02/IMG_1533",1.3333,"Brick walkway leading to sunlit architecture"],"54":["batch-02/IMG_1566",1.3333,"Ornate domed ceiling and decorative fixture"],"55":["batch-02/IMG_1581",1.3333,"Natural diagonal light across a wood table"],"56":["batch-02/IMG_1583",1.3333,"Architectural staircase seen from above"],"57":["batch-02/IMG_1636",0.75,"Dark green marble interior detail"],"58":["batch-02/IMG_1647",1.3333,"Geometric roof architecture and staircase"],"59":["batch-02/IMG_1650",1.3333,"Contemporary curved glass architecture"],"63":["batch-02/IMG_1677",1.3333,"Contemporary glass and steel architecture"],"64":["batch-02/IMG_1684",1.3333,"Warm light against a textured exterior wall"],"65":["batch-02/IMG_2016-1791706031",0.75,"Lounge seating framed against the trees"],"66":["batch-02/IMG_2021-1791706031",1.3333,"Coastal sunset with silhouettes of palms"],"74":["batch-02/krizsan-standard-bg",1.3104013104013104,"Symmetrical warm stone lobby with circular lighting"]};
  const BUCKETS = {"architecture":[22,19,21,54,58,63,9,33,56,51,59],"setting":[10,12,66,43,17,40,45,18,36,8,31,37],"interiors":[7,29,38,47,32,39,4,74,35,46,14],"details":[55,57,48,64,42,2,30,65,52]};
  const css = "/* MAISON KRIZSAN · editorial finale | deterministic geometry, curated variability */\n#selected-work.maison-edition {position:relative;padding:0 0 clamp(105px,12vw,182px);overflow:hidden}\n.maison-edition .section-heading{padding-bottom:clamp(38px,4.1vw,63px);align-items:end;gap:35px}\n.maison-edition .section-heading h2{margin-top:14px;font:400 clamp(45px,5.4vw,81px)/1.08 Marcellus,Georgia,serif;letter-spacing:-.045em;max-width:820px}\n.maison-edition .section-heading .text-link{flex:none}\n.maison-ribbon-viewport{width:100%;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;overscroll-behavior-x:contain;position:relative;cursor:grab;touch-action:pan-y;user-select:none;-webkit-user-select:none}\n.maison-ribbon-viewport::-webkit-scrollbar{display:none}\n.maison-edition[data-moving] .maison-ribbon-viewport{overflow:hidden}\n.maison-edition[data-manual] .maison-ribbon-viewport{overflow-x:auto;touch-action:pan-x pan-y;cursor:auto}\n.maison-ribbon-viewport.is-dragging{cursor:grabbing}\n.maison-ribbon-track{display:flex;gap:var(--ribbon-gap);width:max-content;align-items:center;transform:translate3d(0,0,0)}\n.maison-edition[data-moving] .maison-ribbon-track{will-change:transform}\n.maison-ribbon-set{display:flex;flex:none;align-items:center;gap:var(--ribbon-gap)}\n.maison-ribbon-set[aria-hidden=true]{pointer-events:none}\n.maison-edition[data-manual] .maison-ribbon-set[aria-hidden=true]{display:none}\n.maison-edition{--ribbon-height:clamp(325px,34vw,485px);--ribbon-gap:clamp(13px,1.7vw,26px)}\n.maison-ribbon-photo{height:var(--ribbon-height);width:calc(var(--ribbon-height) * var(--ratio));flex:none;margin:0;min-width:0;overflow:hidden;background:#e0dbd2}\n.maison-ribbon-photo a{display:block;height:100%;width:100%;cursor:inherit}\n.maison-ribbon-photo img{height:100%;width:100%;display:block;object-fit:contain;object-position:center;pointer-events:none;transform:none!important;animation:none!important;transition:none!important;-webkit-user-drag:none}\n.maison-ribbon-bottom{display:flex;align-items:center;justify-content:space-between;gap:25px;padding-top:27px}\n.maison-ribbon-bottom>a{text-decoration:none;border-bottom:1px solid #807b72;padding-bottom:8px;font:500 12px/1.5 Manrope,Arial,sans-serif}\n.maison-ribbon-bottom>button{border:0;background:transparent;color:inherit;border-bottom:1px solid #807b72;padding:0 0 8px;font:500 12px/1.5 Manrope,Arial,sans-serif;cursor:pointer}\n.maison-ribbon-bottom>button[hidden]{display:none}\n.maison-ribbon-bottom :is(a,button):focus-visible{outline:2px solid #21211f;outline-offset:5px}\n/* Intro image and explanation, guided by the photograph's natural aspect ratio */\n#studio.maison-intro-art{display:grid;grid-template-columns:minmax(0,1.03fr) minmax(0,1fr);grid-template-areas:'label copy' 'photo copy';column-gap:clamp(48px,7vw,122px);row-gap:29px;align-items:start;padding-block:clamp(115px,12vw,178px) clamp(130px,15vw,225px)}\n#studio.maison-intro-art>.section-label{grid-area:label;align-self:start}\n#studio.maison-intro-art>div{grid-area:copy;min-width:0}\n#studio.maison-intro-art>.maison-intro-photo{grid-area:photo;min-width:0;margin:0;align-self:start}\n.maison-intro-photo img{width:100%;height:auto;display:block;transform:none!important;animation:none!important}\n#studio.maison-intro-art h2{font-size:clamp(46px,4.55vw,73px);max-width:590px;letter-spacing:-.047em}\n#studio.maison-intro-art p:not(.section-label){margin-top:clamp(22px,2.7vw,35px);max-width:570px}\n#studio.maison-intro-art .studio-credit{font-size:13px}\n/* Services: photographic anchor on left, the commission details on the right */\n#commissions.maison-capabilities-art{display:grid;grid-template-columns:minmax(0,.94fr) minmax(0,1.06fr);grid-template-areas:'image title' 'image list';align-items:start;gap:36px clamp(55px,7vw,132px);padding-block:clamp(102px,11vw,160px) clamp(115px,13vw,180px)}\n#commissions.maison-capabilities-art>.maison-capabilities-photo{grid-area:image;min-width:0;margin:0;align-self:start;}\n#commissions.maison-capabilities-art>.maison-capabilities-photo img{display:block;width:100%;height:auto;transform:none!important;animation:none!important}\n#commissions.maison-capabilities-art>.capabilities-intro{grid-area:title;min-width:0}\n#commissions.maison-capabilities-art>.services{grid-area:list;min-width:0;align-self:start}\n#commissions.maison-capabilities-art .capabilities-intro h2{font-size:clamp(44px,4.2vw,68px);margin-top:26px;max-width:630px}\n#commissions.maison-capabilities-art .capabilities-intro>p:last-child{margin-top:24px;max-width:560px}\n#commissions.maison-capabilities-art .services article{grid-template-columns:1fr;gap:9px;padding:21px 0}\n#commissions.maison-capabilities-art .services h3{font-size:clamp(21px,2vw,27px)}\n#commissions.maison-capabilities-art .services p{font-size:13px;line-height:1.65}\n@media(max-width:1000px) and (min-width:761px){#studio.maison-intro-art{column-gap:40px}#commissions.maison-capabilities-art{column-gap:42px}#studio.maison-intro-art h2{font-size:clamp(41px,5.2vw,61px)}}\n@media(max-width:760px){\n #studio.maison-intro-art{grid-template-columns:1fr;grid-template-areas:'label' 'copy' 'photo';gap:0;padding-block:84px 112px}\n #studio.maison-intro-art>.section-label{margin-bottom:26px}\n #studio.maison-intro-art h2{font-size:clamp(43px,10vw,61px);line-height:1.12}\n #studio.maison-intro-art>.maison-intro-photo{margin-top:51px;width:100%}\n #selected-work.maison-edition{--ribbon-height:clamp(253px,75vw,335px);--ribbon-gap:13px;padding-bottom:95px}\n .maison-edition .section-heading{align-items:start;gap:20px;padding-bottom:33px;flex-wrap:wrap}\n .maison-edition .section-heading h2{font-size:clamp(42px,9.5vw,62px);line-height:1.12;max-width:360px}\n .maison-edition .section-heading .text-link{display:none}\n .maison-ribbon-bottom{padding-top:22px;gap:14px}\n .maison-ribbon-bottom :is(a,button){font-size:11px}\n #commissions.maison-capabilities-art{grid-template-columns:1fr;grid-template-areas:'title' 'image' 'list';gap:0;padding-block:82px 110px}\n #commissions.maison-capabilities-art .capabilities-intro h2{font-size:clamp(42px,9vw,57px)}\n #commissions.maison-capabilities-art>.maison-capabilities-photo{margin-top:43px;margin-bottom:27px}\n #commissions.maison-capabilities-art .services article{padding:21px 0}\n}\n@media(prefers-reduced-motion:reduce){.maison-ribbon-track{transform:none!important;will-change:auto!important}.maison-ribbon-viewport{overflow-x:auto!important;touch-action:auto!important}.maison-ribbon-set[aria-hidden=true]{display:none!important}}\n";
  const style = document.createElement('style');
  style.id = 'maison-final-editorial-style';
  style.textContent = css;
  document.head.append(style);
  const src = (id, res=1600) => '/assets/webp/' + PHOTO[id][0] + '-' + res + '.webp';
  const makeImage = (id, sizes, eager=false) => {
    const [stem, ratio, alt] = PHOTO[id];
    const img = document.createElement('img');
    img.src = src(id,960);
    img.srcset = src(id,960) + ' ' + (ratio < .85 ? '720w' : '960w') + ', ' + src(id,1600) + ' ' + (ratio < .85 ? '1200w' : (id === 74 ? '1600w':'1600w'));
    img.sizes = sizes;
    img.alt = alt;
    img.width = Math.round(1200 * ratio);
    img.height = 1200;
    img.loading = eager ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.draggable = false;
    return img;
  };
  const photoFigure = (className,id,sizes) => {
    const fig = document.createElement('figure'); fig.className=className;
    fig.append(makeImage(id,sizes)); return fig;
  };
  // Keep real photographs, not stock and not invented client properties.
  studio.classList.add('maison-intro-art');
  studio.querySelector('.section-label')?.after(photoFigure('maison-intro-photo',15,'(max-width:760px) 90vw, 43vw'));
  commissions.classList.add('maison-capabilities-art');
  commissions.append(photoFigure('maison-capabilities-photo',6,'(max-width:760px) 90vw, 42vw'));

  // Fixed gallery categories protect visual pacing; shuffle within them for every page load.
  function shuffle(items) {
    const list = [...items];
    for (let i=list.length-1;i>0;i--) {let j=Math.floor(Math.random()*(i+1));[list[i],list[j]]=[list[j],list[i]];}
    return list;
  }
  const pools = Object.fromEntries(Object.entries(BUCKETS).map(([type,ids])=>[type,shuffle(ids)]));
  const order = [];
  for(let i=0;i<4;i++) {
    order.push(pools.architecture.shift(),pools.setting.shift(),pools.interiors.shift(),pools.architecture.shift(),pools.details.shift());
  }
  if (new Set(order).size !== 20 || order.some(id => !PHOTO[id])) return;
  const heading = section.querySelector('.section-heading');
  if (heading?.querySelector('h2')) heading.querySelector('h2').textContent = 'Places with presence.';
  heading?.querySelector('a.text-link')?.remove();
  section.classList.add('maison-edition');
  section.dataset.maisonFinal = 'true';
  // Remove the old image sequence AND standalone image. No competing photographic block.
  section.querySelector('.work-story')?.remove();
  section.querySelector('.mflow-viewport')?.remove();
  section.querySelector('.mflow-meta')?.remove();
  section.querySelector('.mflow-still')?.remove();
  section.querySelector('.selected-more')?.remove();
  const viewport = document.createElement('div');
  viewport.className = 'maison-ribbon-viewport';
  viewport.setAttribute('role','region');
  viewport.setAttribute('aria-label','Selected photographs. Arrow keys browse; Enter opens the full Work gallery. Pause movement using the control below.');
  viewport.tabIndex = 0;
  const track = document.createElement('div'); track.className = 'maison-ribbon-track';
  const set = document.createElement('div'); set.className = 'maison-ribbon-set';
  for(const id of order) {
    const frame = document.createElement('figure');
    frame.className = 'maison-ribbon-photo';
    frame.style.setProperty('--ratio',PHOTO[id][1]);
    const link = document.createElement('a'); link.href='/work';link.tabIndex=-1;
    link.setAttribute('aria-label','View the photographic work: '+PHOTO[id][2]);
    link.append(makeImage(id,'(max-width:760px) 450px, 680px'));
    frame.append(link);set.append(frame);
  }
  track.append(set); viewport.append(track); section.append(viewport);
  const row=document.createElement('div'); row.className='maison-ribbon-bottom shell';
  const galleryLink=document.createElement('a'); galleryLink.href='/work';galleryLink.textContent='Explore the photographic work';
  const control=document.createElement('button'); control.type='button';
  control.textContent='Pause movement';control.setAttribute('aria-pressed','false');
  row.append(galleryLink,control);section.append(row);
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData=Boolean(navigator.connection?.saveData);
  const clone=set.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.inert=true;
  clone.querySelectorAll('a').forEach(a=>a.tabIndex=-1);
  clone.querySelectorAll('img').forEach(img=>{img.alt='';img.setAttribute('aria-hidden','true')});
  track.append(clone);
  let offset=0,period=1,frame=0,last=0,visible=false,paused=false,hover=false,focused=false,dragging=false,momentum=0,velocity=0,startX=0,lastX=0,lastT=0,distance=0,suppress=false;
  const moving=()=>!reduced.matches&&!saveData;
  const paint=()=>track.style.transform='translate3d('+offset.toFixed(2)+'px,0,0)';
  const wrap=()=>{offset=((offset%period)+period)%period;if(offset>0)offset-=period};
  const measure=()=>{period=Math.max(1,clone.offsetLeft-set.offsetLeft);wrap();paint()};
  const speed=()=>window.innerWidth<=760?22:28;
  const run=()=>moving() && visible && !document.hidden && !paused && !hover && !focused && !dragging;
  const stop=()=>{if(frame)cancelAnimationFrame(frame);frame=0;last=0};
  const start=()=>{if(!frame&& (run() || (moving() && visible && !paused && !dragging && Math.abs(momentum)>2)))frame=requestAnimationFrame(tick)};
  const tick=(now)=>{
    frame=0; const dt=Math.min(50,last?now-last:16.7);last=now;
    if(!moving()||!visible||document.hidden||dragging){stop();return}
    if(Math.abs(momentum)>2){offset+=momentum*dt/1000;momentum*=Math.exp(-dt/185)}
    else if(run()){momentum=0;offset-=speed()*dt/1000}
    else{stop();return}
    wrap();paint();start();
  };
  function updateMode(){
    section.toggleAttribute('data-moving',moving());
    section.toggleAttribute('data-manual',!moving());
    control.hidden=!moving();control.textContent=paused?'Resume movement':'Pause movement';
    control.setAttribute('aria-pressed',String(paused));
    if(!moving()){stop();offset=0;paint()} else {measure();start()}
  }
  control.addEventListener('click',()=>{paused=!paused;momentum=0;updateMode();if(paused)stop();else start()});
  viewport.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hover=true;stop()}});
  viewport.addEventListener('pointerleave',()=>{hover=false;start()});
  viewport.addEventListener('focusin',()=>{focused=true;stop()});
  viewport.addEventListener('focusout',e=>{if(!viewport.contains(e.relatedTarget)){focused=false;start()}});
  viewport.addEventListener('pointerdown',e=>{
    if(!moving()||(e.pointerType==='mouse'&&e.button!==0))return;
    dragging=true;lastX=startX=e.clientX;lastT=performance.now();distance=0;velocity=0;momentum=0;suppress=false;stop();
    viewport.classList.add('is-dragging');
  });
  viewport.addEventListener('pointermove',e=>{
    if(!dragging)return;
    const dx=e.clientX-lastX,now=performance.now();
    distance=Math.abs(e.clientX-startX);
    velocity=dx/Math.max(now-lastT,1)*1000;
    if(distance>9&&!viewport.hasPointerCapture(e.pointerId))viewport.setPointerCapture?.(e.pointerId);
    offset+=dx;wrap();paint();lastX=e.clientX;lastT=now;
  });
  function release(){
    if(!dragging)return;
    dragging=false;viewport.classList.remove('is-dragging');
    suppress=distance>9;
    momentum=suppress?Math.max(-330,Math.min(330,velocity*.32)):0;
    start();
  }
  viewport.addEventListener('pointerup',release);viewport.addEventListener('pointercancel',release);
  viewport.addEventListener('lostpointercapture',release);
  viewport.addEventListener('click',e=>{if(suppress){e.preventDefault();e.stopPropagation();suppress=false}},true);
  // Keyboard manual browsing: essential for a moving region with focusable links.
  viewport.addEventListener('keydown',e=>{
    if(e.target!==viewport)return;
    if(e.key==='Enter'){e.preventDefault();window.location.assign('/work');return;}
    if(!['ArrowLeft','ArrowRight'].includes(e.key))return;
    e.preventDefault();paused=true;momentum=0;stop();
    offset+=e.key==='ArrowRight'?-160:160;wrap();paint();updateMode();
  });
  reduced.addEventListener?.('change',()=>{momentum=0;stop();updateMode()});
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  window.addEventListener('resize',()=>{measure();start()},{passive:true});
  if('ResizeObserver' in window)new ResizeObserver(measure).observe(set);
  if('IntersectionObserver' in window){
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible){momentum=0;stop()}else start()},{threshold:.02}).observe(viewport);
    new IntersectionObserver((entries,o)=>{if(!entries[0].isIntersecting)return;if(!saveData)set.querySelectorAll('img').forEach(img=>img.loading='eager');o.disconnect()},{rootMargin:'550px'}).observe(section);
  } else visible=true;
  measure();updateMode();start();
})();
