import express from "express";
import { editIntro, getIntro } from "../controllers/introController";
import { upload } from "../lib/utils/multer";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.get("/", getIntro);
router.put("/edit", authenticate, upload, editIntro);

export default router;
