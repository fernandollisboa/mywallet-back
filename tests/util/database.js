import connection from '../../src/database/connection';

export async function clearDatabase() {
  await connection.query('DELETE FROM transactions;');
  await connection.query('DELETE FROM sessions;');
  await connection.query('DELETE FROM customers;');
  // await connection.query('TRUNCATE transactions RESTART IDENTITY');
}

export async function closeConnection() {
  await connection.end();
}
