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
  try {
    const { name, bio } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const intro = await Intro.ensureSingleDocument();
    if (name) intro.name = name;
    if (bio) intro.bio = bio;
    if (files['image']) {
      await deleteFileFromCloudinary(intro.image);
      intro.image = files['image'][0].path;
    }
    if (files['resume']) {
      await deleteFileFromCloudinary(intro.resume);
      intro.resume = files['resume'][0].path;
    }
    await intro.save();

    res.status(200).json({ success: true, message: 'Intro updated successfully', intro });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};
