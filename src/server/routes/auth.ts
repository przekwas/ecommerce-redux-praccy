import { Router } from 'express';
import { services } from '../db';
import { APIError } from '../utils/apiError';

export const authRouter = Router();

authRouter.post('/verify', async (req, res, next) => {
	try {
		const value = req.headers['authorization'];
		let token = null;

		if (!value) {
			throw new APIError('no token provided', 401);
		}

		const bearerToken = value.split(' ');
		if (bearerToken[0] === 'Bearer') {
			token = bearerToken[1];
		}

		const isValid = await services.auth.verifyToken(token as string);
		res.json({ isValid });
	} catch (error) {
		next(error);
	}
});
