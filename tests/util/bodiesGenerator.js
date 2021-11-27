// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

export function generateSignupBody({ name, email, password, repeatPassword } = {}) {
  return {
    name: name || faker.name.findName(),
    email: email || faker.internet.email(),
    password: password || 'password',
    repeatPassword: repeatPassword || 'password',
  };
}

export function generateLoginBody({ email, password } = {}) {
  return {
    email: email || faker.internet.email(),
    password: password || 'password',
  };
}
