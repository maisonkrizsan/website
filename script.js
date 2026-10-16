(() => {
 'use strict';
 document.querySelectorAll('[data-year]').forEach(e => e.textContent = String(new Date().getFullYear()));
 const menuButton = document.querySelector('.nav-toggle');
 const mobileNav = document.getElementById('mobile-nav');
 const onWork = document.body.classList.contains('page-work');
 document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav === (onWork?'work':'home')) a.setAttribute('aria-current','page');});
 let prevFocus=null;
 function closeMenu(restore=false){if(!mobileNav||!menuButton||mobileNav.hidden)return;mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');document.body.classList.remove('menu-open');if(restore)menuButton.focus();}
 function openMenu(){if(!mobileNav||!menuButton)return;prevFocus=document.activeElement;mobileNav.hidden=false;menuButton.setAttribute('aria-expanded','true');menuButton.setAttribute('aria-label','Close navigation');document.body.classList.add('menu-open');mobileNav.querySelector('a')?.focus();}
 menuButton?.addEventListener('click',()=>mobileNav.hidden?openMenu():closeMenu(true));
 mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu(false)));
 document.addEventListener('pointerdown',e=>{if(!mobileNav?.hidden && !e.target.closest('.site-header'))closeMenu(false);});
 document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(dialog?.open)return;closeMenu(true);});
 window.addEventListener('resize',()=>{if(window.innerWidth>1100)closeMenu(false);});
 const copy=document.querySelector('.copy-email');
 copy?.addEventListener('click',async()=>{
  const email=copy.dataset.email||'studio@maisonkrizsan.com';const live=document.querySelector('.copy-notice');
  try {if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(email);if(live)live.textContent='Copied';}
  catch {if(live)live.textContent='Select the address above to copy';}
 });
 // Native modal remains usable if animations, fonts or network access fail.
 const dialog=document.querySelector('.lightbox');
 if(!dialog)return;
 let files=[];try{files=JSON.parse(document.querySelector('#photo-data')?.textContent||'[]');}catch(e){console.error('Photo manifest unavailable',e);}
 if(!files.length)return;
 let active=0;let origin=null;
 const image=dialog.querySelector('.lightbox-image');
 const caption=dialog.querySelector('.lightbox-caption');
 const counter=dialog.querySelector('.lightbox-counter');
 const setPhoto=i=>{active=(i+files.length)%files.length;const p=files[active];image.src=p.url;image.alt=p.alt;caption.textContent=p.title;counter.textContent=`${String(active+1).padStart(2,'0')} / ${files.length}`;};
 function openPhoto(id,from){const position=files.findIndex(p=>p.id===id);if(position<0)return;origin=from;setPhoto(position);dialog.showModal();document.body.style.overflow='hidden';dialog.querySelector('.lightbox-close').focus();}
 function closePhoto(){if(dialog.open)dialog.close();}
 dialog.querySelector('.lightbox-close').addEventListener('click',closePhoto);
 dialog.querySelector('.lightbox-prev').addEventListener('click',()=>setPhoto(active-1));
 dialog.querySelector('.lightbox-next').addEventListener('click',()=>setPhoto(active+1));
 dialog.addEventListener('close',()=>{document.body.style.overflow='';image.removeAttribute('src');origin?.focus();});
 dialog.addEventListener('click',e=>{if(e.target===dialog)closePhoto();});
 document.querySelectorAll('.gallery-open').forEach(button=>button.addEventListener('click',()=>openPhoto(Number(button.dataset.imageId),button)));
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();setPhoto(active+1);}if(e.key==='ArrowLeft'){e.preventDefault();setPhoto(active-1);}});
 let touchStart=null;image.addEventListener('touchstart',e=>{touchStart=e.touches[0]?.clientX;},{passive:true});image.addEventListener('touchend',e=>{if(touchStart===null)return;const d=e.changedTouches[0]?.clientX-touchStart;if(Math.abs(d)>50)setPhoto(active+(d<0?1:-1));touchStart=null;},{passive:true});
})();
