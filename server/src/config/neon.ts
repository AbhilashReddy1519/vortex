import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { NEON_URL } from './env.js';


const sql = neon(NEON_URL);
const db  = drizzle(sql);

export const connectDB = async (): Promise<void> => {
  if (!process.env.DATABASE_URL) {
    console.error(
      'Error: DATABASE_URL is not defined in environment variables.'
    );
    return;
  }

  try {
    // Run a simple query to verify connection
    await sql`SELECT 1`;
    console.log('Success: 🔥 Database connected successfully');
  } catch (error) {
    console.error('ERROR: Database connection failed →', error);
  }
};

export {db,sql};
