import { Table } from '../tableCrud';
import { hashPassword } from '../../utils/bcrypt';
import type { IGenericRow } from '../tableCrud';

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
		return newUser;
	}
};
