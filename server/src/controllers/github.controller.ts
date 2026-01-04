import { githubService } from '#services/github.service.js';
import type { Request, Response } from 'express';

export async function authenticateUser(req: Request, res: Response) {
  const token = req.signedCookies.githubAccessToken;
  if (!token) {
    res.json({
      status: 'Failed',
      message: 'Access token required',
    });
    return;
  }

  try {
    const response = await githubService.getUserData(token);

    const { email, name, avatar_url, login, location } = response;
    if (!email) {
      res.json({
        status: 'Failed',
        message: 'Email is required',
      });
      return;
    }
    // const existing_user =
  } catch (error) {
    res.json({
      status: 'Failed',
      message: error,
    });
  }
}
