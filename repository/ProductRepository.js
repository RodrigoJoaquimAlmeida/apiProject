import BaseRepository from './BaseRepository.js';
import pool from './db.js';

class ProductRepository extends BaseRepository {
	async getAll() {
		try {
			const results = await super.getAll('product', [
				'id',
				'name',
				'price_in_cents',
				'size',
			]);
			return results;
		} catch (error) {
			throw error;
		}
	}

	async getById(id) {
		try {
			const result = await super.getById(
				'product',
				['id', 'name', 'price_in_cents', 'size'],
				id
			);
			return result;
		} catch (error) {
			throw error;
		}
	}
}

export default ProductRepository;
