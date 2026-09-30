import morgan, { StreamOptions } from 'morgan';
import { env } from '../config/env.config';

const stream: StreamOptions = {
  write: (message: string) => {
    console.log(message.trim());
  },
};

const skip = () => {
  return env.NODE_ENV === 'test';
};

const format = env.IS_PRODUCTION
  ? ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'
  : ':method :url :status :response-time ms - :res[content-length]';

export const morganMiddleware = morgan(format, { stream, skip });
