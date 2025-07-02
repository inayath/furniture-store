import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const results = await query('SELECT * FROM furniture');
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch furniture' });
    }
  } else if (req.method === 'POST') {
    const { name, price, stock } = req.body;
    if (!name || !price || !stock) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    try {
      const result = await query(
        'INSERT INTO furniture (name, price, stock) VALUES (?, ?, ?)',
        [name, price, stock]
      );
      res.status(201).json({ id: result.insertId, name, price, stock });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add furniture' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
