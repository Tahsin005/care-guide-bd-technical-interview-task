import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';
import { sendError } from '../utils/api-response';
import { env } from '../config/env.config';

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const message = `Route not found: ${req.method} ${req.originalUrl}`;
  next(AppError.notFound(message));
};

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || null;

  if (err instanceof SyntaxError && 'body' in err && (err as any).status === 400) {
    statusCode = 400;
    message = 'Malformed JSON syntax in request body';
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors || {}).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern || {})[0] || 'field';
    message = `Duplicate value entered for ${field}. It must be unique.`;
  }

  if (err.name === 'MongoServerSelectionError' || err.name === 'MongoNetworkTimeoutError') {
    statusCode = 503;
    message = 'Database service is currently unavailable';
  }

  if (err.name === 'BSONError') {
    statusCode = 400;
    message = 'Invalid ID or BSON format';
  }

  if (!err.isOperational && statusCode >= 500) {
    console.error('[Unhandled Error]:', err);
  }

  const stack = env.IS_DEVELOPMENT ? err.stack : undefined;

  sendError(res, message, statusCode, errors, stack);
};
