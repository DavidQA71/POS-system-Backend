import { Request, Response } from 'express';
import {  
  getProductByCode, 
  getProductByDescription,
  getStock
} from '../models/products.model';

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


const getStockProducts = async (req: Request, res: Response) => {
	const { page, size, description, price } = req.query;

	try {
    const params = {
			page: Number(page || 1),
			size: Number(size || 10),
			description: description as string,
			price: price ? Number(price) : undefined
		};

		const products = await getStock(params);
		if (products.values.length === 0) {
			return res.status(404).json({ message: 'No hay productos disponibles' });
		}
		return res.status(200).json(products);
	} catch (error) {
		return res.status(500).json({
			message: 'Error del servidor: no se pudo acceder a la base de datos',
		});
	}
};

export { 
  getProductsByCode, 
  getProductsByDescription,
  getStockProducts
};
