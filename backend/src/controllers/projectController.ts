import { Request, Response } from "express";
import Project from "../models/projectModel";
import {
  imageAddProcess,
  imageDeleteProcess,
  imageEditProcess,
} from "../utils/imageProcess";

export const getProjects = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const projects = await Project.find();
    res.status(200).json({ success: true, projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addProject = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description, img, tags, link } = req.body;
    if (!title || !description || !img || !tags || tags.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, and tags cannot be empty.",
      });
    }
    const imgPath = await imageAddProcess(img);
    const newProject = new Project({
      title: title,
      description: description,
      img: imgPath,
      tags: tags,
      link: link,
    });
    await newProject.save();
    res.status(201).json({
      success: true,
      message: "Project added successfully",
      project: newProject,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const editProject = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title, description, img, tags, link } = req.body;
    const { id: projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    if (title) project.title = title;
    if (description) project.description = description;
    if (img) {
      const newImgPath = await imageEditProcess(img, project.img);
      project.img = newImgPath as string;
    }
    if (tags) project.tags = tags;
    if (link) project.link = link;
    await project.save();
    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id: projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(400)
        .json({ success: false, message: "Project not found" });
    }
    await imageDeleteProcess(project.img);
    await Project.deleteOne({ _id: projectId });
    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
