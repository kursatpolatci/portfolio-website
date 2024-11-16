import { Request, Response } from "express";
import Intro from "../models/introModel";

export const getIntro = async (req: Request, res: Response): Promise<any> => {
  try {
    const intro = await Intro.findOne({});

    if (!intro)
      return res
        .status(404)
        .json({ success: false, message: "Intro not found" });

    res.status(200).json({ success: true, intro });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

