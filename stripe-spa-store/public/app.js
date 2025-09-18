// app.js - complete client side logic
(async function () {
  // Simple in-memory product list (mirror of server PRODUCTS)
  const PRODUCTS = [
    { id: 'prod_camera', name: 'Retro Camera', description: '35mm style camera', price: 4999 },
    { id: 'prod_watch',  name: 'Classic Watch',  description: 'Leather strap',     price: 7999 },
    { id: 'prod_mug',    name: 'Coffee Mug',     description: 'Ceramic, 350ml',   price: 1299 },
  ];

  // Utilities
  const formatPrice = (amount) => {
    return (amount / 100).toFixed(2);
  };

  // DOM
  const productsEl = document.getElementById('products');
  const cartEl = document.getElementById('cart');
  const checkoutBtn = document.getElementById('checkout-btn');
  const emailInput = document.getElementById('email');

  let cart = []; // [{id, quantity}]

  function renderProducts() {
    productsEl.innerHTML = '';
    PRODUCTS.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p><strong>$${formatPrice(p.price)}</strong></p>
        <div>
          <button data-id="${p.id}" class="add">Add</button>
        </div>
      `;
      productsEl.appendChild(card);
    });
  }

  function renderCart() {
    cartEl.innerHTML = '';
    if (cart.length === 0) {
      cartEl.innerHTML = '<p>No items in cart.</p>';
      checkoutBtn.disabled = true;
      return;
    }
    checkoutBtn.disabled = false;
    const ul = document.createElement('ul');
    let total = 0;
    cart.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      const li = document.createElement('li');
      li.innerHTML = `${product.name} x ${item.quantity} — $${formatPrice(product.price * item.quantity)}`;
      ul.appendChild(li);
      total += product.price * item.quantity;
    });
    const totalEl = document.createElement('p');
    totalEl.innerHTML = `<strong>Total: $${formatPrice(total)}</strong>`;
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear cart';
    clearBtn.onclick = () => { cart = []; renderCart(); };

    cartEl.appendChild(ul);
    cartEl.appendChild(totalEl);
    cartEl.appendChild(clearBtn);
  }

  function addToCart(id) {
    const existing = cart.find(c => c.id === id);
    if (existing) existing.quantity++;
    else cart.push({ id, quantity: 1 });
    renderCart();
  }

  // Events
  productsEl.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button.add');
    if (!btn) return;
    addToCart(btn.dataset.id);
  });

  checkoutBtn.addEventListener('click', async () => {
    if (cart.length === 0) return alert('Cart empty');
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = 'Creating checkout...';

    try {
      const body = {
        items: cart,
        customerEmail: emailInput.value || undefined
      };

      const res = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      // Redirect to Stripe Checkout page (session.url)
      window.location = data.url;
    } catch (err) {
      console.error(err);
      alert('Error creating checkout session: ' + err.message);
      checkoutBtn.disabled = false;
      checkoutBtn.textContent = 'Checkout with Stripe';
    }
  });

  // Init
  renderProducts();
  renderCart();
})();
