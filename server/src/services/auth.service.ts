import { db } from '#config/neon.js';
import { users } from '#models/user.model.js';
import { comparePassword, hashPassword } from '#utils/bcrypt.util.js';
import type {
  ILoginSchema,
  IRegisterSchema,
} from '#validations/user.authValidation.js';
import { eq, or } from 'drizzle-orm';

export const authenticateService = {
  signUp: async (payload: IRegisterSchema) => {
    const { email, password } = payload;

    const [existingUser] = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.email, email));

    if (existingUser) {
      console.error('User with email already exists');
      throw new Error(
        `User with ${email} already exists retry using new email.`
      );
    }
    const passwordHash = await hashPassword(password);
    const [newUser] = await db
      .insert(users)
      .values({ email, passwordHash })
      .returning({ id: users.id });

    return newUser;
  },

  login: async (payload: ILoginSchema) => {
    const { identifier, password } = payload;

    const [user] = await db
      .select()
      .from(users)
      .where(or(eq(users.email, identifier), eq(users.username, identifier)));

    if (!user || !user.passwordHash) {
      throw new Error(
        !user
          ? 'User not found. Try registering before login'
          : 'User has no password set'
      );
    }

    const isPassword = comparePassword(password, user?.passwordHash);
    if (!isPassword) {
      throw new Error(
        'Password is invalid, use forgot password to get new password'
      );
    }

    return { id: user.id };
  },
};
