export default function handler(req, res) {
  if (req.method === 'GET') return res.status(200).json({ number: null }); // later: return regional default
  res.status(405).end();
}
