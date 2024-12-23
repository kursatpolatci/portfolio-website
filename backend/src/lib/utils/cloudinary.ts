import { v2 as cloudinary } from 'cloudinary';
import { handleErrorLogging } from './error';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteFileFromCloudinary = async (filePath: string): Promise<void> => {
  try {
    if (filePath) {
      const publicId = filePath.split('/').slice(-2).join('/').split('.')[0];
      const result = await cloudinary.uploader.destroy(publicId);
      if (result.result === 'not found') console.log(`File with public_id: ${publicId} not found on Cloudinary.`);
      else console.log(`File with public_id: ${publicId} deleted successfully.`);
    } else {
      console.log(`File Path not found`);
    }
  } catch (error: unknown) {
    handleErrorLogging(error);
    throw new Error(`Failed to delete file from cloudinary`);
  }
};

export default cloudinary;
