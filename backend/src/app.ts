import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { morganMiddleware } from './middlewares/morgan.middleware';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { sendSuccess } from './utils/api-response';
import apiRouter from './routes';
import healthRoutes from './routes/health.route';

export const createApp = (): Application => {
  const app: Application = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(morganMiddleware);

  app.get('/', (_req: Request, res: Response) => {
    sendSuccess(res, {
      name: 'API Service',
      version: '1.0.0',
      status: 'active',
      endpoints: {
        health: '/health',
        apiV1: '/api/v1',
        apiHealth: '/api/v1/health',
      },
    }, 'Welcome to the API Service');
  });

  app.use('/health', healthRoutes);
  app.use('/api/v1', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
