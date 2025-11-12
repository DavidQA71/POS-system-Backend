import { db } from '../config/db';

interface Product {
	code: number;
	description: string;
	price: number;
	stock: number;
}

interface ProductResponse {
  pages: number;
  totalElements: number;
  values: Product[];
}

const getProductByCode = async (code: number) => {
    try {
        const [rows] = await db.execute(
            'SELECT id, description, price, stock FROM products WHERE id = ?',
            [code]
        );
        const products = rows as Product[];
        return products.length ? products[0] : null;
    } catch (error) {
        throw new Error('Error al consultar el producto');
    }
};

const getProductByDescription = async (description: string) => {
    try {
        const [rows] = await db.execute(
            'SELECT id, description, price, stock FROM products WHERE description LIKE ?',
            [`%${description}%`]
        );
        const products = rows as Product[];
        return products;
    } catch (error) {
        throw new Error('Error al consultar el producto');
    }
};


const getStock = async (
	page: number,
	size: number,
	description?: string,
	price?: number
): Promise<ProductResponse> => {
	const limit = size;
	const to = (page - 1) * size;
	const whereClauses: string[] = [];
	const values: any[] = [];

	if (description) {
		whereClauses.push(`description LIKE ?`);
		values.push(`%${description}%`);
	}

	if (price !== undefined) {
		whereClauses.push(`price = ?`);
		values.push(price);
	}

	const whereClause =
		whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

	values.push(to, limit);

	const query = `SELECT * FROM products ${whereClause} LIMIT ?, ?`;

	const queryCount = `SELECT COUNT(*) as total FROM products ${whereClause}`;

	const [rows] = await db.execute(query, values);
	const [countResult]: any = await db.execute(queryCount, values.slice(0, -2));
	const products = rows as Product[];
	const totalElements = Number(countResult[0].total || 0);
	const totalPages = Math.ceil(totalElements / size);

	return {
		pages: totalPages,
		totalElements,
		values: products,
	};
};

export { 
  getProductByCode, 
  getProductByDescription,
  getStock
};