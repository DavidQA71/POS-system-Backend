import express from 'express';

import { insertSale, listSales } from '../controllers/sales.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

// @ts-ignore
// Registrar una venta
router.post('/', authenticateToken , insertSale);
router.get('/', authenticateToken , listSales);

export default router;
