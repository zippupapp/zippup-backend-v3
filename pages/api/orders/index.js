export default function handler(req, res) {
  if (req.method === 'GET') return res.status(200).json([]);      // Admin list
  if (req.method === 'POST') return res.status(200).json({ ok:true, id:'ord'+Date.now(), ...req.body });
  res.status(405).end();
}
