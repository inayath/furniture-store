import fetch from 'node-fetch';
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'sql101.infinityfree.com',
  user: 'if0_39372857',
  password: 'Nafio123456',
  database: 'if0_39372857_XXX',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function query(sql, values) {
  const [results] = await pool.execute(sql, values);
  return results;
}
