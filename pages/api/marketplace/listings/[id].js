export default async function handler(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') return res.status(200).end();

	if (req.method === 'PATCH') {
		// Stub: accept any patch, return ok
		return res.status(200).json({ ok: true });
	}

	return res.status(405).json({ error: 'Method not allowed' });
}
