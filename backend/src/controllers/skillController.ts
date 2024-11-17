import { Request, Response } from "express";
import Skill from "../models/skillModel";
import {
  imageAddProcess,
  imageDeleteProcess,
  imageEditProcess,
} from "../utils/base64";

export const getSkills = async (req: Request, res: Response): Promise<any> => {
  try {
    const skills = await Skill.find({});

    if (!skills)
      return res
        .status(404)
        .json({ success: false, message: "Skills not found" });

    res.status(200).json({ success: true, skills });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addSkill = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, img, colorInvert } = req.body;

    if (!name || !img || !colorInvert)
      return res
        .status(404)
        .json({
          success: false,
          message: "All fields are required.",
        });

    const imgPath = await imageAddProcess(img);

    const newSkill = new Skill({
      name: name,
      img: imgPath,
      colorInvert: colorInvert,
    });
    await newSkill.save();

    return res
      .status(201)
      .json({
        success: true,
        message: "Skill added successfully",
        skill: newSkill,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const editSkill = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id: skillId } = req.params;
    const { name, img, colorInvert } = req.body;

    const skill = await Skill.findById(skillId);
    if (!skill)
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });

    if (name) skill.name = name;
    if (img) {
      const imgPath = await imageEditProcess(img, skill.img);
      skill.img = imgPath as string;
    }
    if (colorInvert) skill.colorInvert = colorInvert;

    await skill.save();
    res
      .status(200)
      .json({ success: true, message: "Skill updated successfully", skill});
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSkill = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id: skillId } = req.params;

    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }
    await imageDeleteProcess(skill.img);
    await Skill.deleteOne({ _id: skillId });
    res
      .status(200)
      .json({ success: true, message: "Skill deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
