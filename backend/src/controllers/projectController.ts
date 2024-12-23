import { Request, Response } from 'express';
import Project from '../models/projectModel';
import { CustomError, handleErrorResponse } from '../lib/utils/error';
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
  const image = file?.path;
  try {
    const { title, description, tags, link, category } = req.body;
    if ([title, description, tags, link, category, image].some((value) => !value))
      throw new CustomError('You need to fill in the required fields', 400);

    const newProject = new Project({ title, description, image, tags, link, category });
    await newProject.save();
    res.status(201).json({ success: true, message: 'Project added successfully', project: newProject });
  } catch (error: unknown) {
    await deleteFileFromCloudinary(image);
    handleErrorResponse(error, res);
  }
};

export const editProject = async (req: Request, res: Response): Promise<void> => {
  const file = req.file as Express.Multer.File;
  const image = file?.path;
  try {
    const { title, description, tags, link, category } = req.body;
    const { id: projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) throw new CustomError('Project not found', 404);

    for (const [key, value] of Object.entries({ title, description, image, tags, link, category })) {
      if (key === 'image' && value) await deleteFileFromCloudinary(project[key]);
      if (value) project[key] = value;
    }

    await project.save();
    res.status(200).json({ success: true, message: 'Project updated successfully', project });
  } catch (error: unknown) {
    await deleteFileFromCloudinary(image);
    handleErrorResponse(error, res);
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) throw new CustomError('Project not found', 404);

    await Promise.all([deleteFileFromCloudinary(project.image), Project.deleteOne({ _id: projectId })]);
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};

export const deleteAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({});
    if (projects.length === 0) throw new CustomError('Projects already doesnt exist', 400);

    await Promise.all(projects.map((project) => deleteFileFromCloudinary(project.image)));
    await Project.deleteMany({});
    res.status(200).json({ success: true, message: 'All projects deleted successfully' });
  } catch (error: unknown) {
    handleErrorResponse(error, res);
  }
};
