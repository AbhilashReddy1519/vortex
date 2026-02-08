import { JWT_SECRET_KEY } from '#config/env.js';
import jwt, { type JwtPayload } from 'jsonwebtoken';
const { JsonWebTokenError, TokenExpiredError } = jwt;

export function generateToken(
  payload: { id: string },
  expiresIn: string = '1d'
) {
  return jwt.sign(
    payload,
    JWT_SECRET_KEY as jwt.Secret,
    { expiresIn } as jwt.SignOptions
  );
}

export type TokenPayload = {
  id: string;
};

type VerifiedToken =
  | {
      valid: true;
      expired: false;
      decoded: TokenPayload;
    }
  | {
      valid: false;
      expired: boolean;
      decoded: null;
    };

export function verifyToken(token: string): VerifiedToken {
  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET_KEY as jwt.Secret
    ) as JwtPayload;

    if (typeof decoded === 'string' || !decoded.id) {
      return {
        valid: false,
        expired: false,
        decoded: null,
      };
    }

    return {
      valid: true,
      expired: false,
      decoded: { id: decoded.id },
    };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return {
        valid: false,
        expired: true,
        decoded: null,
      };
    }

    if (error instanceof JsonWebTokenError) {
      return {
        valid: false,
        expired: false,
        decoded: null,
      };
    }

    throw error; // unexpected error
  }
}
