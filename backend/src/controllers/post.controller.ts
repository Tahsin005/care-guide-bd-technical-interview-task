import { Request, Response } from 'express';
import { PostService, postService } from '../services/post.service';
import { sendSuccess } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';
import { AppError } from '../utils/app-error';

export class PostController {
  constructor(private readonly service: PostService = postService) {}

  public createPost = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      if (!req.user) {
        throw AppError.unauthorized('Authentication required');
      }

      const post = await this.service.createPost(req.user.userId, req.body);
      sendSuccess(res, post, 'Post created successfully', 201);
    }
  );

  public listPosts = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await this.service.listPosts(req.query);
      sendSuccess(
        res,
        result.posts,
        'Posts retrieved successfully',
        200,
        result.pagination
      );
    }
  );
}

export const postController = new PostController();
