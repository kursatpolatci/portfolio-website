import { Request, Response } from "express";
import Project from "../models/projectModel";
import { imageAddProcess, imageDeleteProcess, imageEditProcess } from "../utils/base64";
import { handleResponseError } from "../utils/error";

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const groupedProjects = await Project.aggregate([
      {
        $group: {
          _id: "$category",
          projects: {
            $push: {
              _id: "$_id",
              title: "$title",
              description: "$description",
              img: "$img",
              tags: "$tags",
              link: "$link",
              category: "$category"
            },
          },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          category: "$_id",
          _id: 0,
          projects: 1,
        },
      },
    ]);

    if (!groupedProjects) {
      res.status(404).json({ success: true, message: "Grouped Projects not found" });
      return;
    }
    res.status(200).json({ success: true, projects: groupedProjects });
  } catch (error: unknown) {
    handleResponseError(error, res);
  }
};

export const addProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, img, tags, link, category } = req.body;

    if (!title || !description || !img || !tags || tags.length === 0 || !category) {
      res.status(400).json({ success: false, message: "All fields are required, and tags can not be empty" });
      return;
    }
    const imgPath = await imageAddProcess(img);
    const newProject = new Project({
      title: title,
      description: description,
      img: imgPath,
      tags: tags,
      link: link,
      category: category,
    });
    await newProject.save();
    res.status(201).json({ success: true, message: "Project added successfully", project: newProject });
  } catch (error: unknown) {
    handleResponseError(error, res);
  }
};

export const editProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, img, tags, link, category } = req.body;
    const { id: projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ success: false, message: "Project not found" });
      return;
    }
    if (title) project.title = title;
    if (description) project.description = description;
    if (img) {
      const newImgPath = await imageEditProcess(img, project.img);
      project.img = newImgPath;
    }
    if (tags) project.tags = tags;
    if (link) project.link = link;
    if (category) project.category = category;
    await project.save();
    res.status(200).json({ success: true, message: "Project updated successfully", project });
  } catch (error: unknown) {
    handleResponseError(error, res);
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(400).json({ success: false, message: "Project not found" });
      return;
    }
    await imageDeleteProcess(project.img);
    await Project.deleteOne({ _id: projectId });
    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error: unknown) {
    handleResponseError(error, res);
  }
};
