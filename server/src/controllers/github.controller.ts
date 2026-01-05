import { db } from '#config/neon.js';
import { users } from '#models/user.model.js';
import { githubService } from '#services/github.service.js';
import { cookies } from '#utils/cookies.util.js';
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

    if(!email) {
      failed(res, {error: 'Account must have at least one public email. Please update your GitHub profile or register with email/phone.'});
      return;
    }

    const [existing_user] = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.email, email));

    if (existing_user) {
      cookies.set(res, 'email', email);
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
        userId: users.id,
      });
    success(res, {
      message: 'User Registered Successfully',
      userId: user?.userId,
    });
  } catch (error) {
    failed(res, {
      message: 'Github API problem',
      error,
    });
  }
}
