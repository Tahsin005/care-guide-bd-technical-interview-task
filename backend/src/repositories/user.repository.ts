import { User, IUser, IUserDocument } from '../models/user.model';

export interface IUserRepository {
  createUser(userData: Partial<IUser>): Promise<IUserDocument>;
  findByEmail(email: string, includePassword?: boolean): Promise<IUserDocument | null>;
  findById(id: string, includePassword?: boolean): Promise<IUserDocument | null>;
  existsByEmail(email: string): Promise<boolean>;
  findAll(filter: Record<string, any>, skip: number, limit: number): Promise<IUserDocument[]>;
  count(filter?: Record<string, any>): Promise<number>;
  updateById(id: string, updateData: Partial<IUser>): Promise<IUserDocument | null>;
  deleteById(id: string): Promise<IUserDocument | null>;
}

export class UserRepository implements IUserRepository {
  public async createUser(userData: Partial<IUser>): Promise<IUserDocument> {
    return User.create(userData);
  }

  public async findByEmail(
    email: string,
    includePassword = false
  ): Promise<IUserDocument | null> {
    const query = User.findOne({ email: email.toLowerCase().trim() });
    if (includePassword) {
      query.select('+password');
    }
    return query.exec();
  }

  public async findById(
    id: string,
    includePassword = false
  ): Promise<IUserDocument | null> {
    const query = User.findById(id);
    if (includePassword) {
      query.select('+password');
    }
    return query.exec();
  }

  public async existsByEmail(email: string): Promise<boolean> {
    const count = await User.countDocuments({ email: email.toLowerCase().trim() });
    return count > 0;
  }

  public async findAll(
    filter: Record<string, any> = {},
    skip = 0,
    limit = 10
  ): Promise<IUserDocument[]> {
    return User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  public async count(filter: Record<string, any> = {}): Promise<number> {
    return User.countDocuments(filter).exec();
  }

  public async updateById(
    id: string,
    updateData: Partial<IUser>
  ): Promise<IUserDocument | null> {
    return User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec();
  }

  public async deleteById(id: string): Promise<IUserDocument | null> {
    return User.findByIdAndDelete(id).exec();
  }
}

export const userRepository = new UserRepository();
