import { SelectQuery, ModifyQuery } from './queryUtils';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface IGenericRow extends RowDataPacket {}
interface QueryOptions {
	columns?: string;
	extraQuery?: string;
}

export class Table<T extends IGenericRow> {
	private tableName: string;

	constructor(tableName: string) {
		this.tableName = tableName;
	}

	public getAll(options: QueryOptions = {}): Promise<T[]> {
		const { columns = '*', extraQuery = '' } = options;
		const query = `
            SELECT ${columns} FROM ${this.tableName}
            ${extraQuery}
        `;
		return SelectQuery(query);
	}

	public getOne(id: number, options: QueryOptions = {}): Promise<T[]> {
		const { columns = '*', extraQuery = '' } = options;
		const query = `
            SELECT ${columns} FROM ${this.tableName}
            ${extraQuery}
            WHERE ${this.tableName}.id = ?
        `;
		return SelectQuery(query, [id]);
	}

	public find(column: string, value: any): Promise<T[]> {
		const query = `SELECT * FROM ${this.tableName} WHERE ?? = ?`;
		return SelectQuery(query, [column, value]);
	}

	public insert(newRow: Partial<T>): Promise<ResultSetHeader> {
		const query = `INSERT INTO ${this.tableName} SET ?`;
		return ModifyQuery(query, [newRow]);
	}

	public update(updatedRow: Partial<T>, id: number): Promise<ResultSetHeader> {
		const query = `UPDATE ${this.tableName} SET ? WHERE id = ?`;
		return ModifyQuery(query, [updatedRow, id]);
	}

	public destroy(id: number): Promise<ResultSetHeader> {
		const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
		return ModifyQuery(query, [id]);
	}

	public customQuery(queryString: string, params?: any): Promise<any> {
		return SelectQuery(queryString, params);
	}
}
