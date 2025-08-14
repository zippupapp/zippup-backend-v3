export default async function handler(req, res) {
  const q = String(req.query.q||'').trim();
  if (!q) return res.status(200).json([]);
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&addressdetails=1&q=${encodeURIComponent(q)}`, {
      headers: { 'User-Agent':'ZippUp/1.0 (support@zippup.app)' }
    });
    const j = await r.json();
    return res.status(200).json(j.map(x=>({ display_name:x.display_name, lat:x.lat, lon:x.lon })));
  } catch { return res.status(200).json([]); }
}
