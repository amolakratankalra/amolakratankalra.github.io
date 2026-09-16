const btn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav-links');
if(btn&&nav){btn.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));});}


const billboard=document.querySelector('[data-snapshot-billboard]');
if(billboard){
  const slides=[...billboard.querySelectorAll('.snapshot-slide')];
  const dots=[...document.querySelectorAll('[data-snapshot-dot]')];
  const prev=document.querySelector('[data-snapshot-prev]');
  const next=document.querySelector('[data-snapshot-next]');
  let current=0;
  let timer=null;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function show(i){
    current=(i+slides.length)%slides.length;
    slides.forEach((s,n)=>s.classList.toggle('is-active',n===current));
    dots.forEach((d,n)=>{d.classList.toggle('is-active',n===current); if(n===current)d.setAttribute('aria-current','true'); else d.removeAttribute('aria-current');});
  }
  function stop(){if(timer){clearInterval(timer);timer=null;}}
  function start(){if(!reduce&&slides.length>1&&!timer)timer=setInterval(()=>show(current+1),5000)}
  prev?.addEventListener('click',()=>{show(current-1);stop();start()});
  next?.addEventListener('click',()=>{show(current+1);stop();start()});
  dots.forEach((d,n)=>d.addEventListener('click',()=>{show(n);stop();start()}));
  billboard.addEventListener('mouseenter',stop); billboard.addEventListener('mouseleave',start);
  billboard.addEventListener('focusin',stop); billboard.addEventListener('focusout',start);
  start();
}
