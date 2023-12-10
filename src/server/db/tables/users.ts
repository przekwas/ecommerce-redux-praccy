import { Table } from "../tableCrud";
import type { IGenericRow } from "../tableCrud";

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
    register() {
        console.log('register')
    }
}