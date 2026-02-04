import type { TokenPayload } from '#utils/jwt.util';

export {}; // REQUIRED for NodeNext + isolatedModules

declare module 'express-serve-static-core' {
  interface Request {
    user?: TokenPayload;
  }
}
