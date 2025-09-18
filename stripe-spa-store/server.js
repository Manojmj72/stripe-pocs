// server.js - complete
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4242;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const BASE_DOMAIN = process.env.BASE_DOMAIN || `http://localhost:${PORT}`;

if (!STRIPE_SECRET_KEY) {
  console.error('Missing STRIPE_SECRET_KEY in .env. Copy .env.example -> .env and set your key.');
  process.exit(1);
}

const Stripe = require('stripe');
const stripe = Stripe(STRIPE_SECRET_KEY);

// Sample product catalog (client also has this; server trusts client-provided items for this demo)
const PRODUCTS = {
  "prod_camera": { id: "prod_camera", name: "Retro Camera", description: "35mm style camera", currency: "usd", unit_amount: 4999 },
  "prod_watch":  { id: "prod_watch",  name: "Classic Watch",  description: "Leather strap",     currency: "usd", unit_amount: 7999 },
  "prod_mug":    { id: "prod_mug",    name: "Coffee Mug",     description: "Ceramic, 350ml",   currency: "usd", unit_amount: 1299 }
};

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

// Create Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, customerEmail } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
    }

    // Build line_items from items array.
    // Each item: { id: "prod_x", quantity: 1 } or with overrides.
    const line_items = items.map(it => {
      const product = PRODUCTS[it.id];
      if (!product) throw new Error(`Unknown product id: ${it.id}`);
      return {
        price_data: {
          currency: product.currency,
          unit_amount: product.unit_amount,
          product_data: {
            name: product.name,
            description: product.description
          }
        },
        quantity: it.quantity || 1
      };
    });

    // Create session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      payment_intent_data: {
        // optional: metadata you want to store on PaymentIntent
        metadata: {
          store: 'stripe-spa-store'
        }
      },
      // Provide customer email if passed (pre-fills checkout)
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      success_url: `${BASE_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_DOMAIN}/cancel.html`
    });

    // Return the session URL to redirect the customer to Stripe Checkout
    res.json({ url: session.url });

  } catch (err) {
    console.error('Error creating checkout session:', err);
    res.status(500).json({ error: err.message });
  }
});

// Optional endpoint to fetch product catalog (frontend could also hardcode)
app.get('/catalog', (req, res) => {
  res.json(Object.values(PRODUCTS));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
