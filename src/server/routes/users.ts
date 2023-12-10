import { Router } from 'express';
import { services } from '../db';

export const usersRouter = Router();

usersRouter.post('/register', async (req, res, next) => {
	try {
		const newUser = { ...req.body };
		const token = await services.users.register(newUser);
		res.status(201).json({ message: 'register successful', token });
	} catch (error) {
		next(error);
	}
});

usersRouter.post('/login', async (req, res, next) => {
	try {
		const userDTO = req.body;
		const token = await services.users.login(userDTO);
		res.json({ msg: 'login successful', token });
	} catch (error) {
		next(error);
	}
});

