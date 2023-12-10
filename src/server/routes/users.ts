import { Router } from 'express';
import { services } from '../db';

export const usersRouter = Router();

usersRouter.post('/', async (req, res, next) => {
	try {
		const newUser = { ...req.body };
		const result = await services.users.register(newUser);
		res.json(result);
	} catch (error) {
		next(error);
	}
});
