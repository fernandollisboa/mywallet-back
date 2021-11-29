import dayjs from 'dayjs';
import faker from 'faker';
import connection from '../../src/database/connection.js';

export async function createTransaction(userId, { value, type } = {}) {
  const data = {
    userId,
    value: value || faker.finance.amount(0.01, 999999, 2),
    type: type || faker.random.arrayElement(['INC', 'OUT']),
    description: faker.lorem.sentence(),
  };

  const now = dayjs().format('DD-MM-YYYY');

  data.createdAt = now;

  await connection.query(
    'INSERT INTO transactions (customer_id,value,type, description, created_at) VALUES ($1,$2,$3,$4,$5);',
    [userId, data.value, data.type, data.description, now],
  );

  return data;
}
