import Joi from 'joi';

export const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
});

export const signUpSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(6).required(),
    repeatPassword: Joi.ref('password'),
  })
  .with('password', 'repeatPassword');
