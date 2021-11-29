import connection from '../database/connection.js';

export async function insert({ userId, token }) {
  const session = await connection.query(
    'INSERT INTO sessions (customer_id,token) VALUES ($1,$2) RETURNING *;',
    [userId, token],
  );
  return session.rows[0];
}

export async function update({ userId, token }) {
  const session = await connection.query(
    'UPDATE sessions SET token = $1 WHERE customer_id = $2 RETURNING *;',
    [token, userId],
  );
  return session.rows[0];
}

export async function selectByUserId({ userId }) {
  const session = await connection.query('SELECT * FROM sessions WHERE customer_id = $1;', [
    userId,
  ]);
  return session.rows[0];
}

export async function selectByToken({ token }) {
  const session = await connection.query('SELECT * FROM sessions WHERE token = $1;', [token]);
  return session.rows[0];
}
