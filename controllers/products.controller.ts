import { Request, Response } from 'express';
import { getProductByCode, getProductByDescription, insertTempSalesItem } from '../models/products.model';

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

 const addTempSalesItem = async (req: Request, res: Response) => {
  try {
    const { product_id, quantity, unit_price } = req.body;

    if (!product_id || !quantity || !unit_price) {
      return res.status(500).json({ 
        statusCode: 500, 
        statusMessage: "Producto no agregado" 
      });
    }

    if (quantity <= 0) {
      return res.status(403).json({ 
        statusCode: 403, 
        statusMessage: "No es posible agregar esa cantidad" 
      });
    }

    // Insertar en la tabla temporal
    const result: any = await insertTempSalesItem({ product_id, quantity, unit_price });

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

export { getProductsByCode, getProductsByDescription, addTempSalesItem };
