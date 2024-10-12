import pool from './db.js';

class BaseRepository {
	async getAll(table, columnsArray) {
		try {
			const results = (
				await pool.query(`SELECT ${columnsArray.join()} FROM ${table}`)
			).rows;
			return results;
		} catch (error) {
			throw error;
		}
	}

	async getById(table, columnsArray, id) {
		try {
			const queryText = `SELECT ${columnsArray.join()} FROM ${table} WHERE id = $1`;
			const result = (await pool.query(queryText, [id])).rows[0];
			return result;
		} catch (error) {
			throw error;
		}
	}

	async insertOne(table, columnsArray, valuesArray) {
		const client = await pool.connect();
		try {
			let flagsArray = Array.from(
				new Array(columnsArray.length).keys()
			).map((el) => `$${el + 1}`);
			const queryText = `INSERT INTO ${table} (${columnsArray.join()}) VALUES (${flagsArray.join()})`;
			await client.query('BEGIN TRANSACTION');
			await client.query(queryText, valuesArray);
			await client.query('COMMIT');
		} catch (error) {
			await client.query('ROLLBACK');
			throw error;
		} finally {
			client.release();
		}
	}
}

export default BaseRepository;
