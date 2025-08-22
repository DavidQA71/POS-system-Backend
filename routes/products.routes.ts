import express from 'express';
import { getProductsByCode, getProductsByDescription } from '../controllers/products.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();
// @ts-ignore
router.get('/:code', authenticateToken, getProductsByCode);
router.get('/', authenticateToken, getProductsByDescription)


export default router;