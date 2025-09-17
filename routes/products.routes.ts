import express from 'express';
import { 
  getProductsByCode, 
  getProductsByDescription,
} from '../controllers/products.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();
// @ts-ignore
//obtener productos por código
router.get('/:code', authenticateToken, getProductsByCode);
//obtener productos por string
router.get('/', authenticateToken, getProductsByDescription);


export default router;


//me falta el get de temp como el segundo get, que es para traer todos los productos de la tabla temporaria

//y el get de temp/:code que es para traer un producto en particular de la tabla temporaria

