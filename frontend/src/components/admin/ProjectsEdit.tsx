import { useDeleteAllProjects, useDeleteProject, useGetProjects } from '../../hooks/ProjectHooks';
import { dialogType } from '../../lib/types/definations';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { useState } from 'react';
import { IProjectFormData } from '../../lib/types/formdata';
import { errorMessage } from '../../lib/utils/error';
import { ProjectsEditSkeleton } from '../skeletons';
import { IProject } from '../../lib/types/response';
import ProjectDialog from './ProjectDialog';

interface ProjectCardProps {
  project: IProject;
  handleClickDialog: (type: dialogType, item?: IProject) => void;
  handleDeleteProject: (id: string) => Promise<void>;
}
const ProjectCard = ({ project, handleClickDialog, handleDeleteProject }: ProjectCardProps) => {
  return (
    <div className="flex max-md:flex-col items-center gap-12 max-md:gap-3">
      <div className="flex max-md:flex-col w-1/3 max-md:w-full gap-2">
        <img src={project.image} className="w-full aspect-video object-cover max-md:h-auto rounded-md" />
        <div className="flex flex-col max-md:flex-row items-center justify-center gap-2">
          <MdModeEdit
            className="text-blue-500 cursor-pointer"
            size={24}
            onClick={() => handleClickDialog('edit', project)}
          />
          <MdDelete
            className="text-red-500 cursor-pointer"
            size={24}
            onClick={() => handleDeleteProject(project._id)}
          />
        </div>
      </div>
      <div className="flex flex-col w-2/3 max-md:w-full gap-1 max-md:gap-2">
        <p>{project.title}</p>
        <p className="truncate">{project.description}</p>
        <a href={project.link} rel="noreferrer noopener" className="link truncate">
          {project.link}
        </a>
        <div className="flex flex-row flex-wrap gap-12">
          {project.tags.map((item) => {
            return (
              <div key={item} className="project-tag">
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
const ProjectsEdit = () => {
  const { data, isLoading } = useGetProjects();
  const { mutateAsync: deleteProject } = useDeleteProject();
  const { mutateAsync: deleteAllProjects } = useDeleteAllProjects();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<dialogType>('add');
  const [formData, setFormData] = useState<IProjectFormData>({
    _id: '',
    title: '',
    description: '',
    image: null,
    tags: [],
    link: '',
    category: '',
  });
  const handleClickDialog = (type: dialogType, item?: IProject) => {
    if (type === 'add')
      setFormData({ _id: '', title: '', description: '', image: null, tags: [], link: '', category: '' });
    else if (type === 'edit' && item) setFormData({ ...item, image: null });
    setDialogType(type);
    setIsDialogOpen((prev) => !prev);
  };
  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject(id);
    } catch (error: unknown) {
      errorMessage(error);
    }
  };
  const handleDeleteAll = async () => {
    try {
      await deleteAllProjects();
    } catch (error: unknown) {
      errorMessage(error);
    }
  };
  if (isLoading) return <ProjectsEditSkeleton count={3} />;
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1>Projects</h1>
        <div className="flex gap-3">
          <button onClick={() => handleClickDialog('add')} className="w-4/5">
            Add Project
          </button>
          <ProjectDialog
            setIsDialogOpen={setIsDialogOpen}
            isDialogOpen={isDialogOpen}
            formData={formData}
            setFormData={setFormData}
            dialogType={dialogType}
          />
          <button className="w-1/5 delete" onClick={handleDeleteAll}>
            Delete All
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-4">
        {data?.projects.map((group) => {
          return (
            <div key={group.category}>
              <h1>{group.category}</h1>
              <div className="flex flex-col gap-6 p-4 max-md:gap-16">
                {group.projects.map((project) => {
                  return (
                    <ProjectCard
                      project={project}
                      handleClickDialog={handleClickDialog}
                      handleDeleteProject={handleDeleteProject}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsEdit;
