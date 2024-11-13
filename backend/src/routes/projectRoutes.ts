import express from "express";
import {
  addProject,
  deleteProject,
  editProject,
  getProjects,
} from "../controllers/projectController";

const router = express.Router();

router.get("/all", getProjects);
router.post("/add", addProject);
router.put("/edit/:id", editProject);
router.delete("/delete/:id", deleteProject);

export default router;
