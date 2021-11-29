import * as transactionRepository from '../repositories/transactionRepository.js';

export async function createTransaction({ userId, transaction: { type, value } }) {
  if (!['OUT', 'IN'].includes(type)) return null;
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
