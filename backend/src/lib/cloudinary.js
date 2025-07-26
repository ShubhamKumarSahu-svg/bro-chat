import { v2 as cloudinary } from 'cloudinary';

import { config } from 'dotenv';

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteImage = async (public_id) => {
  try {
    if (public_id) await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error('Failed to delete Cloudinary image:', err.message);
  }
};

export default cloudinary;
