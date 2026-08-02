// Combined frontend interactions: mobile nav, cart (localStorage), and secret gate

document.addEventListener('DOMContentLoaded', ()=>{
  // --- Mobile navigation toggle (injects toggle if missing) ---
  function ensureNavToggle(){
    const header = document.querySelector('.header') || document.querySelector('.site-header');
    if(!header) return;
    if(header.querySelector('#nav-toggle')) return; // already present
    const btn = document.createElement('button');
    btn.id = 'nav-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label','Toggle navigation');
    btn.textContent = '☰';
    btn.style.fontSize = '18px';
    btn.addEventListener('click', ()=>{
      document.body.classList.toggle('nav-open');
    });
    // insert before nav if possible
    const nav = header.querySelector('.nav') || header.querySelector('.main-nav');
    if(nav){ header.insertBefore(btn, nav); } else { header.appendChild(btn); }
  }
  ensureNavToggle();

  // Close mobile nav when clicking outside
  document.addEventListener('click', (e)=>{
    if(!document.body.classList.contains('nav-open')) return;
    const header = document.querySelector('.header') || document.querySelector('.site-header');
    const nav = header && (header.querySelector('.nav') || header.querySelector('.main-nav'));
    const toggle = header && header.querySelector('#nav-toggle');
    if(nav && !nav.contains(e.target) && toggle && !toggle.contains(e.target)){
      document.body.classList.remove('nav-open');
    }
  });

  // --- Cart - simple API via localStorage (keeps previous keys compatible) ---
  const CART_KEY = 'dg_cart_v1';
  function updateCartCount(){
    const countEl = document.getElementById('cart-count');
    if(!countEl) return;
    try{
      const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      const total = cart.reduce((s,i)=>s + (i.qty||1), 0);
      countEl.textContent = total;
    }catch(e){countEl.textContent = 0}
  }

  window.addToCart = function(product){
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    const existing = cart.find(p => p.id === product.id);
    if(existing) existing.qty += 1; else cart.push({...product, qty:1});
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
    // simple feedback
    if(window.navigator && window.navigator.vibrate) navigator.vibrate(30);
  }

  // click handler for add-btn elements (for pages using data attributes)
  document.addEventListener('click', e=>{
    const t = e.target;
    if(t && t.classList && t.classList.contains('add-btn')){
      const name = t.dataset.name || t.getAttribute('data-name');
      const price = parseFloat(t.dataset.price || t.getAttribute('data-price') || 0);
      const id = t.dataset.id || (name ? name.toLowerCase().replace(/[^a-z0-9]+/g,'-') : ('p-'+Date.now()));
      addToCart({id, name, price});
      t.textContent = 'Added';
      setTimeout(()=> t.textContent = 'Add to cart', 800);
    }
  });

  // secret page client-side gate (placeholder)
  const secretForm = document.getElementById('secret-form');
  if(secretForm){
    secretForm.addEventListener('submit', e=>{
      e.preventDefault();
      const p = document.getElementById('secret-pass').value;
      if(p === 'letmein'){
        document.getElementById('secret-content').style.display = 'block';
        document.getElementById('secret-form').style.display = 'none';
      } else alert('Incorrect password');
    })
  }

  // cart button quick summary (if present)
  const cartBtn = document.getElementById('cart-btn');
  if(cartBtn){
    cartBtn.addEventListener('click', ()=>{
      const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      if(!cart.length) return alert('Your cart is empty');
      const summary = cart.map(i=>`${i.qty} × ${i.name} — $${(i.price*i.qty).toFixed(2)}`).join('\n');
      const total = cart.reduce((s,i)=>s + i.price*i.qty,0).toFixed(2);
      alert(summary + '\n\nTotal: $' + total);
    });
  }

  // init
  updateCartCount();

});
