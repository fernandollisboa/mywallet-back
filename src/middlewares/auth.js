import jwt from 'jsonwebtoken';
import statusCode from '../enum/statusCode.js';
import * as sessionRepository from '../repositories/sessionRepository.js';

// eslint-disable-next-line consistent-return
export default async function auth(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.split('Bearer ')[1];

  if (!token) return res.sendStatus(statusCode.BAD_REQUEST);

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const session = await sessionRepository.selectByToken({ token });

    if (Number(session.customer_id) !== user.id) {
      return res.sendStatus(statusCode.UNAUTHORIZED);
    }

    req.body.userId = session.customer_id;
  } catch (err) {
    return res.sendStatus(statusCode.UNAUTHORIZED);
  }

  next();
}
