import express from 'express';
import { 
  insertTempProducts, 
  getTempProducts, 
  updateTempProducts,
  deleteTempProducts,
  getAllTempProducts
} from '../controllers/temp-products.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();
// @ts-ignore
//obtener todos los productos de la tabla temporaria
router.get('/', authenticateToken, getAllTempProducts);
//agregar producto a tabla temporaria
router.post('/temp-sales', authenticateToken, insertTempProducts);
//obtener producto de la tabla temporaria para luego editar
router.get('/temp-sales/:code', authenticateToken, getTempProducts);
//editar producto de la tabla temporaria
router.patch('/temp-sales/:code', authenticateToken, updateTempProducts);
//eliminar producto de la tabla temporaria
router.delete('/temp-sales/:code', authenticateToken, deleteTempProducts);

export default router;