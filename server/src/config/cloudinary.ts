// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_CLOUD_API_KEY, CLOUDINARY_CLOUD_API_SECRET, CLOUDINARY_CLOUD_NAME } from './env.js';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_CLOUD_API_KEY,
  api_secret: CLOUDINARY_CLOUD_API_SECRET,
});

export default cloudinary;
