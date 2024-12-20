import express from 'express';
import { addSkill, deleteAllSkills, deleteSkill, editSkill, getSkills } from '../controllers/skillController';
import { authenticate } from '../middleware/authenticate';
import { upload } from '../middleware/multer';

const router = express.Router();

router.get('/all', getSkills);
router.post('/add', authenticate, upload.single('image'), addSkill);
router.put('/edit/:id', authenticate, upload.single('image'), editSkill);
router.delete('/delete/all', authenticate, deleteAllSkills);
router.delete('/delete/:id', authenticate, deleteSkill);

export default router;
