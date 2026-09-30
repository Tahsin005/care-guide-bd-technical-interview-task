import { isValidObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUserRepository, userRepository } from '../repositories/user.repository';
import { IUserDocument, UserRole } from '../models/user.model';
import { AppError } from '../utils/app-error';

export interface CreateAdminUserDto {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  interests?: string[];
}

export interface UpdateAdminUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  interests?: string[];
}

export interface ListAdminUsersQuery {
  page?: string | number;
  limit?: string | number;
  role?: string;
}

export interface PaginatedUsersResult {
  users: IUserDocument[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export class AdminUserService {
  constructor(private readonly userRepo: IUserRepository = userRepository) {}

  public async listUsers(
    query: ListAdminUsersQuery
  ): Promise<PaginatedUsersResult> {
    const page = Math.max(1, parseInt(String(query.page || '1'), 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(String(query.limit || '10'), 10) || 10)
    );
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};
    if (query.role === 'user' || query.role === 'admin') {
      filter.role = query.role;
    }

    const [users, total] = await Promise.all([
      this.userRepo.findAll(filter, skip, limit),
      this.userRepo.count(filter),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      users,
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

  public async createUser(dto: CreateAdminUserDto): Promise<IUserDocument> {
    const { name, email, password, role, interests } = dto;

    if (!name || !email || !password) {
      throw AppError.badRequest('Name, email, and password are required');
    }

    if (password.length < 6) {
      throw AppError.badRequest('Password must be at least 6 characters long');
    }

    const emailNormalized = email.toLowerCase().trim();
    const emailExists = await this.userRepo.existsByEmail(emailNormalized);

    if (emailExists) {
      throw AppError.conflict('An account with this email already exists');
    }

    const assignedRole: UserRole = role === 'admin' ? 'admin' : 'user';

    return this.userRepo.createUser({
      name: name.trim(),
      email: emailNormalized,
      password,
      role: assignedRole,
      interests: Array.isArray(interests) ? interests : [],
    });
  }

  public async getUserById(id: string): Promise<IUserDocument> {
    if (!isValidObjectId(id)) {
      throw AppError.badRequest('Invalid user ID');
    }

    const user = await this.userRepo.findById(id);

    if (!user) {
      throw AppError.notFound('User not found');
    }

    return user;
  }

  public async updateUser(
    id: string,
    dto: UpdateAdminUserDto
  ): Promise<IUserDocument> {
    if (!isValidObjectId(id)) {
      throw AppError.badRequest('Invalid user ID');
    }

    const existingUser = await this.userRepo.findById(id);

    if (!existingUser) {
      throw AppError.notFound('User not found');
    }

    const updatePayload: Record<string, any> = {};

    if (dto.name !== undefined) {
      if (!dto.name.trim()) {
        throw AppError.badRequest('Name cannot be empty');
      }
      updatePayload.name = dto.name.trim();
    }

    if (dto.email !== undefined) {
      const emailNormalized = dto.email.toLowerCase().trim();
      if (!emailNormalized) {
        throw AppError.badRequest('Email cannot be empty');
      }

      if (emailNormalized !== existingUser.email) {
        const isTaken = await this.userRepo.existsByEmailExcludingId(
          emailNormalized,
          id
        );
        if (isTaken) {
          throw AppError.conflict('An account with this email already exists');
        }
        updatePayload.email = emailNormalized;
      }
    }

    if (dto.password !== undefined) {
      if (dto.password.length < 6) {
        throw AppError.badRequest('Password must be at least 6 characters long');
      }
      const salt = await bcrypt.genSalt(10);
      updatePayload.password = await bcrypt.hash(dto.password, salt);
    }

    if (dto.role !== undefined) {
      if (dto.role !== 'user' && dto.role !== 'admin') {
        throw AppError.badRequest('Role must be either user or admin');
      }
      updatePayload.role = dto.role;
    }

    if (dto.interests !== undefined) {
      if (!Array.isArray(dto.interests)) {
        throw AppError.badRequest('Interests must be an array of strings');
      }
      updatePayload.interests = dto.interests;
    }

    const updated = await this.userRepo.updateById(id, updatePayload);

    if (!updated) {
      throw AppError.notFound('User not found');
    }

    return updated;
  }

  public async deleteUser(id: string, currentAdminId: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw AppError.badRequest('Invalid user ID');
    }

    if (id === currentAdminId) {
      throw AppError.badRequest('Admins cannot delete their own account');
    }

    const existingUser = await this.userRepo.findById(id);

    if (!existingUser) {
      throw AppError.notFound('User not found');
    }

    await this.userRepo.deleteById(id);
  }
}

export const adminUserService = new AdminUserService();
