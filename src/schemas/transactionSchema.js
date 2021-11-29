import Joi from 'joi';

export const transactionSchema = Joi.object().keys({
  value: Joi.number().min(0.01).max(9999999.99).required(),
  type: Joi.string().valid('INC', 'OUT').required(),
});
