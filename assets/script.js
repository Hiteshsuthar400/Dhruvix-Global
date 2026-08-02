// Simple cart and contact form script
(function(){
  // Cart functionality
  function getCart(){
    try{return JSON.parse(localStorage.getItem('dhruvix_cart')||'[]')}catch(e){return[]}
  }
  function saveCart(cart){localStorage.setItem('dhruvix_cart', JSON.stringify(cart)); updateCartCount()}
  function updateCartCount(){
    var count = getCart().reduce(function(acc, it){return acc + (it.qty||1)},0);
    var el = document.getElementById('cart-count'); if(el) el.textContent = count;
  }
  function addToCart(name, price){
    var cart = getCart();
    var item = cart.find(function(i){return i.name===name});
    if(item) item.qty = (item.qty||1) + 1; else cart.push({name:name, price:parseFloat(price), qty:1});
    saveCart(cart);
  }

  document.addEventListener('click', function(e){
    if(e.target && e.target.classList.contains('add-btn')){
      var btn = e.target; addToCart(btn.dataset.name, btn.dataset.price); btn.textContent = 'Added'; setTimeout(function(){btn.textContent='Add to cart'},800);
    }
    if(e.target && e.target.id === 'cart-btn'){
      var cart = getCart();
      if(cart.length===0) return alert('Your cart is empty');
      var summary = cart.map(function(i){return i.qty + ' × ' + i.name + ' — $' + (i.price*i.qty).toFixed(2)}).join('\n');
      summary += '\n\nTotal: $' + cart.reduce(function(a,b){return a + b.price*b.qty},0).toFixed(2);
      alert(summary);
    }
  });

  // Contact form
  var form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var status = document.getElementById('contact-status');
      status.textContent = 'Sending...';
      // Simulate send
      setTimeout(function(){
        status.textContent = 'Message sent — thank you!';
        form.reset();
      },800);
    });
  }

  // init
  updateCartCount();
})();
