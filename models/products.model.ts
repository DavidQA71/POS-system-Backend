import { db } from '../config/db';

interface Product {
	code: number;
	description: string;
	price: number;
	stock: number;
}

interface TempSalesItem {
  id: number;
	productId: number;
	quantity: number;
	unitPrice: number;
  description: string;
}

interface Item {
  productId: number; 
  quantity: number; 
  unitPrice: number; 
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

const getAllTemporaryProducts = async () => {
  try {
    const [rows] = await db.execute(
      'SELECT t.id, p.description, t.quantity, t.unit_price FROM temporary_sales_items t JOIN products p ON t.product_id = p.id'
    );
    return rows as TempSalesItem[];
  } catch (error) {
    throw new Error('Error al consultar los productos temporales');
  }
};


const insertTempSalesItem = async ({
  productId, 
  quantity,
  unitPrice 
}: Item) => {
  try {
    const [result] = await db.execute(
      `INSERT INTO temporary_sales_items (product_id, quantity, unit_price) VALUES (?, ?, ?)`,
      [productId, quantity, unitPrice]
    );
    return result;
  } catch (error) {
    throw new Error('Error al insertar producto temporal');
  }
};

const getTempItemByCode = async (id: number) => {
    try {
        const [rows] = await db.execute(
            `SELECT p.description, t.unit_price, t.quantity
            FROM temporary_sales_items t
            JOIN products p ON t.product_id = p.id
            WHERE t.id = ?`,
            [id]
        );
        const items = rows as TempSalesItem[];
        return items.length ? items[0] : null;
    } catch (error) {
        throw new Error('Error al consultar el producto');
    }
};

const updateTempItemQuantity = async (id: number, quantity: number) => {
  try {
// Actualiza el item en la tabla temporary_sales_items
    await db.execute(
      "UPDATE temporary_sales_items SET quantity = ? WHERE id = ?",
      [quantity, id]
    );

    // Retornamos el item actualizado
    const [rows] = await db.execute(
      "SELECT p.description, t.unit_price, t.quantity FROM temporary_sales_items t JOIN products p ON t.product_id = p.id WHERE t.id = ?",
      [id]
    );
    const items = rows as TempSalesItem[];
    return items.length ? items[0] : null;
  } catch (error) {
  throw new Error('Error al editar el producto');
  }
};

const deleteTempItemByCode = async (id: number) => {
  try {
  const [rowsBefore] = await db.execute(
    'SELECT * FROM temporary_sales_items WHERE id = ?',
    [id]
  );

const itemsBefore = rowsBefore as TempSalesItem[];
  if (!itemsBefore.length) {
    // No existe, devolvemos null o lanzamos error
    return false;
  }

  // Ahora sí hacemos el DELETE
  await db.execute(
    'DELETE FROM temporary_sales_items WHERE id = ?',
    [id]
  );
    return true;
  } catch (error) {
    throw new Error('Error al eliminar el producto');
    }
};

export { 
  getAllTemporaryProducts,
  getProductByCode, 
  getProductByDescription, 
  insertTempSalesItem, 
  updateTempItemQuantity,
  getTempItemByCode,
  deleteTempItemByCode
};