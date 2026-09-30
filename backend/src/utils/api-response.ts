import { Response } from 'express';

export interface ApiResponseOptions<T = any> {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: Record<string, any>;
}

export interface ApiErrorOptions {
  res: Response;
  statusCode?: number;
  message?: string;
  errors?: any;
  stack?: string;
}

export const sendSuccess = <T>(
  res: Response,
  data?: T,
  message = 'Operation successful',
  statusCode = 200,
  meta?: Record<string, any>
): Response => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    ...(data !== undefined && { data }),
    ...(meta !== undefined && { meta }),
    timestamp: new Date().toISOString(),
  });
};

export const sendError = (
  res: Response,
  message = 'Internal server error',
  statusCode = 500,
  errors: any = null,
  stack?: string
): Response => {
  const responsePayload: Record<string, any> = {
    success: false,
    statusCode,
    message,
    errors: errors ?? null,
    timestamp: new Date().toISOString(),
  };

  if (stack) {
    responsePayload.stack = stack;
  }

  return res.status(statusCode).json(responsePayload);
};
