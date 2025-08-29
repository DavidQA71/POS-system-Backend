import express from 'express';
import { addTempSalesItem, getProductsByCode, getProductsByDescription } from '../controllers/products.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();
// @ts-ignore
//obtener productos por código
router.get('/:code', authenticateToken, getProductsByCode);
//obtener productos por string
router.get('/', authenticateToken, getProductsByDescription);
//agregar producto a tabla temporaria
router.post('/temp-sales-items', authenticateToken, addTempSalesItem);

export default router;