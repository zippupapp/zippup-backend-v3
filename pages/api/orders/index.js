export default function handler(req, res) {
export default async function handler(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') return res.status(200).end();

	if (req.method === 'PATCH') {
		// Stub: accept status updates
		try {
			const body = req.body && (typeof req.body === 'object' ? req.body : JSON.parse(req.body));
			return res.status(200).json({ ok: true, status: body?.status || 'updated' });
		} catch {
			return res.status(400).json({ error: 'Invalid JSON' });
		}
	}

	return res.status(405).json({ error: 'Method not allowed' });
}
