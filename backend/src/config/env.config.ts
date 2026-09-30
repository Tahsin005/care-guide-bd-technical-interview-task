import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI: string;
  IS_PRODUCTION: boolean;
  IS_DEVELOPMENT: boolean;
}

export const env: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  MONGO_URI: process.env.MONGO_URI || '',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV !== 'production',
};

export const validateEnv = (): void => {
  const missingVariables: string[] = [];

  if (!env.MONGO_URI) {
    missingVariables.push('MONGO_URI');
  }

  if (missingVariables.length > 0) {
    console.warn(
      `[Config] Warning: Missing environment variables: ${missingVariables.join(', ')}`
    );
  }
};
