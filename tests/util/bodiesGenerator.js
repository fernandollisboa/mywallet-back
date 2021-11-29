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

export function generateTransactionBody({ value, type } = {}) {
  return {
    value: value || faker.finance.amount(0.01, 9999999, 2),
    type: type || faker.random.arrayElement(['INC', 'OUT']),
    description: faker.lorem.sentence(),
  };
}
