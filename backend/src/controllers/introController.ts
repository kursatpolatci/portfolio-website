import { Request, Response } from 'express';
import Intro from '../models/introModel';
import { handleErrorResponse } from '../lib/utils/error';
import { deleteFileFromCloudinary } from '../lib/utils/cloudinary';

export const getIntro = async (req: Request, res: Response): Promise<void> => {
  try {
    const intro = await Intro.ensureSingleDocument();
    res.status(200).json({ success: true, intro });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export const editIntro = async (req: Request, res: Response): Promise<void> => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const image = files['image']?.[0]?.path;
  const resume = files['resume']?.[0]?.path;
  try {
    const { name, bio } = req.body;
    const intro = await Intro.ensureSingleDocument();

    for (const [key, value] of Object.entries({ name, bio, image, resume })) {
      if (['image', 'resume'].includes(key) && value) await deleteFileFromCloudinary(intro[key]);
      if (value) intro[key] = value;
    }
    await intro.save();
    res.status(200).json({ success: true, message: 'Intro updated successfully', intro });
  } catch (error: unknown) {
    await Promise.all([deleteFileFromCloudinary(image), deleteFileFromCloudinary(resume)]);
    handleErrorResponse(error, res);
  }
};
