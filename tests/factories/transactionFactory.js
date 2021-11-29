import faker from 'faker';
import connection from '../../src/database/connection.js';

export async function createTransaction(userId, { value, type } = {}) {
  const data = {
    userId,
    value: value || faker.finance.amount(0.01, 999999, 2),
    type: type || faker.random.arrayElement(['INC', 'OUT']),
  };

  await connection.query('INSERT INTO transactions (customer_id,value,type) VALUES ($1,$2,$3);', [
    userId,
    data.value,
    data.type,
  ]);

  return data;
}
