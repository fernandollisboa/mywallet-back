import { Router } from 'express';
import * as userController from './controllers/userController.js';

const routes = Router();

routes.get('/health', (req, res) => res.send('Tudo massa meu rei').status(200));

routes.post('/signup', userController.signUp);
routes.post('/login', userController.login);

export default routes;
