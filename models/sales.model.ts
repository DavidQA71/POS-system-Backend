import { db } from "../config/db";

export interface ISales {
  id: number;
  ticketNumber: number;
  userId: number;
  dateSale: Date;
  payMethodId: number;
}

export interface ITempSaleProduct {
  id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
}


// Obtener el próximo ticket_number (secuencial)
const getNextTicketNumber = async (): Promise<number> => {
  const [rows] = await db.execute(
    "SELECT MAX(ticket_number) AS lastTicket FROM sales"
  );
  const lastTicket = (rows as any)[0].lastTicket || 0;
  return lastTicket + 1;
};


// Crear una venta
const createSale = async (
  userId: number,
  payMethodId: number
): Promise<{ id: number; ticketNumber: number }> => {
  const newTicket = await getNextTicketNumber();

  const [result] = await db.execute(
    `INSERT INTO sales (ticket_number, user_id, date_sale, pay_method_id)
     VALUES (?, ?, NOW(), ?)`,
    [newTicket, userId, payMethodId]
  );

  return {
    id: (result as any).insertId,
    ticketNumber: newTicket,
  };
};


// Obtener items temporarios
const getTempProds = async (): Promise<ITempSaleProduct[]> => {
  const [rows] = await db.execute(
    `SELECT id, product_id, quantity, unit_price
     FROM temporary_sales_items`
  );

  return rows as ITempSaleProduct[];
};


// Insertar items de la venta definitiva
const createSaleItem = async (
  ticketNumber: number,
  item: ITempSaleProduct
): Promise<void> => {
  const { product_id, quantity, unit_price } = item;
console.log(`ticketnumber: ${ticketNumber} productId: ${product_id} quantity: ${quantity} unitPrice: ${unit_price}`);
  // Insertar item
  await db.execute(
    `INSERT INTO sale_items (product_id, ticket_number_id, quantity, unit_price)
    VALUES (?, ?, ?, ?)`,
    [product_id, ticketNumber, quantity, unit_price]
  );

  // Reducir stock del producto
  await db.execute(
    `UPDATE products SET stock = stock - ? WHERE id = ?`,
    [quantity, product_id]
  );
};

// ======================
// Vaciar la tabla temporaria de un usuario
// ======================
const clearTempProds = async (userId: number): Promise<void> => {
  await db.execute(
    `DELETE FROM temporary_sales_items WHERE user_id = ?`,
    [userId]
  );
};

// ======================
// Obtener todas las ventas
// ======================
const getAllSales = async (): Promise<ISales[]> => {
  const [rows] = await db.execute(
    `SELECT s.id, s.ticket_number, s.user_id, s.date_sale, s.pay_method_id
     FROM sales s
     ORDER BY s.date_sale DESC`
  );

  return rows as ISales[];
};

export {
  createSale,
  createSaleItem,
  getAllSales,
  getTempProds,
  clearTempProds,
};
