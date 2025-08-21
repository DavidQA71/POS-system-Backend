import { Router } from 'express';
import { login, getUserRole } from '../controllers/users.controller';
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();
// @ts-ignore
router.post('/login', login);
router.get('/auth', authenticateToken, getUserRole);

export default router;
