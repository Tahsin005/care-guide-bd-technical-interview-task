import { Request, Response } from 'express';
import { AuthService, authService } from '../services/auth.service';
import { sendSuccess } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';
import { AppError } from '../utils/app-error';

import { generateToken } from '../utils/token';

export class AuthController {
  constructor(private readonly service: AuthService = authService) {}

  public register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await this.service.register(req.body);
    sendSuccess(res, result, 'User registered successfully', 201);
  });

  public login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await this.service.login(req.body);
    sendSuccess(res, result, 'Login successful', 200);
  });

  public getMe = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw AppError.unauthorized('Authentication required');
    }
    const user = await this.service.getProfile(req.user.userId);

    let token: string | undefined;
    if (user.role !== req.user.role) {
      token = generateToken({
        userId: user._id.toString(),
        role: user.role,
        email: user.email,
      });
    }

    const userData = user.toJSON ? user.toJSON() : user;
    sendSuccess(res, { ...userData, ...(token ? { token } : {}) }, 'Profile retrieved successfully', 200);
  });
}

export const authController = new AuthController();
