import { userTokenService } from '#services/tokens.service.js';
import { userService } from '#services/user.service.js';
import { failed, success } from '#utils/response.util.js';
import type { IOnboardSchema } from '#validations/onboard.validation.js';
import type { Request, Response } from 'express';


export async function completeOnboarding(req: Request, res: Response) {
  const payload:IOnboardSchema = req.body;
  if (!payload) {
    failed(res, { error: 'User is not available' });
  }

  try {
    const result = await userService.completeOnboarding(payload);
  } catch (error) {
    console.log(error);
  }
}

export async function refreshToken(req: Request, res: Response) {
  const result = userTokenService.getAccessToken(req, res);

  if (!result.success) {
    return failed(res, { code: result.code, error: result.error });
  }

  return success(res, { message: result.message });
}
