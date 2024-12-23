import { Request, Response } from 'express';
import Skill from '../models/skillModel';
import { CustomError, handleErrorResponse } from '../lib/utils/error';
import { deleteFileFromCloudinary } from '../lib/utils/cloudinary';

export const getSkills = async (req: Request, res: Response): Promise<void> => {
  try {
    const skills = await Skill.find();
    res.status(200).json({ success: true, skills });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export const addSkill = async (req: Request, res: Response): Promise<void> => {
  const file = req.file as Express.Multer.File;
  const image = file?.path;
  try {
    const { name, colorInvert } = req.body;
    if ([name, file].some((value) => !value)) throw new CustomError('You need to fill in the required fields', 400);

    const newSkill = new Skill({ name, image, colorInvert });
    await newSkill.save();
    res.status(201).json({ success: true, message: 'Skill added successfully', skill: newSkill });
  } catch (error: unknown) {
    await deleteFileFromCloudinary(image);
    handleErrorResponse(error, res);
  }
};

export const editSkill = async (req: Request, res: Response): Promise<void> => {
  const file = req.file as Express.Multer.File;
  const image = file?.path;
  try {
    const { id: skillId } = req.params;
    const { name, colorInvert } = req.body;

    const skill = await Skill.findById(skillId);
    if (!skill) throw new CustomError(`Skill not found`, 404);

    for (const [key, value] of Object.entries({ name, image, colorInvert })) {
      if (key === 'image' && value) await deleteFileFromCloudinary(skill.image);
      if (value) skill[key] = value;
    }
    await skill.save();
    res.status(200).json({ success: true, message: 'Skill updated successfully', skill });
  } catch (error: unknown) {
    await deleteFileFromCloudinary(image);
    handleErrorResponse(error, res);
  }
};

export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: skillId } = req.params;
    const skill = await Skill.findById(skillId);
    if (!skill) throw new CustomError('Skill not found', 404);

    await Promise.all([deleteFileFromCloudinary(skill.image), Skill.deleteOne({ _id: skillId })]);
    res.status(200).json({ success: true, message: 'Skill deleted successfully' });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export const deleteAllSkills = async (req: Request, res: Response): Promise<void> => {
  try {
    const skills = await Skill.find({});
    if (skills.length === 0) throw new CustomError('Skills already doesnt exist', 400);

    await Promise.all(skills.map((skill) => deleteFileFromCloudinary(skill.image)));
    await Skill.deleteMany({});
    res.status(200).json({ success: true, message: 'All Skills deleted successfully' });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};
