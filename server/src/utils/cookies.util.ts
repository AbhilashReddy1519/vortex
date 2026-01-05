import type { Response, Request } from 'express';
import { NODE_ENV } from '#config/env.js';

export const cookies = {
  getOptions: (): cookieOptions => ({
    httpOnly: true,
    secure: NODE_ENV === 'production', // only over HTTPS in prod
    sameSite: 'lax', // or "strict" depending on your needs
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    signed: true,
  }),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set: (res: Response, name: string, value: string | any, options = {}) => {
    res.cookie(name, value, { ...cookies.getOptions(), ...options });
  },

  clear: (res: Response, name: string, options = {}) => {
    res.clearCookie(name, { ...cookies.getOptions(), ...options });
  },

  get: (req: Request, name: string) => {
    return req.cookies[name];
  },

  getSigned: (req: Request, name: string) => {
    return req.signedCookies[name];
  },
};
