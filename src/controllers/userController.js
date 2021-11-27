import statusCode from '../enum/statusCode.js';
import * as userService from '../services/userService.js';

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) return res.sendStatus(statusCode.BAD_REQUEST);

  if (await userService.findUserByEmail({ email })) return res.sendStatus(statusCode.CONFLICT);

  try {
    const user = userService.createUser({ name, email, password });

    if (!user) return res.sendStatus(statusCode.INTERNAL_SERVER_ERROR);

    return res.sendStatus(statusCode.CREATED);
  } catch (err) {
    console.log(err.stack);
    return res.sendStatus(statusCode.INTERNAL_SERVER_ERROR);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(statusCode.BAD_REQUEST);

  try {
    const sessionToken = await userService.authenticateUser({ email, password });
    if (!sessionToken) return res.sendStatus(statusCode.UNAUTHORIZED);

    return res.send({ token: sessionToken }).status(statusCode.OK);
  } catch (err) {
    console.trace(err.stack);
    return res.sendStatus(statusCode.INTERNAL_SERVER_ERROR);
  }
}
