import statusCode from '../enum/statusCode.js';
import * as transactionService from '../services/transactionService.js';
import { transactionSchema } from '../schemas/transactionSchema.js';

export async function postTransaction(req, res) {
  const { value, type } = req.body;

  const joiValidation = transactionSchema.validate({ value, type });
  if (joiValidation.error) {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  if (!value || !type) return res.sendStatus(statusCode.BAD_REQUEST);

  const { userId } = req.body;

  try {
    const createdTransaction = await transactionService.createTransaction({
      userId,
      transaction: { value, type },
    });

    if (!createdTransaction) return res.sendStatus(statusCode.BAD_REQUEST);

    return res.sendStatus(statusCode.CREATED);
  } catch (err) {
    return res.sendStatus(statusCode.INTERNAL_SERVER_ERROR);
  }
}

export async function getUserTransactions(req, res) {
  const { userId } = req.body;

  try {
    const fetchedTransactions = await transactionService.getUserTransactions({ userId });
    if (!fetchedTransactions) return res.sendStatus(statusCode.BAD_REQUEST);

    return res.send(fetchedTransactions).status(statusCode.OK);
  } catch (err) {
    return res.sendStatus(statusCode.INTERNAL_SERVER_ERROR);
  }
}

export async function getUserBalance(req, res) {
  const { userId } = req.body;

  try {
    const userBalance = await transactionService.getUserBalance({ userId });
    if (!userBalance) return res.sendStatus(statusCode.BAD_REQUEST);

    return res.status(statusCode.OK).send({ userBalance });
  } catch (err) {
    return res.sendStatus(statusCode.INTERNAL_SERVER_ERROR);
  }
}
