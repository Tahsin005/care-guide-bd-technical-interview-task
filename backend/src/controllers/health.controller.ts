import { Request, Response } from 'express';
import { HealthService, healthService } from '../services/health.service';
import { sendSuccess } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';

export class HealthController {
  constructor(private readonly service: HealthService = healthService) {}

  public checkHealth = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const healthData = await this.service.getHealthStatus();
    sendSuccess(res, healthData, 'System is healthy and database is reachable', 200);
  });

  public checkLiveness = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const livenessData = this.service.getLiveness();
    sendSuccess(res, livenessData, 'Application is running', 200);
  });
}

export const healthController = new HealthController();
