import { JWT_SECRET_KEY } from '#config/env.js';
import * as jwt from 'jsonwebtoken';

export function generateToken(payload: { id: string }, expiresIn: string = '1d') {
  return jwt.sign(
    payload,
    JWT_SECRET_KEY as jwt.Secret,
    { expiresIn } as jwt.SignOptions
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET_KEY as jwt.Secret);
}
