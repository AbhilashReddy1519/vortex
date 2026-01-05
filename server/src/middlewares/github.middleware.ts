import { githubService } from '#services/github.service.js';
import { cookies } from '#utils/cookies.util.js';
import { failed } from '#utils/response.util.js';
import type { Request, Response, NextFunction } from 'express';

export async function getAccessToken(req: Request, res: Response, next: NextFunction) {
  const code = req.query.code as string;
  if (!code) {
    failed(res, { error: 'GitHub authorization code is required' });
    return;
  }
  try {
    const response = await githubService.getToken(code);
    res.locals.githubAccessToken = response.access_token;
    cookies.set(res, 'githubAccessToken', response.access_token);

    next();
  } catch (error) {
    failed(res, {error});
  }
}
