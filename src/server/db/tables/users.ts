import { Table } from '../tableCrud';
import { comparePassword, hashPassword } from '../../utils/bcrypt';
import { generateToken } from '../../utils/jwt';
import type { IGenericRow } from '../tableCrud';
import { APIError } from '../../utils/apiError';

interface IUserRow extends IGenericRow {
	id: number;
	username: string;
	email: string;
	password_hash: string;
	created_at: string;
	updated_at: string;
}

const usersTable = new Table<IUserRow>('users');

export const users = {
	async register(newUser: Partial<IUserRow>) {
		newUser.password_hash = await hashPassword(newUser.password);

		delete newUser.password;

		const { insertId } = await usersTable.insert(newUser);

		const jwt = generateToken({
			id: insertId,
			email: newUser.email,
			username: newUser.username,
			role: 'guest'
		});

		return jwt;
	},
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
	}
};