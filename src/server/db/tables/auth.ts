import { generateToken, verifyToken } from '../../utils/jwt';
import { comparePassword } from '../../utils/bcrypt';
import { APIError } from '../../utils/apiError';
import { usersTable } from './users';
import type { IUserRow } from './users';

export const auth = {
	async login(user: Partial<IUserRow>) {
		const [foundUser] = await usersTable.find('email', user.email);

		if (!foundUser || !(await comparePassword(user.password, foundUser.password_hash))) {
			throw new APIError('invalid credentials', 401);
		}

		const jwt = generateToken({
			id: foundUser.id,
			email: foundUser.email,
			username: foundUser.username,
			role: 'guest'
		});

		return jwt;
	},
	verifyToken(jwt: string) {
		const verified = verifyToken(jwt);
		return verified;
	}
};
