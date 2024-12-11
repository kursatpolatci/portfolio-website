import { Request, Response } from "express";
import Intro from "../models/introModel";
import { handleResponseError } from "../lib/utils/error";

export const getIntro = async (req: Request, res: Response): Promise<void> => {
  try {
    const intro = await Intro.findOne({});

    if (!intro) {
      await Intro.ensureSingleDocument();
      const defaultIntro = await Intro.findOne({});
      res.status(200).json({ success: true, defaultIntro });
      return;
    }
    res.status(200).json({ success: true, intro });
  } catch (error: unknown) {
    handleResponseError(error, res);
  }
};

export const editIntro = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, bio } = req.body;

    const intro = await Intro.findOne({});
    if (!intro) {
      res.status(404).json({ success: false, message: "Intro not found" });
      return;
    }

    if (name) intro.name = name;
    if (bio) intro.bio = bio;
    await intro.save();

    res.status(200).json({ success: true, message: "Intro updated successfully", intro });
  } catch (error: unknown) {
    console.log(error);
    handleResponseError(error, res);
  }
};
