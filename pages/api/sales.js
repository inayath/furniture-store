import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { furniture_id, quantity } = req.body;

    if (!furniture_id || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    try {
      // Get furniture item
      const [item] = await query('SELECT * FROM furniture WHERE id = ?', [furniture_id]);

      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }

      if (item.stock < quantity) {
        return res.status(400).json({ error: 'Not enough stock' });
      }

      const total_price = item.price * quantity;

      // Insert sale
      await query(
        'INSERT INTO sales (furniture_id, quantity, total_price) VALUES (?, ?, ?)',
        [furniture_id, quantity, total_price]
      );

      // Update stock
      await query(
        'UPDATE furniture SET stock = stock - ? WHERE id = ?',
        [quantity, furniture_id]
      );

      res.status(201).json({ message: 'Sale successful', total_price });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Sale failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
