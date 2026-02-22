import { userTokenService } from '#services/tokens.service.js';
import { failed } from '#utils/response.util.js';
import type { NextFunction, Request, Response } from 'express';

export async function verifyCSRF(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const csrfToken = req.signedCookies.csrfToken;
  const csrfHeader = req.headers['x-csrf-token'] || req.headers['x-xsrf-token'];

  if (!csrfToken || !csrfHeader) {
    return failed(res, { code: 403, error: 'CSRF_TOKEN_MISSING' });
  }

  if (csrfToken !== csrfHeader) {
    return failed(res, { code: 403, error: 'CSRF_TOKEN_INVALID' });
  }

  next();
}

export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.signedCookies.accessToken;

  if (!token) {
    console.log('❌ No accessToken found in cookies');
    console.log('Available signed cookies:', Object.keys(req.signedCookies));
    return failed(res, {
      code: 401,
      error: 'NO_TOKEN',
      message: 'Unauthorized',
    });
  }

  const client = userTokenService.getUserResult(token);
  if (!client.success) {
    console.log(`❌ Token verification failed: ${client.reason}`);
    return failed(res, {
      code: client.code,
      error: client.reason,
      message: 'Unauthorized',
    });
  }

  console.log(`✅ User verified: ${client.user}`);
  req.user = client.user;
  next();
}
