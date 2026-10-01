import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../utils/token';
import { AppError } from '../utils/app-error';
import { UserRole } from '../models/user.model';
import { userRepository } from '../repositories/user.repository';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(AppError.unauthorized('Authentication token is missing'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return next(AppError.unauthorized('Authentication token has expired'));
    }
    return next(AppError.unauthorized('Invalid authentication token'));
  }
};

export const authorize = (...roles: UserRole[]) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      return next(AppError.unauthorized('Authentication required'));
    }

    if (roles.includes(req.user.role)) {
      return next();
    }

    // Fallback: Check DB if role was updated in DB while the user was logged in
    try {
      const dbUser = await userRepository.findById(req.user.userId);
      if (dbUser && roles.includes(dbUser.role)) {
        req.user.role = dbUser.role;
        return next();
      }
    } catch {
      // ignore db errors and proceed to forbidden
    }

    return next(
      AppError.forbidden('You do not have permission to perform this action')
    );
  };
};
