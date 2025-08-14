export default function handler(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') return res.status(200).end();

	if (req.method === 'GET') {
		// Return some sample items so Admin UI has data
		return res.status(200).json([
			{ id: 'item_1', name: 'Sample Burger', price: 1500, currency: 'NGN' },
			{ id: 'item_2', name: 'Sample Pizza', price: 3500, currency: 'NGN' }
		]);
	}

	return res.status(405).json({ error: 'Method not allowed' });
}
