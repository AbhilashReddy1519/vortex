import { defineConfig } from 'drizzle-kit';
import { NEON_URL } from '#config/env.ts';

export default defineConfig({
  out: './drizzle',
  schema: './src/models/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: NEON_URL,
  },
  verbose: true,
  strict: true,
});
