import { IUserRepository, userRepository } from '../repositories/user.repository';
import { IUserDocument, UserRole } from '../models/user.model';
import { generateToken } from '../utils/token';
import { AppError } from '../utils/app-error';

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  interests?: string[];
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResult {
  user: {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    interests: string[];
    createdAt: Date;
    updatedAt: Date;
  };
  token: string;
}

export class AuthService {
  constructor(private readonly userRepo: IUserRepository = userRepository) {}

  public async register(dto: RegisterDto): Promise<AuthResult> {
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

    const newUser = await this.userRepo.createUser({
      name: name.trim(),
      email: emailNormalized,
      password,
      role: assignedRole,
      interests: Array.isArray(interests) ? interests : [],
    });

    const token = generateToken({
      userId: newUser._id.toString(),
      role: newUser.role,
      email: newUser.email,
    });

    return {
      user: newUser.toJSON() as any,
      token,
    };
  }

  public async login(dto: LoginDto): Promise<AuthResult> {
    const { email, password } = dto;

    if (!email || !password) {
      throw AppError.badRequest('Email and password are required');
    }

    const user = await this.userRepo.findByEmail(email, true);

    if (!user) {
      throw AppError.unauthorized('Invalid email or password');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw AppError.unauthorized('Invalid email or password');
    }

    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    return {
      user: user.toJSON() as any,
      token,
    };
  }

  public async getProfile(userId: string): Promise<IUserDocument> {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw AppError.notFound('User not found');
    }

    return user;
  }
}

export const authService = new AuthService();
