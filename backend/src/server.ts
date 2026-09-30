import { Server } from 'http';
import { createApp } from './app';
import { env, validateEnv } from './config/env.config';
import { database } from './config/database';

let server: Server;

async function bootstrap(): Promise<void> {
  try {
    validateEnv();
    await database.connect();

    const app = createApp();

    server = app.listen(env.PORT, () => {
      console.log(`[Server] Application running in ${env.NODE_ENV} mode on port ${env.PORT}`);
      console.log(`[Server] Health check endpoint: http://localhost:${env.PORT}/health`);
      console.log(`[Server] API v1 Health check: http://localhost:${env.PORT}/api/v1/health`);
    });
  } catch (error) {
    console.error('[Server] Failed to start application:', error);
    process.exit(1);
  }
}

async function gracefulShutdown(signal: string): Promise<void> {
  console.log(`\n[Server] Received ${signal}. Starting graceful shutdown...`);

  if (server) {
    server.close(async () => {
      console.log('[Server] HTTP server closed');
      await database.disconnect();
      console.log('[Server] Process terminated safely');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('[Server] Force shutdown timeout exceeded');
      process.exit(1);
    }, 10000).unref();
  } else {
    await database.disconnect();
    process.exit(0);
  }
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason: any) => {
  console.error('[Unhandled Rejection]:', reason);
});

process.on('uncaughtException', (error: Error) => {
  console.error('[Uncaught Exception]:', error);
  gracefulShutdown('uncaughtException');
});

bootstrap();
