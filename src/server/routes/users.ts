import { Router } from 'express';
import { services } from '../db';

export const usersRouter = Router();

usersRouter.post('/', async (req, res, next) => {
	try {
		const result = await services.users.register();
		res.json(result);
	} catch (error) {
		next(error);
	}
});
