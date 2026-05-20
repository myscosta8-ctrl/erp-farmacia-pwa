import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.js';

export interface ApiError extends Error {
  status?: number;
  code?: string;
}

export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(status).json({
    error: message,
    code: err.code,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
