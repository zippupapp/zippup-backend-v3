export default function handler(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') return res.status(200).end();

	if (req.method === 'GET') {
		return res.status(200).json([
			{ title: 'High‑rated taxi drivers around you', type: 'transport' },
			{ title: 'Food deals near you',               type: 'food' },
		]);
	}

	return res.status(405).json({ error: 'Method not allowed' });
}
