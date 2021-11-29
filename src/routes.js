import { Router } from 'express';
import cors from 'cors';
import * as userController from './controllers/userController.js';
import * as transactionController from './controllers/transactionController.js';
import auth from './middlewares/auth.js';

const routes = Router();

routes.all('*', cors());

routes.get('/health', (req, res) => res.send('Tudo massa meu rei').status(200));

routes.post('/sign-up', userController.postSignUp);
routes.post('/login', userController.postLogin);

routes.post('/transactions', auth, transactionController.postTransaction);
routes.get('/transactions', auth, transactionController.getUserTransactions);

export default routes;
