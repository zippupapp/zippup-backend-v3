export default function handler(req, res) {
  if (req.method === 'GET') return res.status(200).json([]); // later: return real products
  res.status(405).end();
}
