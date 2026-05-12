import { authenticateService } from '#services/auth.service.js';
import { failed, success } from '#utils/response.util.js';
import type { Request, Response } from 'express';
import { tokenService, userTokenService } from '#services/tokens.service.js';
import { userService } from '#services/user.service.js';

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
      data: {
        id: result.id,
        email: result.email,
        onBoarding: result.onBoarding ?? false,
      },
    });
  } catch (error) {
    return failed(res, { error });
  }
}

// Login -> identifier, password
export async function loginUser(req: Request, res: Response) {
  const payload = req.body;
  try {
    console.log('📝 Login attempt with:', payload.identifier);
    const result = await authenticateService.login(payload);
    if (!result) {
      throw new Error('Cannot generate refresh token: user not found');
    }
    console.log('✅ Login successful, setting tokens...');
    tokenService.setTokens(res, result);
    console.log('📤 Tokens set, sending response');

    return success(res, {
      code: 200,
      message: 'User login successful',
      data: {
        id: result.id,
        email: result.email,
        onBoarding: result.onBoarding,
      },
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    return failed(res, { error, code: 404 });
  }
}

export async function checkUsername(req: Request, res: Response) {
  const { username } = req.query as { username?: string };
  if (!username) {
    failed(res, { available: false, error: 'Username required' });
    return;
  }
  try {
    const available = await userService.checkUsername(username);

    return success(res, { available });
  } catch (error) {
    console.log(error);
    return failed(res, {
      code: 500,
      available: false,
      error: 'Internal server error',
    });
  }
}

// update -> user info
// logout

export async function getCurrentUser(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return failed(res, {
        code: 401,
        error: 'User not authenticated',
      });
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      return failed(res, {
        code: 404,
        error: 'User not found',
      });
    }

    return success(res, {
      code: 200,
      message: 'User retrieved successfully',
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        onBoarding: user.onBoarding,
      },
    });
  } catch (error) {
    return failed(res, {
      code: 500,
      error: error instanceof Error ? error.message : 'Failed to get user',
    });
  }
}

// Refresh access token using refresh token
export async function refreshUser(req: Request, res: Response) {
  try {
    const refreshToken = req.signedCookies.refreshToken;

    if (!refreshToken) {
      return failed(res, {
        code: 401,
        error: 'Refresh token not found',
      });
    }

    const result = userTokenService.getUserResult(refreshToken);

    if (!result.success) {
      return failed(res, {
        code: result.code,
        error: result.reason,
      });
    }

    // Generate new access token
    const payload = { id: result.user };
    tokenService.setAccessToken(res, payload);

    return success(res, {
      code: 200,
      message: 'Access token refreshed',
    });
  } catch (error) {
    return failed(res, {
      code: 500,
      error: error instanceof Error ? error.message : 'Failed to refresh token',
    });
  }
}

export function logout(req: Request, res: Response) {
  try {
    tokenService.clearTokens(res);

    return success(res, {
      code: 200,
      message: 'Logged out successfully',
    });
  } catch (error) {
    return failed(res, {
      code: 500,
      error: error instanceof Error ? error.message : 'Logout failed',
    });
  }
}