import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository.js';
import * as sessionRepository from '../repositories/sessionRepository.js';

export async function findUserByEmail({ email }) {
  return userRepository.selectByEmail({ email });
}

export async function createUser({ email, name, password }) {
  const hashPassword = bcrypt.hashSync(password, 10);
  return userRepository.insert({ email, name, hashPassword });
}

async function upsertSessionToken({ userId, token }) {
  const session = await sessionRepository.selectByUserId({ userId });

  let insertedSession;

  if (session) {
    insertedSession = await sessionRepository.update({ userId, token });
  } else {
    insertedSession = await sessionRepository.insert({ userId, token });
  }

  return insertedSession;
}

export async function authenticateUser({ email, password }) {
  const user = await userRepository.selectByEmail({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return null;
  }
  delete user.password;

  const jwToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  const session = await upsertSessionToken({ userId: user.id, token: jwToken });

  return session.token;
}
