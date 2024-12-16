import { FaGithub, FaLink } from "react-icons/fa";
import { useGetProjects } from "../../hooks/ProjectHooks";
import { Link } from "react-router-dom";
import { IProjectFormData, IProjects, uploads } from "../../lib/types/types";
import ProjectsSkeleton from "../skeletons/ProjectsSkeleton";

const Projects = () => {
  const { data, isLoading } = useGetProjects();

  return (
    <div>
      <h1>Projects</h1>
      <div className="flex flex-col gap-6 p-4">
        {isLoading && <ProjectsSkeleton count={4} />}
        {/* Group Projects */}
        {!isLoading &&
          data?.projects?.map((group: IProjects, index: number) => {
            return (
              <div key={index}>
                <h1>{group.category}</h1>
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-12 max-md:gap-8 p-4">
                  {/* Each Project */}
                  {group?.projects?.map((project: IProjectFormData, index) => {
                    return (
                      <Link to={project.link} key={index}>
                        <div className="flex flex-col  cursor-pointer dark:hover:bg-[#18181a] hover:bg-[#fafafa] rounded-lg overflow-hidden transition-colors duration-300">
                          <img
                            src={`${uploads}/${project.img}`}
                            className="w-full aspect-video object-cover"
                            alt="project"
                          />
                          <div className="flex flex-col gap-1 p-4">
                            <h1 className="text-xl max-md:text-lg">{project.title}</h1>
                            <p className="dark:text-dark-quaternary text-light-quaternary text-[0.8rem]">
                              {project.description}
                            </p>
                            <div className="flex flex-row flex-wrap gap-1">
                              {project.tags?.map((item, index) => {
                                return (
                                  <div key={index} className="tag">
                                    <p className="text-xs">{item}</p>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex gap-2 pt-2 px-1">
                              <FaGithub className="dark:text-dark-fifth text-light-fifth size-5" />
                              <FaLink className="dark:text-dark-fifth text-light-fifth size-5" />
                            </div>
                          </div>
                        </div>
                      </Link>
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

export default Projects;
