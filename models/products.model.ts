import { db } from '../config/db';

interface Product {
	code: number;
	description: string;
	price: number;
	stock: number;
}

interface TempSalesItem {
	product_id: number;
	quantity: number;
	unit_price: number;
  description: string;
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

const insertTempSalesItem = async (item: { 
  product_id: number; 
  quantity: number; 
  unit_price: number; 
}) => {
  const { product_id, quantity, unit_price } = item;
  try {
    const [result] = await db.execute(
      `INSERT INTO temporary_sales_items (product_id, quantity, unit_price) VALUES (?, ?, ?)`,
      [product_id, quantity, unit_price]
    );
    return result;
  } catch (error) {
    throw new Error('Error al insertar producto temporal');
  }
};

const getTempItemByCode = async (product_id: number) => {
    try {
        const [rows] = await db.execute(
            `SELECT t.quantity, t.unit_price, p.description
            FROM temporary_sales_items t
            JOIN products p ON t.product_id = p.id
            WHERE t.product_id = ?`,
            [product_id]
        );
        const items = rows as TempSalesItem[];
        return items.length ? items[0] : null;
    } catch (error) {
        throw new Error('Error al consultar el producto');
    }
};

export { 
  getProductByCode, 
  getProductByDescription, 
  insertTempSalesItem, 
  getTempItemByCode 
};