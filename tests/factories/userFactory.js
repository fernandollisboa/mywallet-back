import faker from 'faker';
import bcrypt from 'bcrypt';
import connection from '../../src/database/connection.js';

export async function createUser({ name, email, password } = {}) {
  const data = {
    name: name || faker.name.findName(),
    email: email || faker.internet.email(),
    password: password || faker.internet.password(),
  };

  data.hashedPassword = bcrypt.hashSync(data.password, 10);

  const user = await connection.query(
    'INSERT INTO customers (email,name,password) VALUES ($1,$2,$3) RETURNING *;',
    [data.email, data.name, data.hashedPassword],
  );

  data.id = user.rows[0].id;

  return data;
}
