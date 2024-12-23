import express from 'express';
import { checkAuth, login, logout } from '../controllers/authController';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, checkAuth);

export default router;
