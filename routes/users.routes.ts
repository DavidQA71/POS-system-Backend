import { Router } from 'express';
import { login, getUserRole, registerUser } from '../controllers/users.controller';
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();
// @ts-ignore
router.post('/login', login);
router.get('/auth', authenticateToken, getUserRole);
router.post('/register', registerUser as any);

export default router;
