import { cookies } from '#utils/cookies.util.js';
import { generateToken } from '#utils/jwt.util.js';
import type { Response } from 'express';
import crypto from 'crypto';

type tokenPayload = {
  id: string;
};

export const tokenService = {
  setTokens: (res: Response, payload: tokenPayload) => {
    const token = { id: payload.id };
    // Refresh Token
    const refreshToken = generateToken(token, '7d');
    cookies.set(res, 'refreshCookie', refreshToken);

    // CSRF token
    const csrfToken = crypto.randomBytes(24).toString('hex');
    cookies.set(res, 'csrfToken', csrfToken, { httpOnly: false });

    // Access Token
    const accessToken = generateToken(token, '15m');
    cookies.set(res, 'accessToken', accessToken, { maxAge: 15 * 60 * 1000 });
  },
  clearTokens: () => {},
};
