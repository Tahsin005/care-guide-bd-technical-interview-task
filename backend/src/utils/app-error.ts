export class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: 'fail' | 'error';
  public readonly isOperational: boolean;
  public readonly errors?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    errors?: any,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = isOperational;
    this.errors = errors;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad Request', errors?: any): AppError {
    return new AppError(message, 400, errors);
  }

  static unauthorized(message = 'Unauthorized', errors?: any): AppError {
    return new AppError(message, 401, errors);
  }

  static forbidden(message = 'Forbidden', errors?: any): AppError {
    return new AppError(message, 403, errors);
  }

  static notFound(message = 'Resource Not Found', errors?: any): AppError {
    return new AppError(message, 404, errors);
  }

  static conflict(message = 'Conflict', errors?: any): AppError {
    return new AppError(message, 409, errors);
  }

  static internal(message = 'Internal Server Error', errors?: any): AppError {
    return new AppError(message, 500, errors, false);
  }

  static serviceUnavailable(message = 'Service Unavailable', errors?: any): AppError {
    return new AppError(message, 503, errors);
  }
}
