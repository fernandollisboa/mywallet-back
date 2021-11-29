import statusCode from '../enum/statusCode.js';
import * as userService from '../services/userService.js';
import { loginSchema, signUpSchema } from '../schemas/userSchema.js';

export async function postSignUp(req, res) {
  const joiValidation = signUpSchema.validate(req.body);
  if (joiValidation.error) {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const { name, email, password } = req.body;

  if (!name.trim() || !email.trim() || !password.trim()) {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  try {
    if (await userService.findUserByEmail({ email })) return res.sendStatus(statusCode.CONFLICT);

    const user = userService.createUser({ name, email, password });
    if (!user) return res.sendStatus(statusCode.INTERNAL_SERVER_ERROR);

    return res.sendStatus(statusCode.CREATED);
  } catch (err) {
    console.log(err.stack);
    return res.sendStatus(statusCode.INTERNAL_SERVER_ERROR);
  }
}

export async function postLogin(req, res) {
  const joiValidation = loginSchema.validate(req.body);
  if (joiValidation.error) return res.sendStatus(statusCode.BAD_REQUEST);

  const { email, password } = req.body;
  if (!email.trim() || !password.trim()) return res.sendStatus(statusCode.BAD_REQUEST);

  try {
    const sessionToken = await userService.authenticateUser({ email, password });
    if (!sessionToken) return res.sendStatus(statusCode.UNAUTHORIZED);

    return res.send({ token: sessionToken }).status(statusCode.OK);
  } catch (err) {
    console.trace(err.stack);
    return res.sendStatus(statusCode.INTERNAL_SERVER_ERROR);
  }
}
