import express from 'express';
import { addSkill, deleteSkill, editSkill, getSkills } from '../controllers/skillController';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router.get('/all', getSkills);
router.post('/add', authenticate, addSkill);
router.put('/edit/:id', authenticate, editSkill);
router.delete('/delete/:id', authenticate, deleteSkill);

export default router;
