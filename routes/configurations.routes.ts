import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import getAllPayMethods from '../controllers/configurations.controller';

const router = express.Router();
// @ts-ignore
//consultar metodos de pago
router.get('/payment-methods', authenticateToken, getAllPayMethods);

export default router;
