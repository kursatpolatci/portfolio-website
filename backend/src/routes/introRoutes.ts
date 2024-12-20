import express from 'express';
import { editIntro, getIntro } from '../controllers/introController';
import { upload } from '../middleware/multer';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router.get('/', getIntro);
router.put(
  '/edit',
  authenticate,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
  ]),
  editIntro
);

export default router;
