export default function handler(req, res) {
  if (req.method === 'POST') return res.status(200).json({ ok: true });
  res.status(405).end();
}
