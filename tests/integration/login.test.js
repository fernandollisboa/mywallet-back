import '../../src/setup.js';
import supertest from 'supertest';
import app from '../../src/app.js';
import { clearDatabase, closeConnection } from '../util/database.js';
import { generateLoginBody } from '../util/bodiesGenerator.js';
import statusCode from '../../src/enum/statusCode.js';
import { createUser } from '../factories/userFactory.js';
import * as sessionRepository from '../../src/repositories/sessionRepository.js';

const agent = supertest(app);

afterAll(async () => {
  await clearDatabase();
  await closeConnection();
});

beforeEach(async () => {
  await clearDatabase();
});

describe('POST /login', () => {
  it('returns 200 for existing user with valid credentials', async () => {
    const mockUser = await createUser();
    const body = generateLoginBody(mockUser);

    const response = await agent.post('/login').send(body);
    expect(response.status).toEqual(statusCode.OK);
    const createdSession = await sessionRepository.selectByUserId({ id: mockUser.id });
    expect(createdSession).toEqual(response.status.token);
  });

  it('returns 401 for existing user but wrong password', async () => {
    const mockUser = await createUser({ password: 'password' });
    const body = generateLoginBody({ email: mockUser.email, password: 'other_password' });

    const response = await agent.post('/login').send(body);
    expect(response.status).toEqual(statusCode.UNAUTHORIZED);
  });

  it('returns 400 for invalid email', async () => {
    const mockUser = await createUser({ email: 'invalid_email' });
    const body = generateLoginBody(mockUser);

    const response = await agent.post('/login').send(body);
    expect(response.status).toEqual(statusCode.BAD_REQUEST);
  });

  it('returns 400 for invalid password (less than 6 digits)', async () => {
    const mockUser = await createUser({ password: '   ' });
    const body = generateLoginBody(mockUser);

    const response = await agent.post('/login').send(body);
    expect(response.status).toEqual(statusCode.BAD_REQUEST);
  });

  it('returns 400 for invalid body', async () => {
    const body = {};

    const response = await agent.post('/login').send(body);
    expect(response.status).toEqual(statusCode.BAD_REQUEST);
  });
});
