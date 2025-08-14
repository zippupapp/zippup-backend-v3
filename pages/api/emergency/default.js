export default function handler(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	if (req.method === 'OPTIONS') {
		return res.status(200).end();
	}

	if (req.method === 'GET') {
		// Return default emergency numbers per region (stub)
		return res.status(200).json({ regions: [], numbers: [] });
	}

	if (req.method === 'POST' || req.method === 'PATCH') {
		// Accept admin updates (stub)
		return res.status(200).json({ ok: true });
	}

	return res.status(405).json({ error: 'Method not allowed' });
}
