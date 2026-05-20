import express from 'express';
import * as authController from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authMiddleware, authController.refreshToken);
router.post('/change-password', authMiddleware, authController.changePassword);

export default router;
