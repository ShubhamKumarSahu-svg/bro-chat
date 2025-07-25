import mutler from 'multer';
import cloudinary from './cloudinary.js';

const storage = mutler.memoryStorage();

export const upload = mutler({
  storage,
});

export const streamUpload = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};
