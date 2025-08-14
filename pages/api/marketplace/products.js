export default function handler(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') return res.status(200).end();

	if (req.method === 'GET') {
		return res.status(200).json([
			{ id: 'p1', title: 'Smartphone X', category: 'electronics', price: 499, stock: 12 },
			{ id: 'p2', title: 'Running Shoes', category: 'sports',      price: 79,  stock: 18 },
		]);
	}

	return res.status(405).json({ error: 'Method not allowed' });
}
