import { Types } from 'mongoose';
import { User } from '../models/user.model';

export interface InterestGroupResult {
  interest: string;
  userCount: number;
  users: Array<{
    _id: string;
    name: string;
    email: string;
    role: string;
  }>;
}

export interface UserPostsAggregationResult {
  _id: string;
  name: string;
  email: string;
  role: string;
  interests: string[];
  posts: Array<{
    _id: string;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
  totalPosts: number;
}

export interface IAggregationRepository {
  groupByInterests(): Promise<InterestGroupResult[]>;
  getUserPostsWithLookup(
    userId: Types.ObjectId
  ): Promise<UserPostsAggregationResult[]>;
}

export class AggregationRepository implements IAggregationRepository {
  public async groupByInterests(): Promise<InterestGroupResult[]> {
    return User.aggregate<InterestGroupResult>([
      { $unwind: '$interests' },
      {
        $group: {
          _id: '$interests',
          count: { $sum: 1 },
          users: {
            $push: {
              _id: '$_id',
              name: '$name',
              email: '$email',
              role: '$role',
            },
          },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          interest: '$_id',
          userCount: '$count',
          users: 1,
        },
      },
    ]).exec();
  }

  public async getUserPostsWithLookup(
    userId: Types.ObjectId
  ): Promise<UserPostsAggregationResult[]> {
    return User.aggregate<UserPostsAggregationResult>([
      { $match: { _id: userId } },
      {
        $lookup: {
          from: 'posts',
          let: { userId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$author', '$$userId'] } } },
            { $sort: { createdAt: -1 } },
          ],
          as: 'posts',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          role: 1,
          interests: 1,
          posts: 1,
          totalPosts: { $size: '$posts' },
        },
      },
    ]).exec();
  }
}

export const aggregationRepository = new AggregationRepository();
