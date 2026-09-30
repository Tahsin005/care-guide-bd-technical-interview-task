import mongoose from 'mongoose';
import { env } from './env.config';

class Database {
  private isConnected = false;

  public async connect(): Promise<typeof mongoose> {
    if (this.isConnected && mongoose.connection.readyState === 1) {
      return mongoose;
    }

    if (!env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    try {
      const conn = await mongoose.connect(env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      });

      this.isConnected = true;
      const dbName = mongoose.connection.name || 'default';
      console.log(`[Database] Successfully connected to MongoDB via Mongoose: ${dbName}`);
      return conn;
    } catch (error) {
      this.isConnected = false;
      console.error('[Database] Failed to connect to MongoDB via Mongoose:', error);
      throw error;
    }
  }

  public getConnection(): typeof mongoose.connection {
    return mongoose.connection;
  }

  public getConnectionStatus(): boolean {
    return mongoose.connection.readyState === 1;
  }

  public async disconnect(): Promise<void> {
    if (mongoose.connection.readyState !== 0) {
      try {
        await mongoose.disconnect();
        this.isConnected = false;
        console.log('[Database] Mongoose connection closed gracefully');
      } catch (error) {
        console.error('[Database] Error closing Mongoose connection:', error);
      }
    }
  }
}

export const database = new Database();
