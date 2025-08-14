export default function handler(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') return res.status(200).end();

	if (req.method === 'GET') {
		return res.status(200).json([
			{ id: 'v1', name: 'Burger Place', kind: 'fastfood' },
			{ id: 'v2', name: 'Pizza Town',   kind: 'fastfood' },
			{ id: 'v3', name: 'Green Grocer', kind: 'grocery' },
		]);
	}

	return res.status(405).json({ error: 'Method not allowed' });
}
