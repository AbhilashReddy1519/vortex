import { authenticateService } from '#services/auth.service.js';
import { failed, success } from '#utils/response.util.js';
import type { Request, Response } from 'express';
import { tokenService } from '#services/tokens.service.js';

// Register --> email password
export async function registerUser(req: Request, res: Response) {
  const payload = req.body;
  try {
    const result = await authenticateService.signUp(payload);
    console.error(result);
    if (!result) {
      throw new Error('Cannot generate refresh token: user not found');
    }

    tokenService.setTokens(res, result);
    // const token = { id: result.id };
    // // Refresh Token
    // const refreshToken = generateToken(token, '7d');
    // cookies.set(res, 'refreshCookie', refreshToken);

    // // CSRF token
    // const csrfToken = crypto.randomBytes(24).toString('hex');
    // cookies.set(res, 'csrfToken', csrfToken, { httpOnly: false });

    // // Access Token
    // const accessToken = generateToken(token, '15m');
    // cookies.set(res, 'accessToken', accessToken, { maxAge: 15 * 60 * 1000 });

    return success(res, {
      code: 201,
      message: 'User Registered Successfully',
      on_boarding: result.on_boarding,
    });
  } catch (error) {
    return failed(res, { error });
  }
}

// Login -> identifier, password
export async function loginUser(req: Request, res: Response) {
  const payload = req.body;
  try {
    const result = await authenticateService.login(payload);
    if (!result) {
      throw new Error('Cannot generate refresh token: user not found');
    }
    tokenService.setTokens(res, result);
    // Refresh Token
    // const refreshToken = generateToken(result, '7d');
    // cookies.set(res, 'refreshCookie', refreshToken);

    // // CSRF token
    // const csrfToken = crypto.randomBytes(24).toString('hex');
    // cookies.set(res, 'csrfToken', csrfToken, { httpOnly: false });

    // // Access Token
    // const accessToken = generateToken(result, '15m');
    // cookies.set(res, 'accessToken', accessToken, { maxAge: 15 * 60 * 1000 });

    return success(res, {
      message: 'User login successfull',
    });
  } catch (error) {
    return failed(res, { error, code: 404 });
  }
}

// update -> user info
// logout
