import { cookies } from '#utils/cookies.util.js';
import { generateToken, verifyToken } from '#utils/jwt.util.js';
import type { Request, Response } from 'express';
import crypto from 'crypto';

type tokenPayload = {
  id: string;
};

export const tokenService = {
  setTokens: (res: Response, payload: tokenPayload) => {
    const token = { id: payload.id };
    console.log('🔑 Setting tokens for user:', payload.id);

    // Refresh Token
    const refreshToken = generateToken(token, '7d');
    cookies.set(res, 'refreshToken', refreshToken);
    console.log('✅ Refresh token set');

    // CSRF token
    const csrfToken = crypto.randomBytes(24).toString('hex');
    cookies.set(res, 'csrfToken', csrfToken, { httpOnly: false });
    console.log('✅ CSRF token set');

    // Access Token
    const accessToken = generateToken(token, '15m');
    console.log('Generated accessToken:', accessToken ? 'YES' : 'NO');
    cookies.set(res, 'accessToken', accessToken, { maxAge: 15 * 60 * 1000 });
    console.log('✅ Access token set with maxAge:', 15 * 60 * 1000);
  },
  setAccessToken: (res: Response, payload: tokenPayload) => {
    const token = { id: payload.id };

    //Access token
    const accessToken = generateToken(token, '15m');
    cookies.set(res, 'accessToken', accessToken, { maxAge: 15 * 60 * 1000 });
  },
  clearTokens: (res: Response) => {
    cookies.clear(res, 'refreshToken');
    cookies.clear(res, 'accessToken');
    cookies.clear(res, 'csrfToken', { httpOnly: false });
    cookies.clear(res, 'githubAccessToken');
  },
};

type UserResult =
  | { success: true; user: string }
  | {
      success: false;
      code: 401;
      reason: 'NO_TOKEN' | 'TOKEN_EXPIRED' | 'INVALID_TOKEN';
    };

type accessTokenResult =
  | { success: true; message: string }
  | {
      success: false;
      code: 401;
      error: 'NO_TOKEN' | 'TOKEN_EXPIRED' | 'INVALID_TOKEN';
      message?: string;
    };

export const userTokenService = {
  getUserResult: (token: string): UserResult => {
    const accessToken = token;
    if (!accessToken) {
      return { success: false, code: 401, reason: 'NO_TOKEN' };
    }

    const result = verifyToken(accessToken);

    if (!result.valid && result.expired) {
      return { success: false, code: 401, reason: 'TOKEN_EXPIRED' };
    }

    if (!result.valid) {
      return { success: false, code: 401, reason: 'INVALID_TOKEN' };
    }

    return {
      user: result.decoded.id,
      success: true,
    };
  },

  getAccessToken: (req: Request, res: Response): accessTokenResult => {
    const refreshToken = req.signedCookies.refreshToken;
    if (!refreshToken) {
      return { success: false, code: 401, error: 'NO_TOKEN' };
    }
    const result = userTokenService.getUserResult(refreshToken);

    if (!result.success) {
      return {
        success: false,
        code: result.code,
        error: result.reason,
        message: 'Unauthorized',
      };
    }

    const payload = { id: result.user };
    tokenService.setAccessToken(res, payload);

    return {
      success: true,
      message: 'Access token updated',
    };
  },
};
