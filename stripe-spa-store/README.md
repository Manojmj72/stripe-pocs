# Stripe SPA Store

A simple **single-page ecommerce demo store** built with **Node.js + Express** that uses **Stripe Hosted Checkout** for payments.

## Features
- Static single-page store (`index.html`) with sample products
- Cart functionality (add, clear, checkout)
- Stripe Checkout session creation on the server
- Redirect to Stripe Hosted Checkout page
- Success and Cancel pages

## Folder Structure

stripe-spa-store/
├─ public/
│ ├─ index.html
│ ├─ app.js
│ ├─ style.css
│ ├─ success.html
│ └─ cancel.html
├─ .env.example
├─ package.json
├─ server.js
└─ README.md


## Requirements
- [Node.js](https://nodejs.org/) v18+
- A [Stripe](https://stripe.com/) account (test mode is fine)
- Your Stripe **test API keys**:
  - `STRIPE_SECRET_KEY` (starts with `sk_test_...`)
  - `STRIPE_PUBLIC_KEY` (starts with `pk_test_...`)

## Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/stripe-spa-store.git
   cd stripe-spa-store


Install dependencies:

npm install


Copy .env.example to .env and fill in your keys:

cp .env.example .env


Example .env:

PORT=4242
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_PUBLIC_KEY=pk_test_your_publishable_key
BASE_DOMAIN=http://localhost:4242


Run the server:

npm start


or with auto-reload in dev:

npm run dev


Open your browser at http://localhost:4242
.

Add products to the cart and click Checkout. You’ll be redirected to Stripe Checkout.

Use Stripe’s test card 4242 4242 4242 4242 with any future expiry and CVC.

Test Flow

Add a product to the cart

Enter a test email (optional)

Click Checkout → you’ll be redirected to Stripe

Enter test card details

Payment success → redirected to success.html

Or cancel → redirected to cancel.html

Notes

This is a demo project — it doesn’t include order fulfillment or webhooks.

For production:

Set up Stripe Webhooks
 to handle order fulfillment.

Store products & prices in Stripe Dashboard instead of hardcoding.

Use HTTPS in production (BASE_DOMAIN must be HTTPS for Stripe Checkout).