import { FaGithub, FaLink } from "react-icons/fa";
import { useGetProjects } from "../../hooks/ProjectHooks";
import { Link } from "react-router-dom";
import { BACKEND_URL, IProjectFormData, IProjects } from "../../lib/types/types";

const Projects = () => {
  const { data, isLoading } = useGetProjects();
  if (isLoading) return <></>;
  return (
    <div className="max-md:px-6">
      <div className="flex flex-col gap-6">
        {data?.projects.map((group: IProjects, index: number) => {
          return (
            <div key={index}>
              <h1>{group.category}</h1>
              <div className="grid grid-cols-2 max-xs:grid-cols-1 gap-12 max-md:gap-8 p-4">
                {group?.projects.map((project: IProjectFormData, index) => {
                  return (
                    <Link to={project.link} key={index}>
                      <div className="flex flex-col  cursor-pointer dark:hover:bg-[#18181a] hover:bg-[#fafafa] rounded-t-xl rounded-b-xl overflow-hidden transition-colors duration-300">
                        <img
                          src={`${BACKEND_URL}/uploads/${project.img}`}
                          className="w-full h-auto"
                          alt="project_image"
                        />
                        <div className="p-4 flex flex-col gap-1">
                          <h1 className="text-xl max-md:text-lg">{project.title}</h1>
                          <p className="dark:text-dark-quaternary text-light-quaternary text-[0.8rem]">
                            {project.description}
                          </p>
                          <div className="flex flex-row flex-wrap gap-1">
                            {project.tags?.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className="dark:text-dark-tertiary dark:bg-dark-fifth text-light-tertiary bg-[#F4F5F5] inline-block px-[0.30rem] py-[0.15rem] rounded-xl"
                                >
                                  <p className="text-xs">{item}</p>
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex gap-2 pt-2">
                            <FaGithub className="icon" />
                            <FaLink className="icon" />
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
