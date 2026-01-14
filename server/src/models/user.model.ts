import {
  boolean,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    username: varchar('username', { length: 255 }).unique(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    passwordHash: varchar('password', { length: 255 }),
    fullName: varchar('full_name', { length: 100 }),
    bio: text('bio').$default(() => 'Developer exploring ideas on Vortex.'),
    location: varchar('location', { length: 100 }),
    profilePicture: varchar('profile_picture', { length: 255 }),
    coverPicture: varchar('cover_picture', { length: 255 }),
    githubUsername: varchar('github_username', { length: 100 }),
    techStack: jsonb('tech_stack').$type<string[]>().default([]),
    isMentor: boolean('is_mentor').default(false),
    onBoarding: boolean('on_boarding').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  table => [
    index('users_username_idx').on(table.username),
    index('users_email_idx').on(table.email),
  ]
);

// @example
// Deprecated version:

// export const users = pgTable("users", {
//     id: integer(),
// }, (t) => ({
//     idx: index('custom_name').on(t.id)
// }));
// New API:

// export const users = pgTable("users", {
//     id: integer(),
// }, (t) => [
//     index('custom_name').on(t.id)
// ]);
