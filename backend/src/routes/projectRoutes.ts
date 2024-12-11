import express from 'express';
import { addProject, deleteProject, editProject, getProjects } from '../controllers/projectController';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router.get('/all', getProjects);
router.post('/add', authenticate, addProject);
router.put('/edit/:id', authenticate, editProject);
router.delete('/delete/:id', authenticate, deleteProject);

export default router;
