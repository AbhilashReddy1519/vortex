import dotenv from 'dotenv';
dotenv.config();

// SERVER PORT
export const SERVER_PORT = Number(process.env.SERVER_PORT || 8000);

// CLIENT PORT
export const CLIENT_PORT = Number(process.env.CLIENT_PORT || 3000);

// COOKIE
export const SECRET_COOKIE = process.env.SECRET_COOKIE || 'mySecretKey';

// DATABASE VARIABLES
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const DATABASE_NAME = process.env.DATABASE_NAME || '';

// JWT
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'mySecretKey';

// NODE ENV

export const NODE_ENV = process.env.NODE_ENV || '';

