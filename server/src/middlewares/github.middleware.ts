import { NODE_ENV } from '#config/env.js';
import { githubService } from '#services/github.service.js';
import type { Request, Response, NextFunction } from 'express';

export async function getAccessToken(req: Request, res: Response, next: NextFunction) {
  const code = req.query.code as string;
  if (!code) {
    return res.status(400).json({
      status: 'FAILED',
      message: 'GitHub authorization code is required',
    });
  }
  try {
    const response = await githubService.getToken(code);

    res.cookie('githubAccessToken', response.access_token, {
      httpOnly: true,
      secure: NODE_ENV === 'production', // only over HTTPS in prod
      sameSite: 'lax', // or "strict" depending on your needs
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      signed: true,
    });

    next();
  } catch (error) {
    res.json({
      status: 'FAILED',
      message: error,
    });
  }
}
