export default function handler(req, res) {
  if (req.method === 'POST') return res.status(200).json({ ok: true, count: Array.isArray(req.body)? req.body.length: 1 });
  res.status(405).end();
}
