import express from 'express';
import { 
  insertTempProducts, 
  getProductsByCode, 
  getProductsByDescription, 
  getTempProducts, 
  updateTempSalesItem,
  deleteTempSalesItem
} from '../controllers/products.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();
// @ts-ignore
//obtener productos por código
router.get('/:code', authenticateToken, getProductsByCode);
//obtener productos por string
router.get('/', authenticateToken, getProductsByDescription);
//agregar producto a tabla temporaria
router.post('/temp-sales-items', authenticateToken, insertTempProducts);
//obtener producto de la tabla temporaria para luego editar
router.get('/temp-sales-items/:code', authenticateToken, getTempProducts);
//editar producto de la tabla temporaria
router.patch('/temp-sales-items/:code', authenticateToken, updateTempSalesItem);
//eliminar producto de la tabla temporaria
router.delete('/temp-sales-items/:code', authenticateToken, deleteTempSalesItem);

export default router;