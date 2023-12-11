import { Router } from 'express';
import { services } from '../db';
import { APIError } from '../utils/apiError';

export const authRouter = Router();

authRouter.post('/verify', async (req, res, next) => {
	const token = req.cookies.token;
	try {
		if (token) {
			try {
				const isValid = await services.auth.verifyToken(token as string);
				res.json({ isValid });
			} catch (error) {
				throw new APIError('unauthorized', 401);
			}
		} else {
			throw new APIError('unauthorized', 401);
		}
	} catch (error) {
		next(error);
	}
});

authRouter.post('/login', async (req, res, next) => {
	try {
		const userDTO = req.body;
		const token = await services.auth.login(userDTO);
		res.cookie('token', token, {
			httpOnly: false,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
		});
		res.json({ msg: 'login successful', token });
	} catch (error) {
		next(error);
	}
});

authRouter.post('/logout', (req, res) => {
	res.clearCookie('token');
	res.json({ message: 'logout successful' });
});
