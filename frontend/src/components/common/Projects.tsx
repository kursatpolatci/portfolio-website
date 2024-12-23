import { FaGithub, FaLink } from 'react-icons/fa';
import { useGetProjects } from '../../hooks/ProjectHooks';
import { ProjectsSkeleton } from '../skeletons';
import { IProject } from '../../lib/types/response';

const ProjectCard = ({ project }: { project: IProject }) => {
  return (
    <a
      href={project.link}
      key={project.title}
      rel="noreferrer noopener"
      className="flex flex-col cursor-pointer dark:hover:bg-[#18181a] hover:bg-[#fafafa] rounded-lg overflow-hidden transition-colors duration-300"
    >
      <img src={project.image} alt="project" className="project-avatar" />
      <div className="flex flex-col gap-1 p-4">
        <h1 className="text-xl max-md:text-lg">{project.title}</h1>
        <p className="dark:text-dark-quaternary text-light-quaternary text-[0.8rem]">{project.description}</p>
        <div className="flex flex-row flex-wrap gap-1">
          {project.tags?.map((item) => {
            return (
              <div key={item} className="project-tag">
                {item}
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 pt-2 px-1">
          <FaGithub className="project-icon" />
          <FaLink className="project-icon" />
        </div>
      </div>
    </a>
  );
};

const Projects = () => {
  const { data, isLoading } = useGetProjects();

  if (isLoading) return <ProjectsSkeleton count={4} />;
  return (
    <div className="flex flex-col gap-3">
      {data?.projects.map((group) => {
        return (
          <div key={group.category}>
            <h1>{group.category}</h1>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-12 max-md:gap-8 p-4">
              {group.projects.map((project) => {
                return <ProjectCard project={project} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
