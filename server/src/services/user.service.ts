import { db } from '#config/neon.js';
import { users } from '#models/user.model.js';
import type { IOnboardSchema } from '#validations/onboard.validation.js';
import { eq } from 'drizzle-orm';

type OnboardingData = {
  payload: IOnboardSchema;
  profilePicture?: Express.Multer.File;
  coverPicture?: Express.Multer.File;
};

export const userService = {
  checkUsername: async (username: string): Promise<boolean> => {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    return !user; // true if available, false if taken;
  },

  completeOnboarding: async ({
    payload,
    profilePicture,
    coverPicture,
  }: OnboardingData) => {
    console.log(payload, profilePicture, coverPicture);
  },
};
