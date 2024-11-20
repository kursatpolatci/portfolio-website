import express from "express";
import { editIntro, getIntro } from "../controllers/introController";
import { upload } from "../utils/multer";

const router = express.Router();

router.get("/", getIntro);
router.put("/edit", upload, editIntro);

export default router;
