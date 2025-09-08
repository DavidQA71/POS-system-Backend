import { Request, Response } from 'express';
import { deleteTempItemByCode, getProductByCode, getProductByDescription, getTempItemByCode, insertTempSalesItem, updateTempItemQuantity } from '../models/products.model';

const getProductsByCode = async (req: Request, res: Response) => {
    const code = Number(req.params.code);
    try {
        const product = await getProductByCode(code);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ 
            message: 'Error interno del servidor' });
    }
}

const getProductsByDescription = async (req: Request, res: Response) => {
    const search = String(req.query.search || '');
    try {
        const product = await getProductByDescription(search);

        if (!product.length) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ 
            message: 'Error interno del servidor' });
    }
}

const insertTempProducts = async (req: Request, res: Response) => {
  try {
    const { product_id: productId, quantity, unit_price: unitPrice } = req.body;


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
    const result: any = await insertTempSalesItem({ productId, quantity, unitPrice });

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

const updateTempSalesItem = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const { quantity } = req.body;

    if (!quantity || isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({
        statusCode: 400,
        statusMessage: "Cantidad inválida",
      });
    }

    const updated = await updateTempItemQuantity(Number(code), quantity);

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

  const deleteTempSalesItem = async (req: Request, res: Response) => {
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
  getProductsByCode, 
  getProductsByDescription, 
  insertTempProducts, 
  getTempProducts, 
  updateTempSalesItem, 
  deleteTempSalesItem 
};
