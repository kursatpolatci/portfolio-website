import { Request, Response } from 'express';
import Skill from '../models/skillModel';
import { handleErrorResponse } from '../lib/utils/error';
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
  try {
    const { name, colorInvert } = req.body;
    if (!name || !file || !colorInvert) {
      res.status(404).json({ success: false, message: 'You need to fill in the required fields' });
      return;
    }

    const newSkill = new Skill({
      name: name,
      image: file.path,
      colorInvert: colorInvert,
    });

    await newSkill.save();
    res.status(201).json({ success: true, message: 'Skill added successfully', skill: newSkill });
  } catch (error: unknown) {
    deleteFileFromCloudinary(file?.path);
    handleErrorResponse(error, res);
  }
};

export const editSkill = async (req: Request, res: Response): Promise<void> => {
  const file = req.file as Express.Multer.File;
  try {
    const { id: skillId } = req.params;
    const { name, colorInvert } = req.body;

    const skill = await Skill.findById(skillId);
    if (!skill) {
      res.status(404).json({ success: false, message: 'Skill not found' });
      return;
    }

    Object.entries({ name, image: file?.path, colorInvert }).forEach(([key, value]) => {
      if (value) {
        if (key === 'image') deleteFileFromCloudinary(skill.image);
        skill[key] = value;
      }
    });

    await skill.save();
    res.status(200).json({ success: true, message: 'Skill updated successfully', skill });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: skillId } = req.params;

    const skill = await Skill.findById(skillId);
    if (!skill) {
      res.status(404).json({ success: false, message: 'Skill not found' });
      return;
    }

    deleteFileFromCloudinary(skill.image);
    await Skill.deleteOne({ _id: skillId });

    res.status(200).json({ success: true, message: 'Skill deleted successfully' });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export const deleteAllSkills = async (req: Request, res: Response): Promise<void> => {
  try {
    const skills = await Skill.find({});
    if (skills.length === 0) {
      res.status(400).json({ success: false, message: 'Skills not found' });
      return;
    }

    await Promise.all(skills.map((skill) => deleteFileFromCloudinary(skill.image)));
    await Skill.deleteMany({});

    res.status(200).json({ success: true, message: 'All Skills deleted successfully' });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};
