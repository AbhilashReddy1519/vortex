import { db } from '#config/neon.js';
import { users } from '#models/user.model.js';
import { githubService } from '#services/github.service.js';
import { tokenService } from '#services/tokens.service.js';
import { failed, success } from '#utils/response.util.js';
import { eq } from 'drizzle-orm';
import type { Request, Response } from 'express';

export async function authenticateUser(req: Request, res: Response) {
  const token =
    res.locals.githubAccessToken || req.signedCookies.githubAccessToken;
  if (!token) {
    failed(res, { error: 'Access token required' });
    return;
  }

  try {
    const response = await githubService.getUserData(token);
    console.log(token);
    console.log(response);
    let { email } = response;
    if (!email) {
      const res = await githubService.getUserEmails(token);
      const [primaryEmail] = res.filter(email => email.primary === true);
      email = primaryEmail?.email ?? res[0]?.email;
    }

    if (!email) {
      failed(res, {
        error:
          'Account must have at least one public email. Please update your GitHub profile or register with email/phone.',
      });
      return;
    }

    const [existing_user] = await db
      .select({ email: users.email, id: users.id })
      .from(users)
      .where(eq(users.email, email));

    if (existing_user) {
      tokenService.setTokens(res, existing_user);
      success(res, { message: 'User login successful' });
      return;
    }

    const [user] = await db
      .insert(users)
      .values({
        email,
        fullName: response.name,
        bio: response.bio,
        location: response.location,
        profilePicture: response.avatar_url,
        githubUsername: response.login,
      })
      .returning({
        id: users.id,
        on_bording: users.onBoarding,
      });

    if (user) {
      tokenService.setTokens(res, user);
    }
    success(res, {
      message: 'User Registered Successfully',
      on_boarding: user?.on_bording,
    });
  } catch (error) {
    failed(res, {
      message: 'Github API problem',
      error,
    });
  }
}
