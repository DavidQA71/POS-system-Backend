import { Request, Response } from 'express';
import { getProductByCode } from '../models/products.model';

const getOneProduct = async (req: Request, res: Response) => {
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


export { getOneProduct };
