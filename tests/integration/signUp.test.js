import '../../src/setup.js';
import supertest from 'supertest';
import app from '../../src/app.js';
import { clearDatabase, closeConnection } from '../util/database.js';
import { generateSignupBody } from '../util/bodiesGenerator.js';
import statusCode from '../../src/enum/statusCode.js';
import * as userRepository from '../../src/repositories/userRepository.js';

const agent = supertest(app);

afterAll(async () => {
  await clearDatabase();
  await closeConnection();
});

beforeEach(async () => {
  await clearDatabase();
});

describe('POST /signup', () => {
  it('returns 201 for valid params and unused email and successfully creates an user', async () => {
    const body = generateSignupBody();
    const response = await agent.post('/signup').send(body);
    expect(response.status).toEqual(statusCode.CREATED);

    const newUser = await userRepository.selectByEmail({ email: body.email });
    expect(newUser).toEqual({
      id: expect.any(Number),
      name: body.name,
      email: body.email,
      password: expect.any(String),
    });
  });

  it('returns 400 for invalid body', async () => {
    const body = {};
    const response = await agent.post('/signup').send(body);
    expect(response.status).toEqual(statusCode.BAD_REQUEST);
  });

  it('returns 400 for invalid name', async () => {
    const body = generateSignupBody({ name: '   ' });
    const response = await agent.post('/signup').send(body);
    expect(response.status).toEqual(statusCode.BAD_REQUEST);
  });

  it('returns 400 for invalid email', async () => {
    const body = generateSignupBody({ email: '   ' });
    const response = await agent.post('/signup').send(body);
    expect(response.status).toEqual(statusCode.BAD_REQUEST);
  });

  it('returns 400 for invalid password', async () => {
    const body = generateSignupBody({ password: '   ', repeatPassword: '   ' });
    const response = await agent.post('/signup').send(body);
    expect(response.status).toEqual(statusCode.BAD_REQUEST);
  });

  it('returns 400 for password with less than 6 digits', async () => {
    const body = generateSignupBody({ password: '12345', repeatPassword: '12345' });
    const response = await agent.post('/signup').send(body);
    expect(response.status).toEqual(statusCode.BAD_REQUEST);
  });

  it('returns 400 for different password and repeatPassword fields', async () => {
    const body = generateSignupBody({ password: '123456', repeatPassword: '654321' });
    const response = await agent.post('/signup').send(body);
    expect(response.status).toEqual(statusCode.BAD_REQUEST);
  });

  it('returns 409 for email already used', async () => {
    const body = generateSignupBody({ password: '123456', repeatPassword: '654321' });
    const response = await agent.post('/signup').send(body);
    expect(response.status).toEqual(statusCode.BAD_REQUEST);
  });
});
