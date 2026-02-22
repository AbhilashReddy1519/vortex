import { userTokenService } from '#services/tokens.service.js';
import { userService } from '#services/user.service.js';
import { failed, success } from '#utils/response.util.js';
import type { IOnboardSchema } from '#validations/onboard.validation.js';
import type { Request, Response } from 'express';

export async function completeOnboarding(req: Request, res: Response) {
  const payload: IOnboardSchema = req.body;
  const userId = req.user?.id;

  if (!payload) {
    return failed(res, { error: 'Payload is required', code: 400 });
  }

  if (!userId) {
    return failed(res, { error: 'User is not authenticated', code: 401 });
  }

  try {
    const files = req.files as {
      profile_picture?: Express.Multer.File[];
      cover_picture?: Express.Multer.File[];
    };

    const profilePicture = files?.profile_picture?.[0];
    const coverPicture = files?.cover_picture?.[0];

    const result = await userService.completeOnboarding({
      userId,
      payload,
      ...(profilePicture && { profilePicture }),
      ...(coverPicture && { coverPicture }),
    });

    return success(res, {
      code: 200,
      message: result.message,
      user: result.user,
    });
  } catch (error) {
    console.error('Onboarding error:', error);
    return failed(res, {
      code: 500,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to complete onboarding',
    });
  }
}

export async function refreshToken(req: Request, res: Response) {
  const result = userTokenService.getAccessToken(req, res);

  if (!result.success) {
    return failed(res, { code: result.code, error: result.error });
  }

  return success(res, { message: result.message });
}
