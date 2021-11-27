import connection from '../database/connection.js';

export async function selectByEmail({ email }) {
  const user = await connection.query('SELECT * FROM customers WHERE email = $1;', [email]);

  return user.rows[0];
}

export async function insert({ email, name, hashPassword }) {
  const insertedUser = await connection.query(
    'INSERT INTO customers (email,name,password) VALUES ($1,$2,$3) RETURNING *;',
    [email, name, hashPassword],
  );

  return insertedUser.rows[0];
}
