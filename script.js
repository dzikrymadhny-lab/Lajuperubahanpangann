// script.js (final) - shared by all pages
// Requires Chart.js on pages with canvas id="priceChart"

(() => {
  // --- CONFIG / DATA ---
  const CITIES = [
    "Aceh Barat","Aceh Besar","Aceh Jaya","Aceh Selatan","Aceh Singkil",
    "Aceh Tamiang","Aceh Tengah","Aceh Tenggara","Aceh Timur","Aceh Utara",
    "Agam","Alor","Asahan","Asmat","Badung","Balangan","Balikpapan",
    "Banda Aceh","Bandar Lampung","Bandung","Bandung Barat","Banggai",
    "Banggai Kepulauan","Bangil","Bangka","Bangka Barat","Bangka Selatan",
    "Bangka Tengah","Bangli","Banjar","Banjarbaru","Banjarmasin","Banjarnegara",
    "Bantaeng","Bantul","Banyuasin","Banyumas","Banyuwangi","Barito Kuala",
    "Barito Selatan","Barito Timur","Barito Utara","Barru","Batam","Batang",
    "Batu","Baturaja","Bau-Bau","Bekasi","Belitung","Belitung Timur","Belu",
    "Bener Meriah","Bengkalis","Bengkayang","Bengkulu","Bengkulu Selatan",
    "Bengkulu Tengah","Bengkulu Utara","Berau","Biak Numfor","Bima","Binjai",
    "Bireuen","Bitung","Blitar","Blora","Boalemo","Bogor","Bojonegoro",
    "Bolaang Mongondow","Bolaang Mongondow Selatan","Bolaang Mongondow Timur",
    "Bolaang Mongondow Utara","Bondowoso","Bone","Bone Bolango","Bontang",
    "Boven Digoel","Boyolali","Brebes","Bukittinggi","Bulukumba","Bulungan",
    "Bungo","Buol","Buru","Buru Selatan","Buton","Buton Selatan","Buton Tengah",
    "Ciamis","Cianjur","Cilacap","Cimahi","Cirebon","Dairi","Deiyai",
    "Deli Serdang","Demak","Denpasar","Depok","Dharmasraya","Dogiyai",
    "Dompu","Donggala","Enrekang","Fakfak","Flores Timur","Gayo Lues",
    "Gianyar","Gorontalo","Gorontalo Utara","Gowa","Gresik","Grobogan",
    "Gunungkidul","Gunungsitoli","Halmahera Barat","Halmahera Selatan",
    "Halmahera Tengah","Halmahera Timur","Halmahera Utara","Hambalang",
    "Hulu Sungai Selatan","Hulu Sungai Tengah","Hulu Sungai Utara","Indramayu",
    "Jayapura","Jember","Jeneponto","Jepara","Jombang","Kaimana","Karo",
    "Kediri","Kefamenanu","Kendal","Kendari","Kepulauan Aru","Kepulauan Meranti",
    "Kepulauan Sangihe","Kepulauan Seribu","Kepulauan Siau","Kepulauan Talaud",
    "Kepulauan Yapen","Kerinci","Ketapang","Klaten","Klungkung","Kolaka",
    "Kolaka Timur","Kolaka Utara","Konawe","Konawe Kepulauan","Konawe Selatan",
    "Konawe Utara","Kotabaru","Kotamobagu","Kuantan Singingi","Kubu Raya",
    "Kudus","Kulon Progo","Kuningan","Kupang","Kutai Barat","Kutai Kartanegara",
    "Kutai Timur","Labuhanbatu","Labuhanbatu Selatan","Labuhanbatu Utara",
    "Lahat","Lamandau","Lamongan","Lampung Barat","Lampung Selatan","Lampung Tengah",
    "Lampung Timur","Lampung Utara","Landak","Langkat","Langsa","Lebak",
    "Lebong","Lhokseumawe","Lima Puluh Kota","Lombok Barat","Lombok Tengah",
    "Lombok Timur","Lombok Utara","Lubuk Linggau","Madiun","Magelang","Magetan",
    "Majalengka","Majene","Makassar","Malang","Malinau","Maluku Barat Daya",
    "Maluku Tengah","Mamasa","Mamberamo","Mamuju","Mamuju Tengah","Mamuju Utara",
    "Manado","Manokwari","Maros","Medan","Melawi","Merangin","Merauke","Metro",
    "Mimika","Minahasa","Minahasa Selatan","Minahasa Tenggara","Minahasa Utara",
    "Mojokerto","Morowali","Muara Enim","Muaro Jambi","Muko-Muko","Muna","Nabire",
    "Nagan Raya","Nagekeo","Natuna","Ngada","Ngawi","Nias","Nias Barat","Nias Selatan",
    "Nias Utara","Nunukan","Ogan Ilir","Ogan Komering Ilir","Ogan Komering Ulu",
    "Padang","Padang Lawas","Padang Panjang","Padang Pariaman","Padang Sidempuan",
    "Pagar Alam","Pakpak Bharat","Palangkaraya","Palembang","Palopo","Palu","Pamekasan",
    "Pandeglang","Pangkal Pinang","Pangkep","Paniai","Parepare","Pariaman",
    "Parigi Moutong","Pasaman","Pasaman Barat","Paser","Pasuruan","Pati","Payakumbuh",
    "Pekalongan","Pekanbaru","Pelalawan","Pemalang","Penajam Paser Utara","Pesawaran",
    "Pessel","Pesisir Barat","Pesisir Selatan","Pidie","Pidie Jaya","Pinrang",
    "Pohuwato","Polewali Mandar","Ponorogo","Pontianak","Poso","Prabumulih",
    "Probolinggo","Purbalingga","Purwakarta","Purworejo","Raja Ampat","Rejang Lebong",
    "Rembang","Rokan Hilir","Rokan Hulu","Rote Ndao","Sabang","Sabu Raijua",
    "Salatiga","Samarinda","Samosir","Sampang","Sarmi","Sawahlunto","Sekadau",
    "Seluma","Semarang","Serang","Serdang Bedagai","Seruyan","Siak","Sibolga",
    "Sidoarjo","Sigi","Sikka","Simalungun","Simeulue","Singkawang","Sinjai",
    "Sintang","Situbondo","Sleman","Solok","Solok Selatan","Soppeng","Sorong",
    "Sorong Selatan","South Sorong","Subang","Sukabumi","Sukamara","Sukoharjo",
    "Sumba Barat","Sumba Tengah","Sumba Timur","Sumedang","Sumenep","Sungai Penuh",
    "Surabaya","Surakarta","Tabalong","Tabanan","Takalar","Tambrauw","Tamalate",
    "Tambun","Tana Toraja","Tanah Bumbu","Tanah Datar","Tanah Laut","Tangerang",
    "Tangerang Selatan","Tanggamus","Tanjung Balai","Tanjung Jabung Barat","Tanjung Jabung Timur",
    "Tanjung Pinang","Tapanuli Selatan","Tapanuli Tengah","Tapanuli Utara","Tapin","Tarakan",
    "Tasikmalaya","Tebing Tinggi","Tegal","Teluk Bintuni","Teluk Wondama","Temanggung",
    "Ternate","Tidore","Timika","Toba","Tojo Una-Una","Toli-Toli","Tomohon","Toraja Utara",
    "Trenggalek","Tual","Tuban","Tulang Bawang","Tulang Bawang Barat","Tulungagung","Wajo",
    "Wakatobi","Way Kanan","Wonosobo","Yogyakarta"
  ];

  const DEFAULT_ITEMS = ["Beras","Gula","Minyak Goreng","Telur Ayam","Cabe Merah"];
  const HISTORY_KEY = 'priceAppHistory_v1';
  const PREF_CITY = 'pricePref_city_v1';
  const PREF_ITEM = 'pricePref_item_v1';
  const PREF_UNIT = 'pricePref_unit_v1';

  // --- state ---
  let priceChart = null;
  let currentSeries = {dates:[], values:[]};

  // --- dom helpers ---
  const $ = id => document.getElementById(id);
  const exists = id => !!document.getElementById(id);
  function el(tag, text){ const e = document.createElement(tag); if(text) e.textContent = text; return e; }

  // --- utilities ---
  function daysArray(n=30){
    const arr = [];
    const today = new Date();
    for(let i=n-1;i>=0;i--){
      const d = new Date(today);
      d.setDate(today.getDate()-i);
      arr.push(d.toISOString().slice(0,10));
    }
    return arr;
  }
  function formatRp(n){ return 'Rp ' + Math.round(n).toLocaleString(); }
  function stddev(arr){ const n=arr.length; if(n===0) return 0; const mean=arr.reduce((a,b)=>a+b,0)/n; const v=arr.reduce((a,b)=>a+(b-mean)*(b-mean),0)/n; return Math.sqrt(v); }
  function randomAround(base, range=0.1){ const factor = 1 + (Math.random()*2-1)*range; return Math.round(base * factor); }

  // --- populate controls (ke semua halaman jika ada) ---
  function populateControls(){
    if(exists('citySelect')){
      const citySel = $('citySelect');
      citySel.innerHTML = CITIES.map(c => `<option>${c}</option>`).join('');
      const saved = localStorage.getItem(PREF_CITY);
      if(saved) citySel.value = saved;
      citySel.addEventListener('change', () => {
        localStorage.setItem(PREF_CITY, citySel.value);
        // trigger reload of series if on price page
        if(exists('priceChart')) loadSeriesAndRender();
      });
    }
    if(exists('itemSelect')){
      const itemSel = $('itemSelect');
      itemSel.innerHTML = DEFAULT_ITEMS.map(i => `<option>${i}</option>`).join('');
      const saved = localStorage.getItem(PREF_ITEM);
      if(saved) itemSel.value = saved;
      itemSel.addEventListener('change', () => {
        localStorage.setItem(PREF_ITEM, itemSel.value);
        if(exists('priceChart')) loadSeriesAndRender();
      });
    }
    if(exists('unitSelect')){
      const unitSel = $('unitSelect');
      const saved = localStorage.getItem(PREF_UNIT);
      if(saved) unitSel.value = saved;
      unitSel.addEventListener('change', () => localStorage.setItem(PREF_UNIT, unitSel.value));
    }
  }

  // --- history management ---
  function loadHistory(){ try{ const raw = localStorage.getItem(HISTORY_KEY); return raw ? JSON.parse(raw) : []; } catch(e){ return []; } }
  function saveHistory(arr){ localStorage.setItem(HISTORY_KEY, JSON.stringify(arr)); }
  function renderHistory(){
    if(!exists('historyList')) return;
    const list = $('historyList');
    const arr = loadHistory();
    list.innerHTML = '';
    if(!arr.length){
      list.innerHTML = '<p class="muted">Belum ada input user.</p>';
      return;
    }
    const ul = el('ul');
    arr.slice().reverse().forEach(rec => {
      const li = el('li');
      // show basic info + comparison if currentSeries available
      let html = `<strong>${rec.item}</strong> — ${rec.city} — ${formatRp(rec.price)} — <span class="muted small">${rec.date}</span>`;
      if(currentSeries && currentSeries.values && currentSeries.values.length){
        const reg = linearRegression(currentSeries.values);
        const n = currentSeries.values.length;
        const pred7 = Math.round(reg.intercept + reg.slope * (n + 6));
        const cmp = rec.price > pred7 ? 'lebih besar' : rec.price < pred7 ? 'lebih kecil' : 'sama';
        html += `<div class="small-muted">Perbandingan vs prediksi 7-hari: ${formatRp(pred7)} → nilai Anda ${cmp} prediksi.</div>`;
      } else {
        html += `<div class="small-muted">Perbandingan: data pasar tidak tersedia.</div>`;
      }
      li.innerHTML = html;
      ul.appendChild(li);
    });
    list.appendChild(ul);
  }

  // --- mock series generator (realistis) ---
  function getMockSeries(item='Beras', city='Jakarta', n=30){
    const baseMap = {"Beras":12000,"Gula":12500,"Minyak Goreng":18000,"Telur Ayam":21000,"Cabe Merah":45000};
    const base = baseMap[item] || 10000;
    const dates = daysArray(n);
    const cityHash = (city||'').split('').reduce((s,ch)=>s+ch.charCodeAt(0),0) || 0;
    const trendFactor = ((cityHash % 9) - 4) * 1.2;
    const values = dates.map((d,i) => {
      const seasonal = Math.sin(i/3) * base * 0.02;
      const trend = (i * trendFactor);
      const noise = (Math.random()*2-1) * base * 0.03;
      return Math.max(100, Math.round(base + seasonal + trend + noise));
    });
    return {dates, values};
  }

  // --- regression OLS ---
  function linearRegression(y){
    const n = y.length;
    if(n === 0) return {slope:0, intercept:0};
    const xMean = (n-1)/2;
    const yMean = y.reduce((a,b)=>a+b,0)/n;
    let num = 0, den = 0;
    for(let i=0;i<n;i++){
      num += (i - xMean) * (y[i] - yMean);
      den += (i - xMean) * (i - xMean);
    }
    const slope = den === 0 ? 0 : num / den;
    const intercept = yMean - slope * xMean;
    return {slope, intercept};
  }

  // --- chart ---
  function createChart(dates, values){
    const canvas = $('priceChart');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(priceChart) priceChart.destroy();
    priceChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          { label: 'Harga (Rp)', data: values, fill:false, tension:0.2, pointRadius:3 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          zoom: { pan:{enabled:true,mode:'x'}, zoom:{wheel:{enabled:true},pinch:{enabled:true},mode:'x'} },
          tooltip: { mode:'nearest', intersect:true }
        },
        interaction: { mode:'nearest', intersect:true },
        scales: { x:{display:true}, y:{display:true, beginAtZero:false} }
      }
    });
  }

  function overlayRegression(slope, intercept){
    if(!priceChart) return;
    const n = priceChart.data.labels.length;
    const reg = [];
    for(let i=0;i<n;i++) reg.push(Math.round(intercept + slope * i));
    const existing = priceChart.data.datasets.findIndex(ds => ds.label === 'Regresi');
    if(existing >= 0) priceChart.data.datasets.splice(existing, 1);
    priceChart.data.datasets.push({ label:'Regresi', data: reg, borderDash:[6,4], borderWidth:2, fill:false, pointRadius:0 });
    priceChart.update();
    priceChart._lastReg = {slope, intercept};
  }

  // --- compute & display calculus info ---
  function computeAndShowCalculus(values, dates){
    const {slope, intercept} = linearRegression(values);
    if(exists('regressionFn')) $('regressionFn').textContent = `f(x) = ${intercept.toFixed(2)} + ${slope.toFixed(4)}·x  (x = hari, 0 = ${dates[0]})`;
    if(exists('derivativeInfo')) $('derivativeInfo').textContent = `f'(x) ≈ ${slope.toFixed(4)} Rp/hari (rata-rata).`;
    if(exists('limitInfo')) $('limitInfo').textContent = `Limit (aproksimasi): lihat kalkulus halaman untuk metode numerik.`;
    overlayRegression(slope, intercept);
  }

  // --- forecast next 7 days ---
  function forecastNext7(values){
    const n = values.length;
    const reg = linearRegression(values);
    const preds = [];
    for(let i=0;i<7;i++){
      const x = n + i;
      preds.push(Math.round(reg.intercept + reg.slope * x));
    }
    return {preds, reg};
  }

  // --- finite differences ---
  function calcDifferencesAtIndex(idx){
    const y = currentSeries.values.slice();
    if(!y.length) return {error:'Data tidak tersedia.'};
    if(idx < 0 || idx >= y.length) return {error:'Indeks di luar jangkauan.'};
    const f_i = Number(y[idx]);
    const f_prev = idx > 0 ? Number(y[idx-1]) : null;
    const f_next = idx < y.length - 1 ? Number(y[idx+1]) : null;
    let forward = null, backward = null, central = null;
    if(f_next != null) forward = f_next - f_i;
    if(f_prev != null) backward = f_i - f_prev;
    if(f_prev != null && f_next != null) central = (f_next - f_prev) / 2;
    return {f_i, f_prev, f_next, forward, backward, central};
  }

  // --- build explanation for index ---
  function buildExplainForIndex(idx){
    if(!currentSeries || !currentSeries.values || !currentSeries.values.length) return 'Data tidak tersedia.';
    idx = Math.max(0, Math.min(currentSeries.values.length - 1, idx));
    const d = currentSeries.dates[idx];
    const res = calcDifferencesAtIndex(idx);
    if(res.error) return res.error;
    const reg = linearRegression(currentSeries.values);
    const lines = [];
    lines.push(`Analisis Laju Perubahan — Titik: ${d} (indeks ${idx})`);
    lines.push('');
    lines.push(`Harga kemarin: ${res.f_prev!=null?formatRp(res.f_prev):'tidak tersedia'}`);
    lines.push(`Harga hari ini: ${formatRp(res.f_i)}`);
    lines.push(`Harga besok: ${res.f_next!=null?formatRp(res.f_next):'tidak tersedia'}`);
    lines.push('');
    lines.push('--- Aproksimasi Turunan (Rp/hari) ---');
    lines.push(`Beda depan: ${res.forward!=null? (res.forward>=0?'+':'')+res.forward.toFixed(2) + ' Rp/hari' : 'tidak tersedia'}`);
    lines.push(`Beda belakang: ${res.backward!=null? (res.backward>=0?'+':'')+res.backward.toFixed(2) + ' Rp/hari' : 'tidak tersedia'}`);
    lines.push(`Beda tengah: ${res.central!=null? (res.central>=0?'+':'')+res.central.toFixed(2) + ' Rp/hari' : 'tidak tersedia'}`);
    lines.push('');
    lines.push(`Regresi linear rata-rata: f'(x) ≈ ${reg.slope.toFixed(4)} Rp/hari`);
    lines.push('');
    const slopeApprox = res.central != null ? res.central : (res.forward != null ? res.forward : res.backward);
    if(slopeApprox == null) lines.push('Interpretasi: data tidak cukup untuk aproksimasi pada titik ini.');
    else {
      if(slopeApprox > 0) lines.push(`Interpretasi: harga NAIK sekitar ${Math.abs(slopeApprox).toFixed(2)} Rp/hari.`);
      else if(slopeApprox < 0) lines.push(`Interpretasi: harga TURUN sekitar ${Math.abs(slopeApprox).toFixed(2)} Rp/hari.`);
      else lines.push('Interpretasi: harga relatif STABIL (perubahan ≈ 0).');
    }
    const sd = stddev(currentSeries.values);
    const avg = currentSeries.values.reduce((a,b)=>a+b,0)/currentSeries.values.length;
    lines.push('');
    lines.push(`Volatilitas (sd) ≈ ${Math.round(sd)} Rp (${((sd/avg)*100).toFixed(2)}% relatif).`);
    return lines.join('\n');
  }

  // --- update panels for index (dataPanel, explainBox, quickBox, recommendBox) ---
  function updateDerivativePanels(idx){
    const text = buildExplainForIndex(idx);
    if(exists('explainBox')) $('explainBox').textContent = text;
    if(exists('dataPanel')) $('dataPanel').textContent = text;
    // quick summary
    const res = calcDifferencesAtIndex(idx);
    const slopeApprox = res.central != null ? res.central : (res.forward != null ? res.forward : res.backward);
    if(exists('quickBox')){
      if(slopeApprox == null) $('quickBox').textContent = 'Aproksimasi tidak tersedia.';
      else $('quickBox').textContent = `Aproksimasi laju perubahan: ${slopeApprox >=0?'+':''}${slopeApprox.toFixed(2)} Rp/hari`;
    }
    if(exists('recommendBox')){
      let rec = '';
      if(slopeApprox == null) rec = 'Rekomendasi: kumpulkan lebih banyak data (butuh titik sebelum & sesudah).';
      else if(slopeApprox > 0) rec = 'Rekomendasi: harga naik → pertimbangkan menunda pembelian bila tidak mendesak.';
      else if(slopeApprox < 0) rec = 'Rekomendasi: harga turun → kemungkinan bisa menunggu beberapa hari.';
      else rec = 'Rekomendasi: harga stabil → pantau rutin.';
      // volatility note
      const sd = stddev(currentSeries.values);
      const avg = currentSeries.values.reduce((a,b)=>a+b,0)/currentSeries.values.length;
      if(sd > 0 && sd > (0.05 * avg)) rec += '\nCatatan: volatilitas relatif tinggi — prediksi jangka pendek kurang andal.';
      $('recommendBox').textContent = rec;
    }
  }

  // --- update static texts (summary, calcPanel) ---
  function updateStaticTextBlocks(){
    if(exists('summaryText')) $('summaryText').textContent =
`Penjelasan Ringkas (Populer)
- Turunan f'(x) mengukur laju perubahan harga terhadap waktu (satuan: Rp/hari).
- Untuk data harian diskrit, gunakan beda depan/belakang/beda tengah sebagai aproksimasi.`;
    if(exists('calcPanel')) $('calcPanel').textContent =
`Penjelasan Lengkap (Kalkulus Diferensial)
1) Definisi formal (intuitif):
   Jika f(x) adalah harga pada hari x, turunan f'(x) = lim_{h→0} (f(x+h)-f(x))/h.
2) Data diskrit (Δt = 1 hari):
   - Beda depan: f'(x_i) ≈ (f(x_{i+1}) - f(x_i)) / Δt
   - Beda belakang: f'(x_i) ≈ (f(x_i) - f(x_{i-1})) / Δt
   - Beda tengah (orde 2, lebih akurat): f'(x_i) ≈ (f(x_{i+1}) - f(x_{i-1})) / (2 Δt)
Satuan: Rp/hari. Interpretasi: f'(x) memberi laju perubahan harga per hari pada titik x.`;
  }

  // --- hover handlers for chart ---
  function attachChartHoverHandlers(){
    const canv = $('priceChart');
    if(!canv || !priceChart) return;
    canv.addEventListener('mousemove', (ev) => {
      try{
        const pts = priceChart.getElementsAtEventForMode(ev, 'nearest', { intersect:true }, false);
        if(pts && pts.length){
          updateDerivativePanels(pts[0].index);
        } else {
          const pts2 = priceChart.getElementsAtEventForMode(ev, 'nearest', { intersect:false }, false);
          if(pts2 && pts2.length) updateDerivativePanels(pts2[0].index);
        }
      }catch(e){}
    });
    canv.addEventListener('mouseleave', () => {
      const lastIdx = currentSeries.values.length > 0 ? currentSeries.values.length - 1 : 0;
      updateDerivativePanels(lastIdx);
    });
  }

  // --- load series & render ---
  function loadSeriesAndRender(){
    const city = exists('citySelect') ? $('citySelect').value : (localStorage.getItem(PREF_CITY) || CITIES[0]);
    const item = exists('itemSelect') ? $('itemSelect').value : (localStorage.getItem(PREF_ITEM) || DEFAULT_ITEMS[0]);
    const series = getMockSeries(item, city, 30);
    currentSeries = series;
    if(exists('priceChart')) createChart(series.dates, series.values);
    const reg = linearRegression(series.values);
    overlayRegression(reg.slope, reg.intercept);
    if(exists('nationalBox')) $('nationalBox').textContent = `Rata-rata 30 hari terakhir: ${formatRp(Math.round(series.values.reduce((a,b)=>a+b,0)/series.values.length))}`;
    if(exists('predSummary')) $('predSummary').textContent = `f(x) ≈ ${reg.intercept.toFixed(0)} + ${reg.slope.toFixed(2)}·x  → f'(x) ≈ ${reg.slope.toFixed(2)} Rp/hari`;
    // set explain to last point by default
    setTimeout(()=> {
      const last = series.values.length - 1;
      updateDerivativePanels(last);
    }, 200);
    renderHistory();
  }

  // --- attach page events & init ---
  function init(){
    populateControls();
    updateStaticTextBlocks();
    renderHistory();

    if(exists('priceChart')){
      loadSeriesAndRender();
      setTimeout(attachChartHoverHandlers, 400);
    }

    // help overlay buttons
    if(exists('helpBtn') && exists('guideOverlay') && exists('guideClose')){
      $('helpBtn').addEventListener('click', ()=> $('guideOverlay').classList.add('show'));
      $('guideClose').addEventListener('click', ()=> $('guideOverlay').classList.remove('show'));
      $('guideOverlay').classList.remove('show');
    }

    // save input
    if(exists('btnSave')){
      $('btnSave').addEventListener('click', ()=> {
        const price = Number($('userPrice').value);
        if(!price || isNaN(price)) { alert('Masukkan harga numerik yang valid.'); return; }
        const rec = {
          date: (new Date()).toISOString().slice(0,10),
          city: $('citySelect').value,
          item: $('itemSelect').value,
          unit: exists('unitSelect') ? $('unitSelect').value : 'kg',
          price
        };
        const arr = loadHistory();
        arr.push(rec);
        saveHistory(arr);
        $('userPrice').value = '';
        if(exists('explainBox')) $('explainBox').textContent = `Input disimpan: ${rec.item} @ ${rec.city} — ${formatRp(rec.price)}`;
        renderHistory();
      });
    }

    // clear history button
    if(exists('clearHistory')){
      $('clearHistory').addEventListener('click', ()=> {
        if(confirm('Hapus semua history input user?')){ localStorage.removeItem(HISTORY_KEY); renderHistory(); }
      });
    }

    // reset zoom
    if(exists('resetZoom')){
      $('resetZoom').addEventListener('click', ()=> { if(priceChart) priceChart.resetZoom(); });
    }

    // forecast button (if present)
    if(exists('calcForecast')){
      $('calcForecast').addEventListener('click', ()=> {
        const {preds, reg} = forecastNext7(currentSeries.values);
        if(exists('forecastResult')) $('forecastResult').innerHTML = `Prediksi 7 hari: ${preds.map(p=> 'Rp '+p.toLocaleString()).join(' — ')}`;
        if(exists('explainBox')) $('explainBox').textContent = `Prediksi dibuat dengan regresi linear sederhana. Slope = ${reg.slope.toFixed(4)} Rp/hari.`;
      });
    }
  }

  // run on DOM loaded
  document.addEventListener('DOMContentLoaded', init);

})();
