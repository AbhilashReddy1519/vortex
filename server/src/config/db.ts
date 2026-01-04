/* 
 * SINCE WE ARE BUILDING DEVELOPER COMMINUTY MAINTAINING RELATIONS IS VERRRRRY IMPORTANT 
 * SO SHIFTED TO POSTGRESQL 
 * STILL CAN USE MONGODB FURTHER USE
**/

import { connect } from 'mongoose';
import { DATABASE_NAME, DATABASE_URL } from '#config/env.js';

export const connectDB = async (): Promise<void> => {
  if (!DATABASE_URL || !DATABASE_NAME) {
    console.log(
      'Error: DATABASE_URL or DATABASE_NAME is not defined in environment variables.'
    );
    return;
  }

  try {
    const connectionString = `${DATABASE_URL}/${DATABASE_NAME}`;

    await connect(connectionString);
    console.log('Success: 🔥 Database connected successfully');
  } catch (error) {
    console.log('ERROR: ', error);
  }
};
