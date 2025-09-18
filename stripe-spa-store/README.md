# Stripe Single Page Application  Store

A simple **single-page ecommerce demo store** built with **Node.js + Express** that uses **Stripe Hosted Checkout** for payments.

## Features
- Static single-page store (`index.html`) with sample products
- Cart functionality (add, clear, checkout)
- Stripe Checkout session creation on the server
- Redirect to Stripe Hosted Checkout page
- Success and Cancel pages

## Folder Structure

```
stripe-spa-store/
├─ public/
│  ├─ index.html
│  ├─ app.js
│  ├─ style.css
│  ├─ success.html
│  └─ cancel.html
├─ .env.example
├─ package.json
├─ server.js
└─ README.md
```

## Requirements
- [Node.js](https://nodejs.org/) v18+
- A [Stripe](https://stripe.com/) account (test mode is fine)
- Your Stripe **test API keys**:
  - `STRIPE_SECRET_KEY` (starts with `sk_test_...`)
  - `STRIPE_PUBLIC_KEY` (starts with `pk_test_...`)

## Setup

1. **Clone this repository:**
   ```bash
   git clone https://github.com/Manojmj72/stripe-pocs.git
   cd stripe-spa-store
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Copy `.env.example` to `.env` and fill in your keys:**
   ```bash
   cp .env.example .env
   ```

   Example `.env`:
   ```env
   PORT=4242
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   STRIPE_PUBLIC_KEY=pk_test_your_publishable_key
   BASE_DOMAIN=http://localhost:4242
   ```

4. **Run the server:**
   ```bash
   npm start
   ```

   or with auto-reload in dev:
   ```bash
   npm run dev
   ```

5. **Open your browser at [http://localhost:4242](http://localhost:4242)**

6. Add products to the cart and click **Checkout**. You'll be redirected to Stripe Checkout.

7. Use Stripe's test card `4242 4242 4242 4242` with any future expiry and CVC.

## Test Flow

1. Add a product to the cart
2. Enter a test email (optional)
3. Click **Checkout** → you'll be redirected to Stripe
4. Enter test card details
5. Payment success → redirected to `success.html`
6. Or cancel → redirected to `cancel.html`

## Notes

This is a demo project — it doesn't include order fulfillment or webhooks.

**For production:**
- Set up [Stripe Webhooks](https://stripe.com/docs/webhooks) to handle order fulfillment
- Store products & prices in Stripe Dashboard instead of hardcoding
- Use HTTPS in production (`BASE_DOMAIN` must be HTTPS for Stripe Checkout)