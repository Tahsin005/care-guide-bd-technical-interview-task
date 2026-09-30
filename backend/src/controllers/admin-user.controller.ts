import { Request, Response } from 'express';
import {
  AdminUserService,
  adminUserService,
} from '../services/admin-user.service';
import { sendSuccess } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';
import { AppError } from '../utils/app-error';

export class AdminUserController {
  constructor(private readonly service: AdminUserService = adminUserService) {}

  public listUsers = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await this.service.listUsers(req.query);
      sendSuccess(
        res,
        result.users,
        'Users retrieved successfully',
        200,
        result.pagination
      );
    }
  );

  public createUser = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await this.service.createUser(req.body);
      sendSuccess(res, user, 'User created successfully', 201);
    }
  );

  public getUserById = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await this.service.getUserById(req.params.id as string);
      sendSuccess(res, user, 'User retrieved successfully', 200);
    }
  );

  public updateUser = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const updated = await this.service.updateUser(
        req.params.id as string,
        req.body
      );
      sendSuccess(res, updated, 'User updated successfully', 200);
    }
  );

  public deleteUser = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      if (!req.user) {
        throw AppError.unauthorized('Authentication required');
      }

      await this.service.deleteUser(
        req.params.id as string,
        req.user.userId
      );
      sendSuccess(res, null, 'User deleted successfully', 200);
    }
  );
}

export const adminUserController = new AdminUserController();
