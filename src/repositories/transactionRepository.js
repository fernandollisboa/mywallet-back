import connection from '../database/connection.js';

export async function insert({ userId, transaction: { type, value, description, createdAt } }) {
  const insertedTransaction = await connection.query(
    `INSERT INTO transactions (customer_id,value,type,description,created_at) 
    VALUES ($1,$2,$3,$4,$5) RETURNING *;`,
    [userId, value, type, description, createdAt],
  );

  return insertedTransaction.rows[0];
}

export async function selectAllByUserId({ userId }) {
  const userTransactions = await connection.query(
    'SELECT id,customer_id AS "userId", value, type, description, created_at AS "createdAt" FROM transactions WHERE customer_id=$1;',
    [userId],
  );

  return userTransactions.rows;
}
