import { Post, IPost, IPostDocument } from '../models/post.model';

export interface IPostRepository {
  create(postData: Partial<IPost>): Promise<IPostDocument>;
  findPaginated(
    filter: Record<string, any>,
    skip: number,
    limit: number
  ): Promise<IPostDocument[]>;
  count(filter: Record<string, any>): Promise<number>;
  findById(id: string): Promise<IPostDocument | null>;
}

export class PostRepository implements IPostRepository {
  public async create(postData: Partial<IPost>): Promise<IPostDocument> {
    return Post.create(postData);
  }

  public async findPaginated(
    filter: Record<string, any>,
    skip: number,
    limit: number
  ): Promise<IPostDocument[]> {
    return Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name email')
      .exec();
  }

  public async count(filter: Record<string, any>): Promise<number> {
    return Post.countDocuments(filter).exec();
  }

  public async findById(id: string): Promise<IPostDocument | null> {
    return Post.findById(id).populate('author', 'name email').exec();
  }
}

export const postRepository = new PostRepository();
