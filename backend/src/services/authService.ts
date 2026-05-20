import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { logger } from '../config/logger.js';
import { JwtPayload } from '../types/index.js';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export class AuthService {
  async register(email: string, name: string, password: string) {
    try {
      // Verifica se usuário já existe
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error('Usuário já existe');
      }

      // Hash de senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria usuário
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: 'OPERATOR',
        },
      });

      logger.info(`Novo usuário criado: ${email}`);

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    } catch (error) {
      logger.error('Register error:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      // Busca usuário
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.active) {
        throw new Error('Usuário não encontrado ou inativo');
      }

      // Verifica senha
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Senha incorreta');
      }

      // Gera token JWT
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        } as JwtPayload,
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      logger.info(`Login bem-sucedido: ${email}`);

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  async refreshToken(userId: string) {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        } as JwtPayload,
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return { token };
    } catch (error) {
      logger.error('Refresh token error:', error);
      throw error;
    }
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Verifica senha antiga
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
        throw new Error('Senha atual incorreta');
      }

      // Hash nova senha
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Atualiza senha
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      logger.info(`Senha alterada: ${user.email}`);

      return { message: 'Senha alterada com sucesso' };
    } catch (error) {
      logger.error('Change password error:', error);
      throw error;
    }
  }
}
