// pages/api/marketplace/orders.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  try {
    // You can persist the order here if you have a DB (req.body has items, name, phone, address, etc.)
    const orderId = `ord_${Date.now()}`;
    const deliveryCode = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit code
    return res.status(200).json({ orderId, deliveryCode, status: 'pending' });
  } catch (e) {
    return res.status(500).json({ error: 'order_failed' });
  }
}
