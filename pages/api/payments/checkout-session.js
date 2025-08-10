// pages/api/payments/checkout-session.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

export default async function handler(req, res) {
  // CORS for your PWA domain; use '*' while testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  try {
    const {
      items = [],
      name,
      phone,
      address,
      unit,
      notes,
      successUrl,
      cancelUrl,
    } = req.body || {};

    const line_items = items.map((i) => ({
      price_data: {
        currency: 'usd', // change if needed
        product_data: { name: String(i.title || 'Item') },
        unit_amount: Math.round(Number(i.price || 0) * 100),
      },
      quantity: Number(i.qty || 1),
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: successUrl || 'https://your-frontend.example.com/?checkout=success',
      cancel_url: cancelUrl || 'https://your-frontend.example.com/?checkout=cancel',
      metadata: {
        name: String(name || ''),
        phone: String(phone || ''),
        address: String(address || ''),
        unit: String(unit || ''),
        notes: String(notes || ''),
      },
    });

    return res.status(200).json({ url: session.url, id: session.id });
  } catch (err) {
    console.error('stripe session error:', err);
    return res.status(500).json({ error: 'stripe_session_failed' });
  }
}
