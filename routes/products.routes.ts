import express from 'express';
import { getOneProduct } from '../controllers/products.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();
// @ts-ignore
router.get('/:code', authenticateToken, getOneProduct);


export default router;