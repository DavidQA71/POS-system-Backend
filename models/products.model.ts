import { db } from '../config/db';

interface Product {
	code: number;
	description: string;
	price: number;
	stock: number;
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
        console.error(error);
        throw new Error('Error al consultar el producto');
    }
};

export { getProductByCode };