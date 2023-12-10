import { pool } from './pool';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

/**
 * Executes a SELECT query and returns the results.
 * @param {string} queryString - The SQL query string.
 * @param {any[]} params - The parameters for the SQL query.
 * @returns {Promise<T[]>} - A promise that resolves to an array of results.
 */
export async function SelectQuery<T extends RowDataPacket[]>(
	queryString: string,
	params?: any[]
): Promise<T> {
	try {
		const [result] = await pool.query<T>(queryString, params);
		return result;
	} catch (error) {
		throw error;
	}
}

/**
 * Executes a query that modifies the database (INSERT, UPDATE, DELETE) and returns the result.
 * @param {string} queryString - The SQL query string.
 * @param {any[]} params - The parameters for the SQL query.
 * @returns {Promise<ResultSetHeader>} - A promise that resolves to the result of the query.
 */
export async function ModifyQuery(queryString: string, params?: any[]): Promise<ResultSetHeader> {
	try {
		const [result] = await pool.query<ResultSetHeader>(queryString, params);
		return result;
	} catch (error) {
		throw error;
	}
}
