import { Request, Response } from 'express';
import { AuthService, authService } from '../services/auth.service';
import { sendSuccess } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';
import { AppError } from '../utils/app-error';

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
    sendSuccess(res, user, 'Profile retrieved successfully', 200);
  });
}

export const authController = new AuthController();
