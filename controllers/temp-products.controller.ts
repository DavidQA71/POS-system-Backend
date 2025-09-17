import { Request, Response } from 'express';
import { 
  deleteTempItemByCode, 
  getTempItemByCode, 
  insertTemporaryProduct, 
  updateTemporaryQuantity,
  getAllTemporaryProducts 
} from '../models/temp-products.model';

const getAllTempProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllTemporaryProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      statusMessage: "Error al obtener productos temporales",
    });
  }
};

const insertTempProducts = async (req: Request, res: Response) => {
  try {
    const { productId, quantity, unitPrice } = req.body;

    if (!productId || !quantity || !unitPrice) {
      return res.status(500).json({ 
        statusCode: 500, 
        statusMessage: "Todos los campos son obligatorios" 
      });
    }

    if (quantity <= 0) {
      return res.status(403).json({ 
        statusCode: 403, 
        statusMessage: "No es posible agregar cantidad menores o iguales a cero" 
      });
    }

    // Insertar en la tabla temporal
    const result: any = await insertTemporaryProduct({ productId, quantity, unitPrice });

    if (result.affectedRows > 0) {
      return res.status(200).json({ 
        statusCode: 200, 
        statusMessage: "Producto agregado" 
      });
    } else {
      return res.status(500).json({ 
        statusCode: 500, 
        statusMessage: "Producto no agregado" 
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      statusCode: 500, 
      statusMessage: "Producto no agregado" 
    });
  }
};

const getTempProducts = async (req: Request, res: Response) => {
  try {
    const { code } = req.params; // Aquí 'code' es el ID del item temporal

    const item = await getTempItemByCode(Number(code));

    if (item) {
      return res.status(200).json({
        statusCode: 200,
        statusMessage: "Producto encontrado",
        product: {
          description: item.description,
          price: item.unitPrice,
          quantity: item.quantity
        }
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        statusMessage: "Producto no encontrado en la tabla"
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      statusMessage: "Error al buscar producto"
    });
  }
};

const updateTempProducts = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const { quantity } = req.body;

    if (!quantity || isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({
        statusCode: 400,
        statusMessage: "Cantidad inválida",
      });
    }

    const updated = await updateTemporaryQuantity(Number(code), quantity);

    if (!updated) {
      return res.status(500).json({
        statusCode: 500,
        statusMessage: "Producto no actualizado",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      statusMessage: "Producto temporal actualizado",
    });
  } catch (error) {
    console.error("Error al actualizar producto temporal:", error);
    return res.status(500).json({
      statusCode: 500,
      statusMessage: "Producto no actualizado",
    });
  }
};

  const deleteTempProducts = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

    const deleted = await deleteTempItemByCode(Number(code));

    if (!deleted) {
      return res.status(404).json({
        statusCode: 404,
        statusMessage: "Producto no encontrado o no eliminado",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      statusMessage: "Producto temporal eliminado",
    });
  } catch (error) {
    console.error("Error al eliminar producto temporal:", error);
    return res.status(500).json({
      statusCode: 500,
      statusMessage: "Error producto no eliminado",
    });
  }
};

export { 
  getAllTempProducts,
  insertTempProducts, 
  getTempProducts, 
  updateTempProducts, 
  deleteTempProducts 
};