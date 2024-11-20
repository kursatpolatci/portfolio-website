import { Request, Response } from "express";
import Intro from "../models/introModel";
import { handleResponseError } from "../utils/error";

export const getIntro = async (req: Request, res: Response): Promise<void> => {
  try {
    const intro = await Intro.findOne({});

    if (!intro) {
      await Intro.ensureSingleDocument();
      const defaultIntro = await Intro.findOne({})
      res.status(200).json({ success: true, defaultIntro});
      return;
    }
    res.status(200).json({ success: true, intro });
  } catch (error: unknown) {
    handleResponseError(error, res);
  }
};

export const editIntro = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, summary } = req.body;
    const files = req.files as { [key: string]: Express.Multer.File[] };
    const image = files["images"] ? files["images"][0] : null;
    const resume = files["resume"] ? files["resume"][0] : null;

    const intro = await Intro.findOne({});

    if (!intro) {
      res.status(404).json({ success: false, message: "Intro not found" });
      return;
    }

    if (fullName) intro.fullName = fullName;
    if (summary) intro.summary = summary;
    if (image) intro.profileImg = image.filename;
    if (resume) intro.resume = resume.filename;
    await intro.save();

    res.status(200).json({ success: true, message: "Intro updated successfully", intro });
  } catch (error: unknown) {
    handleResponseError(error, res);
  }
};
