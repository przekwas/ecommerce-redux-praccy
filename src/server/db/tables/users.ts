import { Table } from '../tableCrud';
import { hashPassword } from '../../utils/bcrypt';
import { generateToken } from '../../utils/jwt';
import type { IGenericRow } from '../tableCrud';

export interface IUserRow extends IGenericRow {
	id: number;
	username: string;
	email: string;
	password_hash: string;
	created_at: string;
	updated_at: string;
}

export const usersTable = new Table<IUserRow>('users');

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
	}
};
