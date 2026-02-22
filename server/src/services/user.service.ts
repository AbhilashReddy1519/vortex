import { db } from '#config/neon.js';
import { users } from '#models/user.model.js';
import type { IOnboardSchema } from '#validations/onboard.validation.js';
import { eq } from 'drizzle-orm';
import { getImageURL } from '#utils/cloudinary.util.js';

type OnboardingData = {
  userId: string;
  payload: IOnboardSchema;
  profilePicture?: Express.Multer.File;
  coverPicture?: Express.Multer.File;
};

type UserType = typeof users.$inferSelect;

export const userService = {
  checkUsername: async (username: string): Promise<boolean> => {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    return !user; // true if available, false if taken;
  },

  getUserById: async (userId: string): Promise<UserType | undefined> => {
    const [user] = await db.select().from(users).where(eq(users.id, userId));

    return user;
  },

  completeOnboarding: async ({
    userId,
    payload,
    profilePicture,
    coverPicture,
  }: OnboardingData): Promise<{
    success: true;
    message: string;
    user: UserType;
  }> => {
    // Upload images to Cloudinary if provided
    let profilePictureUrl: string | undefined;
    let coverPictureUrl: string | undefined;

    if (profilePicture) {
      const result = await getImageURL(
        profilePicture.buffer,
        `profile_${userId}`
      );
      profilePictureUrl = result.url;
    }

    if (coverPicture) {
      const result = await getImageURL(coverPicture.buffer, `cover_${userId}`);
      coverPictureUrl = result.url;
    }

    // Build update object - username is now required
    const updateData: Partial<typeof users.$inferInsert> = {
      username: payload.username,
      fullName: `${payload.firstName} ${payload.lastName}`,
      location: `${payload.city}, ${payload.country}`,
      profilePicture: profilePictureUrl,
      coverPicture: coverPictureUrl,
      onBoarding: true,
      updatedAt: new Date(),
    };

    // Update user in database
    const updatedUserArray = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning();

    if (!updatedUserArray[0]) {
      throw new Error('Failed to update user');
    }

    return {
      success: true,
      message: 'Onboarding completed successfully',
      user: updatedUserArray[0],
    };
  },
};
