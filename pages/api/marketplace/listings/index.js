let listings = [
	{ id: 'l1', title: 'Smartphone X', category: 'electronics', price: 499, status: 'active' },
	{ id: 'l2', title: 'Running Shoes', category: 'sports',      price: 79,  status: 'active' },
];

export default async function handler(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') return res.status(200).end();

	if (req.method === 'GET') {
		return res.status(200).json(listings);
	}

	if (req.method === 'POST') {
		try {
			const body = req.body && (typeof req.body === 'object' ? req.body : JSON.parse(req.body));
			const id = body?.id || `l${Date.now()}`;
			const item = { id, title: body?.title || 'Item', category: body?.category || body?.cat || 'others', price: body?.price ?? 0, status: 'active' };
			listings.unshift(item);
			return res.status(200).json({ ok: true, id });
		} catch {
			return res.status(400).json({ error: 'Invalid JSON' });
		}
	}

	return res.status(405).json({ error: 'Method not allowed' });
}
