import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.config';
import { UserRole } from '../models/user.model';

export interface TokenPayload {
  userId: string;
  role: UserRole;
  email: string;
}

export const generateToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as any,
  };
  return jwt.sign(payload, env.JWT_SECRET, options);
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};
