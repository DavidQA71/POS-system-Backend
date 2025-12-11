import express from 'express';
import { 
  getProductsByCode, 
  getProductsByDescription,
  getStockProducts,
} from '../controllers/products.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();
// @ts-ignore
//obtener stock de productos con paginación y filtros
router.get('/stock', authenticateToken, getStockProducts);
//obtener productos por código
router.get('/by-code/:code', authenticateToken, getProductsByCode);
//obtener productos por string
router.get('/by-name/:text', authenticateToken, getProductsByDescription);
//tengo que cambiar el controller para que busque por query en vez de params


export default router;


//me falta el get de temp como el segundo get, que es para traer todos los productos de la tabla temporaria

//y el get de temp/:code que es para traer un producto en particular de la tabla temporaria

