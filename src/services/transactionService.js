import * as transactionRepository from '../repositories/transactionRepository.js';

export async function createTransaction({ userId, transaction: { type, value } }) {
  if (type === 'INC' && type === 'OUT') return null;
  if (value < 0.01) return null;

  const createdTransaction = await transactionRepository.insert({
    userId,
    transaction: { type, value },
  });

  return createdTransaction;
}

export async function getUserTransactions({ userId }) {
  return transactionRepository.selectAllByUserId({ userId });
}

export async function getUserBalance({ userId }) {
  const userTransactions = await transactionRepository.selectAllByUserId({ userId });

  const valuesArray = userTransactions.map((t) => (t.type === 'INC' ? t.value : t.value * -1));

  const sum = valuesArray.map((v) => Number(v)).reduce((total, curr) => total + curr);

  return sum;
}
