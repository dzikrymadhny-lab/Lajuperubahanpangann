// nav.js — simple SPA navigation shim
(function(){
  const sections = {
    home: document.getElementById('section-home'),
    harga: document.getElementById('section-harga'),
    kalkulus: document.getElementById('section-kalkulus'),
    riwayat: document.getElementById('section-riwayat'),
    penjelasan: document.getElementById('section-penjelasan')
  };

  function showSection(name, push=true){
    Object.keys(sections).forEach(k=>{
      const el = sections[k];
      if(!el) return;
      if(k === name) el.classList.remove('hidden');
      else el.classList.add('hidden');
    });
    // update active menu
    document.querySelectorAll('.nav-link').forEach(btn=>{
      btn.classList.toggle('active', btn.id === 'nav-' + name);
    });
    if(push) history.pushState({section:name}, '', '#' + name);
    // make sure explanation box updates (some code listens for DOMContentLoaded or clicks)
    setTimeout(()=> {
      // update small copies used in new layout if exist
      const smallNational = document.getElementById('nationalBoxSmall');
      const bigNational = document.getElementById('nationalBox');
      if(bigNational && smallNational) smallNational.textContent = bigNational.textContent;
      // copy explanation text if available
      const ex = document.getElementById('explainBox');
      const exFull = document.getElementById('explainBoxFull');
      if(ex && exFull) exFull.textContent = ex.textContent;
    }, 120);
  }

  // wire nav buttons
  ['home','harga','kalkulus','riwayat','penjelasan'].forEach(name=>{
    const btn = document.getElementById('nav-' + name);
    if(btn) btn.addEventListener('click', ()=> showSection(name));
  });

  // quick go buttons
  const gotoHarga = document.getElementById('goto-harga');
  if(gotoHarga) gotoHarga.addEventListener('click', ()=> showSection('harga'));
  const gotoKalk = document.getElementById('goto-kalkulus');
  if(gotoKalk) gotoKalk.addEventListener('click', ()=> showSection('kalkulus'));

  // help button opens guide overlay (reuse existing element)
  const helpBtn = document.getElementById('helpBtn');
  const guideOverlay = document.getElementById('guideOverlay');
  const guideClose = document.getElementById('guideClose');
  if(helpBtn) helpBtn.addEventListener('click', ()=> guideOverlay.classList.add('show'));
  if(guideClose) guideClose.addEventListener('click', ()=> guideOverlay.classList.remove('show'));

  // handle back/forward
  window.addEventListener('popstate', (ev)=>{
    const name = (ev.state && ev.state.section) ? ev.state.section : 'home';
    showSection(name, false);
  });

  // initial: show section according to hash if present
  const hash = (location.hash || '').replace('#','');
  if(hash && sections[hash]) showSection(hash, false);
  else showSection('home', false);

})();
