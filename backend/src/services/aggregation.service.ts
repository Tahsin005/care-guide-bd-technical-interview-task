import { Types, isValidObjectId } from 'mongoose';
import {
  IAggregationRepository,
  aggregationRepository,
  InterestGroupResult,
  UserPostsAggregationResult,
} from '../repositories/aggregation.repository';
import { AppError } from '../utils/app-error';

export class AggregationService {
  constructor(
    private readonly repo: IAggregationRepository = aggregationRepository
  ) {}

  public async getUsersGroupedByInterests(): Promise<InterestGroupResult[]> {
    return this.repo.groupByInterests();
  }

  public async getUserPosts(
    userId: string
  ): Promise<UserPostsAggregationResult> {
    if (!isValidObjectId(userId)) {
      throw AppError.badRequest('Invalid user ID');
    }

    const results = await this.repo.getUserPostsWithLookup(
      new Types.ObjectId(userId)
    );

    if (!results || results.length === 0) {
      throw AppError.notFound('User not found');
    }

    return results[0];
  }
}

export const aggregationService = new AggregationService();
