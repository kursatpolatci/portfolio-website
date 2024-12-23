import { Request, Response } from 'express';
import Project from '../models/projectModel';
import { handleErrorResponse } from '../lib/utils/error';
import { deleteFileFromCloudinary } from '../lib/utils/cloudinary';

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const groupedProjects = await Project.aggregate([
      {
        $group: {
          _id: '$category',
          projects: {
            $push: {
              _id: '$_id',
              title: '$title',
              description: '$description',
              image: '$image',
              tags: '$tags',
              link: '$link',
              category: '$category',
            },
          },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          category: '$_id',
          _id: 0,
          projects: 1,
        },
      },
    ]);
    res.status(200).json({ success: true, projects: groupedProjects });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export const addProject = async (req: Request, res: Response): Promise<void> => {
  const file = req.file as Express.Multer.File;
  try {
    const { title, description, tags, link, category } = req.body;

    if (!title || !description || !file || !link || !category) {
      res.status(400).json({ success: false, message: 'You need to fill in the required fields' });
      return;
    }
    const newProject = new Project({
      title: title,
      description: description,
      image: file.path,
      tags: tags,
      link: link,
      category: category,
    });

    await newProject.save();
    res.status(201).json({ success: true, message: 'Project added successfully', project: newProject });
  } catch (error: unknown) {
    deleteFileFromCloudinary(file?.path);
    handleErrorResponse(error, res);
  }
};

export const editProject = async (req: Request, res: Response): Promise<void> => {
  const file = req.file as Express.Multer.File;
  try {
    const { title, description, tags, link, category } = req.body;
    const { id: projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    Object.entries({ title, description, image: file?.path, tags, link, category }).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'image') deleteFileFromCloudinary(project.image);
        project[key] = value;
      }
    });

    await project.save();
    res.status(200).json({ success: true, message: 'Project updated successfully', project });
  } catch (error: unknown) {
    deleteFileFromCloudinary(file?.path);
    handleErrorResponse(error, res);
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    deleteFileFromCloudinary(project.image);
    await Project.deleteOne({ _id: projectId });

    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export const deleteAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({});
    if (projects.length === 0) {
      res.status(404).json({ success: false, message: 'Projects not found' });
      return;
    }

    await Promise.all(projects.map((project) => deleteFileFromCloudinary(project.image)));
    await Project.deleteMany({});

    res.status(200).json({ success: true, message: 'All projects deleted successfully' });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};
