import { Request, Response } from "express";
import {
  createSale,
  createSaleItem,
  getAllSales,
  getTempProds,
  clearTempProds,
} from "../models/sales.model";


// POST /sales → Facturar carrito
const insertSale = async (req: Request, res: Response) => {
  try {
    const { payMethodId } = req.body;
    const userId = (req as any).user.id; // viene del token

    if (!payMethodId) {
      return res.status(400).json({
        statusCode: 400,
        statusMessage: "Faltan datos para registrar la venta",
      });
    }

    // 1. Traer items temporarios
    const tempItems = await getTempProds();
    console.log(tempItems);

    if (tempItems.length === 0) {
      return res.status(400).json({
        statusCode: 400,
        statusMessage: "No hay productos en el carrito para facturar",
      });
    }

    // 2. Crear la venta definitiva
    const newSale = await createSale(userId, payMethodId);
    console.log("newsale:", JSON.stringify(newSale));

    // 3. Insertar cada item desde la tabla temporaria
    for (const item of tempItems) {
      console.log("item:", JSON.stringify(item));
      await createSaleItem(newSale.ticketNumber, item);
    }

    // 4. Vaciar la tabla temporaria
    await clearTempProds(userId);

    return res.status(200).json({
      statusCode: 200,
      statusMessage: "Venta registrada con éxito",
      ticketNumber: newSale.ticketNumber,
    });
  } catch (error) {
    console.error("Error en insertSale:", error);
    return res.status(500).json({
      statusCode: 500,
      statusMessage: "Error interno al registrar la venta",
    });
  }
};


// GET /sales → Listar ventas
const listSales = async (req: Request, res: Response) => {
  try {
    const sales = await getAllSales();
    return res.status(200).json(sales);
  } catch (error) {
    console.error("Error en listSales:", error);
    return res.status(500).json({
      statusCode: 500,
      statusMessage: "Error interno al obtener ventas",
    });
  }
};

export { insertSale, listSales };

