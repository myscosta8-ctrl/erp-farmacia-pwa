import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';
import { loginSchema, registerSchema } from '../utils/validators.js';
import { logger } from '../config/logger.js';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await authService.register(value.email, value.name, value.password);
    res.status(201).json({ data: result });
  } catch (error: any) {
    logger.error('Register controller error:', error);
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await authService.login(value.email, value.password);
    res.json(result);
  } catch (error: any) {
    logger.error('Login controller error:', error);
    res.status(401).json({ error: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const result = await authService.refreshToken(req.user.userId);
    res.json(result);
  } catch (error: any) {
    logger.error('Refresh token controller error:', error);
    res.status(400).json({ error: error.message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const { oldPassword, newPassword } = req.body;
    const result = await authService.changePassword(req.user.userId, oldPassword, newPassword);
    res.json(result);
  } catch (error: any) {
    logger.error('Change password controller error:', error);
    res.status(400).json({ error: error.message });
  }
};
