export default function handler(req, res) {
  if (req.method === 'POST') return res.status(200).json({ ok: true, id: 'p'+Date.now() });
  res.status(405).end();
}
