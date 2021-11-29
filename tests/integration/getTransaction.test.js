import '../../src/setup.js';
import supertest from 'supertest';
import dayjs from 'dayjs';
import app from '../../src/app.js';
import { clearDatabase, closeConnection } from '../util/database.js';
import statusCode from '../../src/enum/statusCode.js';
import { createSession } from '../factories/sessionFactory.js';
import { createTransaction } from '../factories/transactionFactory.js';

const agent = supertest(app);

afterAll(async () => {
  await clearDatabase();
  await closeConnection();
});

beforeEach(async () => {
  await clearDatabase();
});

describe('GET /transactions', () => {
  it('returns 200 when the token is valid and answers with the transactions', async () => {
    const session = await createSession();
    const userId = session.user.id;
    const transaction1 = await createTransaction(userId);
    const transaction2 = await createTransaction(userId);

    const transactions = [transaction1, transaction2];

    const response = await agent
      .get('/transactions')
      .set('Authorization', `Bearer ${session.token}`);
    expect(response.status).toEqual(statusCode.OK);

    // prettier-ignore
    transactions.forEach((t, i) => expect(t).toEqual({
      createdAt: dayjs(response.body[i].createdAt).format('DD-MM-YYYY'),
      description: response.body[i].description,
      userId: Number(response.body[i].userId),
      value: response.body[i].value,
      type: response.body[i].type,
    }));
  });

  it('returns 400 when no token is given', async () => {
    const response = await agent.get('/transactions');
    expect(response.status).toEqual(statusCode.BAD_REQUEST);
  });

  it('returns 401 for invalid token', async () => {
    const response = await agent.get('/transactions').set('Authorization', 'Bearer invalidToken');
    expect(response.status).toEqual(statusCode.UNAUTHORIZED);
  });
});

describe('GET /transactions/balance', () => {
  it('returns 200 when the token is valid and answers with the correct balance', async () => {
    const session = await createSession();
    const userId = session.user.id;

    const transaction1 = await createTransaction(userId);
    const transaction2 = await createTransaction(userId);
    const transactions = [transaction1, transaction2];

    const valuesArray = transactions.map((t) => (t.type === 'INC' ? t.value : t.value * -1));
    const sum = valuesArray.map((v) => Number(v)).reduce((total, curr) => total + curr);

    const response = await agent
      .get('/transactions/balance')
      .set('Authorization', `Bearer ${session.token}`);
    expect(response.status).toEqual(statusCode.OK);
    expect(response.body.userBalance).toEqual(sum);
  });

  it('returns 400 when no token is given', async () => {
    const response = await agent.get('/transactions/balance');
    expect(response.status).toEqual(statusCode.BAD_REQUEST);
  });

  it('returns 401 for invalid token', async () => {
    const response = await agent
      .get('/transactions/balance')
      .set('Authorization', 'Bearer invalidToken');
    expect(response.status).toEqual(statusCode.UNAUTHORIZED);
  });
});
