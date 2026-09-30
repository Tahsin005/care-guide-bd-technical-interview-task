import mongoose from 'mongoose';
import { database } from '../config/database';

export interface DatabasePingResult {
  ok: boolean;
  latencyMs: number;
  databaseName: string;
}

export interface IHealthRepository {
  pingDatabase(): Promise<DatabasePingResult>;
  isDatabaseConnected(): boolean;
}

export class HealthRepository implements IHealthRepository {
  public isDatabaseConnected(): boolean {
    return database.getConnectionStatus();
  }

  public async pingDatabase(): Promise<DatabasePingResult> {
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database instance is not available');
    }

    const startTime = Date.now();
    const pingResponse = await db.admin().ping();
    const latencyMs = Date.now() - startTime;

    return {
      ok: pingResponse.ok === 1,
      latencyMs,
      databaseName: mongoose.connection.name || 'default',
    };
  }
}

export const healthRepository = new HealthRepository();
