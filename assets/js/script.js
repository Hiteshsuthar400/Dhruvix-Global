// Basic frontend interactions: mobile nav, simple cart (localStorage), secret gate

document.addEventListener('DOMContentLoaded', ()=>{
  // Cart - simple API via localStorage
  const CART_KEY = 'dg_cart_v1';
  window.addToCart = function(product){
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    const existing = cart.find(p => p.id === product.id);
    if(existing) existing.qty += 1; else cart.push({...product, qty:1});
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    alert('Added to cart');
  }

  window.getCart = function(){
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  }

  // Simple secret page client-side gate (placeholder)
  const secretForm = document.getElementById('secret-form');
  if(secretForm){
    secretForm.addEventListener('submit', e=>{
      e.preventDefault();
      const p = document.getElementById('secret-pass').value;
      // NOTE: client-side check is not secure. Use server auth for real protection.
      if(p === 'letmein'){
        document.getElementById('secret-content').style.display = 'block';
        document.getElementById('secret-form').style.display = 'none';
      } else alert('Incorrect password');
    })
  }

});
