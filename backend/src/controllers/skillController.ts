import { Request, Response } from "express";
import Skill from "../models/skillModel";
import { imageAddProcess, imageDeleteProcess, imageEditProcess } from "../lib/utils/datauri";
import { handleResponseError } from "../lib/utils/error";

export const getSkills = async (req: Request, res: Response): Promise<void> => {
  try {
    const skills = await Skill.find({});

    if (!skills) {
      res.status(404).json({ success: false, message: "Skills not found" });
      return;
    }

    res.status(200).json({ success: true, skills });
  } catch (error: unknown) {
    handleResponseError(error, res);
  }
};

export const addSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, img, colorInvert } = req.body;
    if (!name || !img || colorInvert === undefined) {
      res.status(404).json({ success: false, message: "All fields are required." });
      return;
    }
    const imgPath = await imageAddProcess(img);
    const newSkill = new Skill({
      name: name,
      img: imgPath,
      colorInvert: colorInvert,
    });
    await newSkill.save();

    res.status(201).json({ success: true, message: "Skill added successfully", skill: newSkill });
  } catch (error: unknown) {
    handleResponseError(error, res);
  }
};

export const editSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: skillId } = req.params;
    const { name, img, colorInvert } = req.body;
    console.log(req.body);
    const skill = await Skill.findById(skillId);
    if (!skill) {
      res.status(404).json({ success: false, message: "Skill not found" });
      return;
    }

    if (name) skill.name = name;
    if (img) {
      const imgPath = await imageEditProcess(img, skill.img);
      skill.img = imgPath;
    }
    if (colorInvert !== undefined) skill.colorInvert = colorInvert;

    await skill.save();
    res.status(200).json({ success: true, message: "Skill updated successfully", skill });
  } catch (error: unknown) {
    handleResponseError(error, res);
  }
};

export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: skillId } = req.params;

    const skill = await Skill.findById(skillId);
    if (!skill) {
      res.status(404).json({ success: false, message: "Skill not found" });
      return;
    }
    await imageDeleteProcess(skill.img);
    await Skill.deleteOne({ _id: skillId });
    res.status(200).json({ success: true, message: "Skill deleted successfully" });
  } catch (error: unknown) {
    handleResponseError(error, res);
  }
};
