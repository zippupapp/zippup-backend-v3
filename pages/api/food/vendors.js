export default function handler(req, res) {
  if (req.method === 'GET') return res.status(200).json([]); // later: real vendors
  res.status(405).end();
}
