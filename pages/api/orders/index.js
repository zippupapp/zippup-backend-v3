let orders = [
	{ id: 'ord_1', status: 'preparing', type: 'food', vendorName: 'Burger Place' },
	{ id: 'ord_2', status: 'enroute',   type: 'transport', title: 'Taxi • Alex' },
];

export default function handler(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') return res.status(200).end();

	if (req.method === 'GET') {
		return res.status(200).json(orders);
	}

	return res.status(405).json({ error: 'Method not allowed' });
}
