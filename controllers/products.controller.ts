import { Request, Response } from 'express';
import { getProductByCode, getProductByDescription } from '../models/products.model';

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


export { getProductsByCode, getProductsByDescription };
