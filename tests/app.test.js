/* eslint-disable no-bitwise */
import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/connection.js';

const agent = supertest(app);
describe('GET /health', () => {
  afterAll(async () => {
    await connection.query('DELETE FROM teste;');
    connection.end();
  });

  it('returns 204 for checking system health', async () => {
    const result = await agent.get('/health');
    expect(result.status).toEqual(200);
  });
});
