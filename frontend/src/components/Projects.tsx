import { FaGithub, FaLink } from "react-icons/fa";
import { useGetProjects } from "../hooks/ProjectHooks";
import { BACKEND_URL, IProjects, IProject } from "../utils/Definations";
import { Link } from "react-router-dom";

const Projects = () => {
  const { data, isLoading, isError } = useGetProjects();

  const projects: IProjects[] = data?.projects;
  if (isError || projects?.length === 0 || !projects) return <></>;
  if (isLoading) return <></>;
  return (
    <div className="w-full py-12 flex flex-col gap-12">
      {projects?.map((group, index) => {
        return (
          <div key={index} className="">
            <h1 className="text-light-secondary dark:text-dark-secondary font-semibold text-2xl">
              {group.category}
            </h1>
            <div className="flex flex-row gap-12 pt-4">
              {group?.projects.map((project: IProject, index: number) => {
                return (
                  <Link to={project.link}>
                    <div
                      className="flex flex-col max-w-[23rem] cursor-pointer dark:hover:bg-[#18181a] hover:bg-[#fafafa] rounded-t-xl rounded-b-xl overflow-hidden transition-colors duration-300"
                      key={index}
                    >
                      <div>
                        <img
                          src={`${BACKEND_URL}/uploads/${project.img}`}
                          className="w-full h-auto"
                        ></img>
                      </div>
                      <div className="p-4">
                        <h1 className="dark:text-dark-secondary text-light-secondary text-xl">
                          {project.title}
                        </h1>
                        <p className="dark:text-dark-quaternary text-light-quaternary text-[0.8rem] pt-1">
                          {project.description}
                        </p>
                        <div className="pt-2 flex flex-row flex-wrap gap-1">
                          {project.tags?.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="dark:text-dark-tertiary dark:bg-dark-fifth text-light-tertiary bg-[#F4F5F5] inline-block p-1 rounded-xl"
                              >
                                <p className="text-[0.7rem]">{item}</p>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex gap-2 pt-4">
                          <FaGithub className="dark:text-dark-fifth text-light-fifth   size-5" />
                          <FaLink className="dark:text-dark-fifth text-light-fifth  size-5" />
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
  );
};

export default Projects;
