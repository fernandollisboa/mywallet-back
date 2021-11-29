import '../../src/setup.js';
import supertest from 'supertest';
import app from '../../src/app.js';
import { clearDatabase, closeConnection } from '../util/database.js';
import { generateTransactionBody } from '../util/bodiesGenerator.js';
import statusCode from '../../src/enum/statusCode.js';
import * as transactionRepository from '../../src/repositories/transactionRepository.js';
import { createSession } from '../factories/sessionFactory.js';

const agent = supertest(app);

afterAll(async () => {
  await clearDatabase();
  await closeConnection();
});

beforeEach(async () => {
  await clearDatabase();
});

describe('POST /transactions', () => {
  it('returns 201 when the transaction is created succesfully', async () => {
    const session = await createSession();
    const body = generateTransactionBody();

    const response = await agent
      .post('/transactions')
      .send(body)
      .set('Authorization', `Bearer ${session.token}`);
    expect(response.status).toEqual(statusCode.CREATED);

    const newTransaction = await transactionRepository.selectAllByUserId({
      userId: session.user.id,
    });

    expect(newTransaction[0]).toEqual({
      createdAt: expect.any(Date),
      userId: String(session.user.id),
      description: body.description,
      id: expect.any(Number),
      value: body.value,
      type: body.type,
    });
  });

  // it('returns 400 when no token is given', async () => {
  //   const body = {};

  //   const response = await agent.post('/transactions').send(body);

  //   expect(response.status).toEqual(statusCode.BAD_REQUEST);
  // });

  // it('returns 400 for empty body but valid token', async () => {
  //   const body = {};
  //   const session = await createSession();

  //   const response = await agent
  //     .post('/transactions')
  //     .send(body)
  //     .set('Authorization', `Bearer ${session.token}`);

  //   expect(response.status).toEqual(statusCode.BAD_REQUEST);
  // });

  // it('returns 400 for invalid transaction type', async () => {
  //   const session = await createSession();
  //   const body = generateTransactionBody({ type: 'ERR' });

  //   const response = await agent
  //     .post('/transactions')
  //     .send(body)
  //     .set('Authorization', `Bearer ${session.token}`);

  //   expect(response.status).toEqual(statusCode.BAD_REQUEST);
  // });

  // it('returns 401 for invalid token', async () => {
  //   const body = {};

  //   const response = await agent
  //     .post('/transactions')
  //     .send(body)
  //     .set('Authorization', 'Bearer invalid_token');

  //   expect(response.status).toEqual(statusCode.UNAUTHORIZED);
  // });

  // it('returns 400 for negative values', async () => {
  //   const session = await createSession();
  //   const body = generateTransactionBody({ value: '-0.01' });

  //   const response = await agent
  //     .post('/transactions')
  //     .send(body)
  //     .set('Authorization', `Bearer ${session.token}`);

  //   expect(response.status).toEqual(statusCode.BAD_REQUEST);
  // });
});
