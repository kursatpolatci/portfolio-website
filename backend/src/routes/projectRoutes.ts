import express from 'express';
import {
  addProject,
  deleteAllProjects,
  deleteProject,
  editProject,
  getProjects,
} from '../controllers/projectController';
import { authenticate } from '../middleware/authenticate';
import { upload } from '../middleware/multer';

const router = express.Router();

router.get('/all', getProjects);
router.post('/add', authenticate, upload.single('image'), addProject);
router.put('/edit/:id', authenticate, upload.single('image'), editProject);
router.delete('/delete/all', authenticate, deleteAllProjects);
router.delete('/delete/:id', authenticate, deleteProject);
export default router;
