import express from 'express';
import { addSkill, deleteSkill, editSkill, getSkills } from '../controllers/skillController';

const router = express.Router();

router.get('/all', getSkills);
router.post('/add', addSkill);
router.put('/edit/:id', editSkill);
router.delete('/delete/:id', deleteSkill);

export default router;
