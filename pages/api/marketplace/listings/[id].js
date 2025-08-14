export default function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'PATCH') return res.status(200).json({ ok: true, id, ...req.body }); // e.g., {status:'disabled'}
  res.status(405).end();
}
