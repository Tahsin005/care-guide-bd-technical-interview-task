import os from 'os';
import { env } from '../config/env.config';
import { IHealthRepository, healthRepository } from '../repositories/health.repository';
import { AppError } from '../utils/app-error';

export interface SystemHealthData {
  status: 'healthy' | 'degraded' | 'unhealthy';
  server: {
    uptimeSeconds: number;
    timestamp: string;
    environment: string;
    nodeVersion: string;
    memoryUsageMB: {
      rss: number;
      heapTotal: number;
      heapUsed: number;
    };
    hostname: string;
  };
  database: {
    status: 'connected' | 'disconnected' | 'error';
    databaseName?: string;
    latencyMs?: number;
    error?: string;
  };
}

export class HealthService {
  constructor(private readonly repository: IHealthRepository = healthRepository) {}

  public async getHealthStatus(): Promise<SystemHealthData> {
    const memory = process.memoryUsage();
    const memoryMB = {
      rss: Math.round((memory.rss / 1024 / 1024) * 100) / 100,
      heapTotal: Math.round((memory.heapTotal / 1024 / 1024) * 100) / 100,
      heapUsed: Math.round((memory.heapUsed / 1024 / 1024) * 100) / 100,
    };

    let dbStatus: SystemHealthData['database'] = {
      status: 'disconnected',
    };

    try {
      if (!this.repository.isDatabaseConnected()) {
        throw new Error('Database is not connected');
      }

      const pingResult = await this.repository.pingDatabase();

      if (pingResult.ok) {
        dbStatus = {
          status: 'connected',
          databaseName: pingResult.databaseName,
          latencyMs: pingResult.latencyMs,
        };
      } else {
        throw new Error('Database ping command returned non-ok status');
      }
    } catch (error: any) {
      dbStatus = {
        status: 'error',
        error: error.message || 'Database connection error',
      };

      throw AppError.serviceUnavailable('Database health check failed', {
        serverUptime: Math.floor(process.uptime()),
        database: dbStatus,
      });
    }

    return {
      status: 'healthy',
      server: {
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        environment: env.NODE_ENV,
        nodeVersion: process.version,
        memoryUsageMB: memoryMB,
        hostname: os.hostname(),
      },
      database: dbStatus,
    };
  }

  public getLiveness(): { status: string; uptime: number } {
    return {
      status: 'alive',
      uptime: Math.floor(process.uptime()),
    };
  }
}

export const healthService = new HealthService();
