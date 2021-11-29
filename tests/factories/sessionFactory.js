/* eslint-disable no-param-reassign */
import jwt from 'jsonwebtoken';
import connection from '../../src/database/connection.js';
import { createUser } from './userFactory.js';

export async function createSession({ user } = {}) {
  user = user || (await createUser());

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  await connection.query('INSERT INTO sessions (customer_id,token) VALUES ($1,$2);', [
    user.id,
    token,
  ]);

  return { user, token };
}
