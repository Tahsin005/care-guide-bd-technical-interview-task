import { Request, Response } from 'express';
import {
  AggregationService,
  aggregationService,
} from '../services/aggregation.service';
import { sendSuccess } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';

export class AggregationController {
  constructor(
    private readonly service: AggregationService = aggregationService
  ) {}

  public getUsersGroupedByInterests = asyncHandler(
    async (_req: Request, res: Response): Promise<void> => {
      const results = await this.service.getUsersGroupedByInterests();
      sendSuccess(
        res,
        results,
        'Users grouped by interests retrieved successfully',
        200
      );
    }
  );

  public getUserPosts = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await this.service.getUserPosts(
        req.params.userId as string
      );
      sendSuccess(
        res,
        result,
        'User posts retrieved successfully via $lookup aggregation',
        200
      );
    }
  );
}

export const aggregationController = new AggregationController();
