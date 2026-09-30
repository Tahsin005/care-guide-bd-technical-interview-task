import { Types } from 'mongoose';
import { IPostRepository, postRepository } from '../repositories/post.repository';
import { IPostDocument } from '../models/post.model';
import { AppError } from '../utils/app-error';

export interface CreatePostDto {
  title: string;
  content: string;
}

export interface ListPostsQuery {
  page?: string | number;
  limit?: string | number;
}

export interface PaginatedPostsResult {
  posts: IPostDocument[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export class PostService {
  constructor(private readonly postRepo: IPostRepository = postRepository) {}

  public async createPost(
    userId: string,
    dto: CreatePostDto
  ): Promise<IPostDocument> {
    const { title, content } = dto;

    if (!title || !content) {
      throw AppError.badRequest('Title and content are required');
    }

    if (!title.trim()) {
      throw AppError.badRequest('Title cannot be empty');
    }

    if (!content.trim()) {
      throw AppError.badRequest('Content cannot be empty');
    }

    return this.postRepo.create({
      title: title.trim(),
      content: content.trim(),
      author: new Types.ObjectId(userId),
    });
  }

  public async listPosts(
    query: ListPostsQuery
  ): Promise<PaginatedPostsResult> {
    const page = Math.max(1, parseInt(String(query.page || '1'), 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(String(query.limit || '10'), 10) || 10)
    );
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};

    const [posts, total] = await Promise.all([
      this.postRepo.findPaginated(filter, skip, limit),
      this.postRepo.count(filter),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }
}

export const postService = new PostService();
