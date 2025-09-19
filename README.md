# flowers
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Bloom Buddy 🌸 — Interactive Flowers</title>
  <style>
    :root{
      --bg:#FFF8F2;
      --card:#FFFFFF;
      --accent:#FF7AB6;
      --muted:#7C6B8A;
      --shadow: 0 8px 20px rgba(99,72,124,0.08);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    *{box-sizing:border-box}
    body{margin:0;background:linear-gradient(180deg,#FFF8F2 0%, #F0FFF6 100%);color:#42324A}
    header{padding:28px 24px;text-align:center}
    h1{margin:0;font-size:2rem;letter-spacing:0.6px}
    p.lead{margin:6px 0 0;color:var(--muted)}

    .container{max-width:1100px;margin:20px auto;padding:20px}
    .grid{display:grid;grid-template-columns:1fr 380px;gap:20px}

    /* Left main */
    .panel{background:var(--card);border-radius:16px;padding:16px;box-shadow:var(--shadow)}
    .gallery{display:flex;flex-wrap:wrap;gap:12px;padding:8px}
    .thumb{width:96px;height:96px;border-radius:12px;overflow:hidden;display:flex;align-items:center;justify-content:center;border:3px solid transparent;cursor:pointer;position:relative}
    .thumb img{width:100%;height:100%;object-fit:cover;display:block}
    .thumb.selected{border-color:var(--accent);transform:translateY(-6px);box-shadow:0 6px 18px rgba(255,122,182,0.14)}
    .thumb .name{position:absolute;left:6px;bottom:6px;background:rgba(255,255,255,0.8);padding:2px 6px;border-radius:8px;font-size:12px}

    .controls{display:flex;gap:12px;align-items:center;margin-top:12px}
    .btn{background:linear-gradient(180deg,var(--accent),#FF5D9E);padding:10px 14px;border-radius:12px;color:white;border:0;cursor:pointer;font-weight:600;box-shadow:0 6px 18px rgba(255,90,140,0.18)}
    .btn.ghost{background:transparent;color:var(--accent);box-shadow:none;border:2px dashed rgba(124,107,138,0.12)}
    .muted{color:var(--muted);font-size:14px}

    /* Right sidebar */
    .sidebar{display:flex;flex-direction:column;gap:14px}
    .card{padding:12px;border-radius:12px;background:linear-gradient(180deg,#FFFFFF,#FFF6FB);box-shadow:var(--shadow)}

    /* Cross pollinate result */
    .hybrid{display:flex;gap:12px;align-items:center}
    .hybrid-preview{width:100px;height:100px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:700;color:white}
    .result-name{font-size:18px}
    .joke{font-style:italic;color:#6a5d76}

    /* Bloom area */
    .bloom-wrap{display:flex;align-items:center;justify-content:center;padding:16px}
    .plant{width:220px;height:260px;position:relative}

    /* simple svg-based bloom animation using classes */
    .bud{cursor:pointer;transform-origin:center bottom}
    .bloomed .petal{animation:petalGrow 700ms ease forwards}
    @keyframes petalGrow{
      from{transform:scale(0.2) translateY(20px);opacity:0}
      to{transform:scale(1) translateY(0);opacity:1}
    }

    footer{margin-top:18px;text-align:center;color:var(--muted);font-size:13px}

    /* responsive */
    @media (max-width:980px){.grid{grid-template-columns:1fr}.sidebar{order:2}}

    /* cute trombone of fonts for flower quotes */
    .quote-box{padding:10px;border-radius:10px;background:linear-gradient(90deg,#FFF7F0,#F7FFF9);font-weight:600}
  </style>
</head>
<body>
  <header>
    <h1>Bloom Buddy 🌼</h1>
    <p class="lead">An interactive playground to add flowers, cross-pollinate, and watch buds bloom — all in HTML, CSS & JavaScript.</p>
  </header>

  <main class="container">
    <div class="grid">
      <section>
        <div class="panel">
          <h3 style="margin:0 0 6px">Flower Gallery</h3>
          <p class="muted">Add your flower images. Click a thumbnail to select it for cross-pollination (select two).</p>

          <div style="display:flex;gap:10px;margin-top:10px;align-items:center;flex-wrap:wrap">
            <label class="btn ghost" style="padding:8px 10px;display:inline-flex;align-items:center;gap:8px;cursor:pointer">
              📤 Add Images
              <input id="fileInput" type="file" accept="image/*" multiple style="display:none">
            </label>
            <button id="clearGallery" class="btn" style="background:linear-gradient(180deg,#9EE7B9,#4AD66C);">Clear Gallery</button>
            <div style="flex:1;text-align:right;color:var(--muted)">Selected: <span id="selectedCount">0</span>/2</div>
          </div>

          <div class="gallery" id="gallery"></div>

          <div class="controls">
            <button id="crossBtn" class="btn" disabled>🌱 Cross Pollinate</button>
            <button id="randomJoke" class="btn ghost">😂 Surprise Quote</button>
            <div style="flex:1"></div>
            <div class="muted">Tip: Click thumbs to mark them as parents.</div>
          </div>

          <div style="margin-top:12px" id="resultArea"></div>
        </div>

        <div class="panel" style="margin-top:16px">
          <h3 style="margin:0 0 6px">Cute & Funny Flower Lines</h3>
          <div class="quote-box" id="quoteBox">I’m just pollen your leg 🌼</div>
        </div>

        <footer style="margin-top:10px">Made with ☀️, soil, and JavaScript — change image srcs or upload your own!</footer>
      </section>

      <aside class="sidebar">
        <div class="card">
          <h4 style="margin:0 0 6px">Cross-Pollination Result</h4>
          <div class="hybrid" id="hybridCard">
            <div class="hybrid-preview" id="hybridPreview" style="background:linear-gradient(135deg,#FFB6C1,#FFD1A9)">HB</div>
            <div>
              <div class="result-name" id="hybridName">Pick two flowers</div>
              <div class="joke" id="hybridDesc">Hybrid will appear here — maybe it giggles.</div>
            </div>
          </div>
        </div>

        <div class="card">
          <h4 style="margin:0 0 6px">Blooming Bud (Click the bud!)</h4>
          <div class="bloom-wrap">
            <div class="plant panel" id="plantPanel">
              <!-- We'll draw a simple plant using inline SVG -->
              <svg viewBox="0 0 200 260" width="100%" height="100%" id="plantSVG">
                <!-- pot -->
                <rect x="38" y="200" width="124" height="36" rx="8" fill="#8B5E3C" opacity="0.95"></rect>
                <rect x="52" y="206" width="96" height="10" rx="4" fill="#6b3f23" opacity="0.9"></rect>
                <!-- stem -->
                <path d="M100 200 C96 150 110 120 110 90" stroke="#2b7a3a" stroke-width="6" fill="none" stroke-linecap="round"></path>
                <!-- bud group (clickable) -->
                <g id="budGroup" class="bud" transform="translate(100,88)">
                  <ellipse cx="0" cy="0" rx="10" ry="16" fill="#C3E6A0" class="centerBud"></ellipse>
                  <!-- petals (start hidden/scaled) -->
                  <g id="petals" opacity="0">
                    <path class="petal" d="M0 -6 C -22 -14 -22 14 0 10 C 22 14 22 -14 0 -6" fill="#FF9ACA" transform="translate(0,0) scale(0.2)"></path>
                    <path class="petal" d="M0 -6 C -22 -14 -22 14 0 10 C 22 14 22 -14 0 -6" fill="#FFD38E" transform="rotate(45) scale(0.2)"></path>
                    <path class="petal" d="M0 -6 C -22 -14 -22 14 0 10 C 22 14 22 -14 0 -6" fill="#A9E3FF" transform="rotate(90) scale(0.2)"></path>
                    <path class="petal" d="M0 -6 C -22 -14 -22 14 0 10 C 22 14 22 -14 0 -6" fill="#C6A9FF" transform="rotate(135) scale(0.2)"></path>
                    <circle cx="0" cy="2" r="6" fill="#FFEF9A" opacity="0" id="centerP"></circle>
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <p class="muted">Click the bud to reveal petals — try clicking again for a playful wiggle.</p>
        </div>

        <div class="card">
          <h4 style="margin:0 0 6px">Quick Tips</h4>
          <ul style="margin:8px 0 0;padding-left:18px;color:var(--muted)">
            <li>Upload real photos using the Add Images button.</li>
            <li>Click two thumbs to select parents, then Cross Pollinate.</li>
            <li>Use the Clear Gallery button to start fresh.</li>
          </ul>
        </div>
      </aside>
    </div>
  </main>

  <script>
    // --- Data & helpers ---
    const jokes = [
      "I’m just pollen your leg 🌼",
      "You grow, girl! 🌸",
      "Stop and smell the roses... or at least the Wi‑Fi. 😄",
      "I’m rooting for you! 🌱",
      "Bee mine? 🐝 (only if you promise to water me)",
      "Being a gardener means you always have thyme."
    ];

    const gallery = document.getElementById('gallery');
    const fileInput = document.getElementById('fileInput');
    const clearGallery = document.getElementById('clearGallery');
    const selectedCountEl = document.getElementById('selectedCount');
    const crossBtn = document.getElementById('crossBtn');
    const hybridPreview = document.getElementById('hybridPreview');
    const hybridName = document.getElementById('hybridName');
    const hybridDesc = document.getElementById('hybridDesc');
    const resultArea = document.getElementById('resultArea');
    const quoteBox = document.getElementById('quoteBox');
    const randomJokeBtn = document.getElementById('randomJoke');

    let items = []; // {id, src, name, selected}

    // --- Gallery & Image handling ---
    fileInput.addEventListener('change', (e)=>{
      const files = Array.from(e.target.files);
      files.forEach((f, idx)=>{
        const reader = new FileReader();
        reader.onload = function(ev){
          const src = ev.target.result;
          // Ask user for a name for the flower (fallback to filename)
          // We won't block the UI with prompt in big batches. Instead: use filename as default.
          const name = f.name.split('.').slice(0,-1).join('.') || `Flower ${items.length+1}`;
          addThumb(src, name);
        }
        reader.readAsDataURL(f);
      });
      fileInput.value = '';
    });

    function addThumb(src, name){
      const id = cryptoRandomId();
      const div = document.createElement('div');
      div.className = 'thumb';
      div.dataset.id = id;
      div.dataset.name = name;
      div.title = name;

      const img = document.createElement('img');
      img.src = src;
      img.alt = name;
      div.appendChild(img);

      const nameLabel = document.createElement('div');
      nameLabel.className = 'name';
      nameLabel.innerText = name.length>12? name.slice(0,12)+"...":name;
      div.appendChild(nameLabel);

      div.addEventListener('click', ()=>toggleSelect(id, div));

      gallery.appendChild(div);
      items.push({id,src,name,el:div,selected:false});
      updateSelectedCount();
    }

    clearGallery.addEventListener('click', ()=>{
      items = [];
      gallery.innerHTML='';
      resetHybridArea();
      updateSelectedCount();
    });

    function toggleSelect(id, el){
      const it = items.find(x=>x.id===id);
      if(!it) return;
      // Toggle selection but allow only up to 2 selected
      const currentlySelected = items.filter(x=>x.selected);
      if(!it.selected && currentlySelected.length>=2){
        // deselect the first selected to allow replacement (nice UX)
        currentlySelected[0].selected=false;
        currentlySelected[0].el.classList.remove('selected');
      }
      it.selected = !it.selected;
      el.classList.toggle('selected', it.selected);
      updateSelectedCount();
    }

    function updateSelectedCount(){
      const count = items.filter(x=>x.selected).length;
      selectedCountEl.innerText = count;
      crossBtn.disabled = count!==2;
    }

    function cryptoRandomId(){return 'id'+Math.random().toString(36).slice(2,9)}

    // --- Cross pollinate logic ---
    crossBtn.addEventListener('click', ()=>{
      const parents = items.filter(x=>x.selected);
      if(parents.length!==2) return;
      const [a,b]=parents;
      showHybrid(a,b);
    });

    function showHybrid(a,b){
      // hybrid name: combine first half of a.name and second half of b.name
      function halfMix(n1,n2){
        const split1 = Math.max(1, Math.floor(n1.length/2));
        const split2 = Math.max(1, Math.floor(n2.length/2));
        return n1.slice(0,split1) + n2.slice(split2);
      }
      const name = halfMix(a.name.split('.')[0], b.name.split('.')[0]);

      // pick two random colors for gradient background — derive from parents by sampling a color (approx)
      const c1 = sampleAverageColor(a.src) || randomPastel();
      const c2 = sampleAverageColor(b.src) || randomPastel();

      hybridPreview.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
      hybridPreview.innerText = name.split(' ').map(s=>s[0]||'').join('').slice(0,2).toUpperCase();
      hybridName.innerText = name;
      hybridDesc.innerText = `A whimsical mix of ${a.name} + ${b.name} — smells like javascript and sunshine.`;

      // result area: show a playful card and a little "DNA" swirl
      resultArea.innerHTML = `
        <div style="margin-top:12px;padding:12px;border-radius:10px;background:linear-gradient(90deg,#FFF5F9,#F0FFF0)">
          <strong>New hybrid:</strong> <span style="font-weight:700">${name}</span>
          <div style="margin-top:8px;display:flex;gap:8px;align-items:center">
            <img src="${a.src}" style="width:80px;height:60px;object-fit:cover;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,0.06)">
            <img src="${b.src}" style="width:80px;height:60px;object-fit:cover;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,0.06)">
            <div style="padding:8px;background:rgba(255,255,255,0.8);border-radius:8px">Hybrid color preview:</div>
            <div style="width:44px;height:44px;border-radius:8px;background:${c1}"></div>
            <div style="width:44px;height:44px;border-radius:8px;background:${c2}"></div>
          </div>
        </div>`;

      // small confetti of petals (very simple)
      blossomConfetti();
    }

    // Very small petal confetti — ephemeral decorations
    function blossomConfetti(){
      for(let i=0;i<8;i++){
        const el=document.createElement('div');
        el.style.position='fixed';
        el.style.left=(40+Math.random()*60)+'%';
        el.style.top=(20+Math.random()*60)+'%';
        el.style.width='10px';el.style.height='16px';el.style.borderRadius='6px';
        el.style.background=['#FF9ACA','#FFD38E','#A9E3FF','#C6A9FF'][Math.floor(Math.random()*4)];
        el.style.opacity='0.95';el.style.transform='rotate('+Math.random()*360+'deg)';
        el.style.zIndex=9999;el.style.transition='transform 900ms ease, opacity 900ms ease';
        document.body.appendChild(el);
        setTimeout(()=>{el.style.transform='translateY(160px) rotate(40deg)';el.style.opacity='0'},30);
        setTimeout(()=>el.remove(),1100);
      }
    }

    // --- Quotes ---
    randomJokeBtn.addEventListener('click', ()=>{randomQuote()});
    function randomQuote(){quoteBox.innerText = jokes[Math.floor(Math.random()*jokes.length)];}
    randomQuote();

    // --- Bloom interaction ---
    const budGroup = document.getElementById('budGroup');
    const petals = document.getElementById('petals');
    const plantPanel = document.getElementById('plantPanel');
    let bloomed=false;
    budGroup.addEventListener('click', ()=>{
      if(!bloomed){
        // reveal petals
        petals.style.opacity = 1;
        // animate petals by toggling class on parent
        plantPanel.classList.add('bloomed');
        // animate center
        document.getElementById('centerP').style.opacity = '1';
        bloomed=true;
      } else {
        // wiggle
        plantPanel.classList.toggle('wiggle');
        plantPanel.animate([
          { transform: 'translateY(0)' },
          { transform: 'translateY(-8px)' },
          { transform: 'translateY(0)' }
        ], {duration:400,iterations:1});
      }
    });

    // --- Color sampling (best effort) ---
    // We'll attempt to sample average color from a small canvas. If image src is dataURL, it will usually succeed.
    function sampleAverageColor(src){
      try{
        const img = new Image();
        img.crossOrigin='Anonymous';
        img.src = src;
        return null; // synchronous fallback — we could make async, but keep it simple: return random pastel for now.
      }catch(e){
        return null;
      }
    }
    function randomPastel(){
      const r = Math.floor(160 + Math.random()*80);
      const g = Math.floor(160 + Math.random()*80);
      const b = Math.floor(160 + Math.random()*80);
      return `rgb(${r},${g},${b})`;
    }

    function resetHybridArea(){
      hybridPreview.style.background = 'linear-gradient(135deg,#FFB6C1,#FFD1A9)';
      hybridPreview.innerText = 'HB';
      hybridName.innerText = 'Pick two flowers';
      hybridDesc.innerText = 'Hybrid will appear here — maybe it giggles.';
      resultArea.innerHTML = '';
    }

    // --- small accessibility helper: allow dropping images by paste/drag ---
    document.addEventListener('paste', (ev)=>{
      const itemsP = ev.clipboardData && ev.clipboardData.items;
      if(!itemsP) return;
      Array.from(itemsP).forEach(it=>{
        if(it.kind==='file'){
          const f = it.getAsFile();
          const reader = new FileReader();
          reader.onload = e=> addThumb(e.target.result, f.name);
          reader.readAsDataURL(f);
        }
      });
    });

    // Small helpful hint: add a default sample flower so the UI isn't empty
    (function addDefaults(){
      // small svg placeholders encoded as data URLs
      const sample1 = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 120 80\"><rect width=\"100%\" height=\"100%\" fill=\"#FFF0F6\"/><circle cx=\"60\" cy=\"36\" r=\"18\" fill=\"#FF9ACA\"/><circle cx=\"44\" cy=\"36\" r=\"10\" fill=\"#FFD38E\"/><rect x=\"58\" y=\"50\" width=\"4\" height=\"30\" fill=\"#2b7a3a\"/></svg>')}`;
      const sample2 = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 120 80\"><rect width=\"100%\" height=\"100%\" fill=\"#F0FFF6\"/><circle cx=\"60\" cy=\"36\" r=\"18\" fill=\"#A9E3FF\"/><circle cx=\"76\" cy=\"36\" r=\"10\" fill=\"#C6A9FF\"/><rect x=\"58\" y=\"50\" width=\"4\" height=\"30\" fill=\"#2b7a3a\"/></svg>')}`;
      addThumb(sample1,'Pinky');
      addThumb(sample2,'Bluet');
    })();

    // make buttons accessible via keyboard (space/enter)
    document.querySelectorAll('.thumb').forEach(t=>{t.tabIndex=0});

  </script>
</body>
</html>
