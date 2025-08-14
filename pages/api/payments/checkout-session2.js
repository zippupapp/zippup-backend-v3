import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  try {
    const {
      items = [],
      name, phone, address, unit, notes, metadata,
      successUrl, success_url,
      cancelUrl,  cancel_url,
    } = req.body || {};

    const successURL = successUrl || success_url || 'https://your-frontend.example.com/?checkout=success';
    const cancelURL  = cancelUrl  || cancel_url  || 'https://your-frontend.example.com/?checkout=cancel';

    const line_items = items.map(i => ({
      price_data: {
        currency: 'usd',
        product_data: { name: i.name || 'Item' },
        unit_amount: i.amount,
      },
      quantity: i.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: successURL,
      cancel_url:  cancelURL,
      metadata: {
        ...(metadata || {}),
        name: String(name || ''),
        phone: String(phone || ''),
        address: String(address || ''),
        unit: String(unit || ''),
        notes: String(notes || ''),
      },
    });

    return res.status(200).json({ id: session.id });
  } catch (e) {
    return res.status(400).json({ error: e.message || 'stripe_session_failed' });
  }
}
