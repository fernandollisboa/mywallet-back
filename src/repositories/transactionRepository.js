import connection from '../database/connection.js';

export async function insert({ userId, transaction: { type, value } }) {
  const insertedTransaction = await connection.query(
    'INSERT INTO transactions (customer_id,value,type) VALUES ($1,$2,$3) RETURNING *;',
    [userId, value, type],
  );

  return insertedTransaction.rows[0];
}

export async function selectAllByUserId({ userId }) {
  const userTransactions = await connection.query(
    'SELECT * FROM transactions WHERE customer_id=$1;',
    [userId],
  );

  return userTransactions.rows;
}
