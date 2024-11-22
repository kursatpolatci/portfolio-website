import { Link } from "react-router-dom";
import { useGetProjects } from "../../hooks/ProjectHooks";
import { BACKEND_URL, IGroup } from "../../utils/types";
import { MdDelete, MdModeEdit } from "react-icons/md";

const ProjectsEdit = () => {
  const { data } = useGetProjects();
  return (
    <div className="py-12">
      <button className="dark:bg-dark-tertiary bg-gray-300 px-3 py-1  rounded-sm">Add Project</button>

      <div className="py-4 flex flex-col gap-5">
        {data?.projects.map((group: IGroup, index: number) => {
          return (
            <div key={index}>
              <h1 className="text-light-secondary dark:text-dark-secondary font-semibold text-2xl">{group.category}</h1>
              <div className="flex flex-col gap-6 px-4 py-3">
                {group.projects.map((project, index) => {
                  return (
                    <div key={index} className="flex flex-row-reverse justify-between">
                      <div>
                        <p className="dark:text-dark-tertiary">{project.title}</p>
                        <p className="dark:text-dark-tertiary">{project.description}</p>
                        <Link to={project.link} className="dark:text-dark-tertiary underline">
                          {project.link}
                        </Link>
                        <p className="dark:text-dark-tertiary">{project.category}</p>
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
                      </div>
                      <div className="flex gap-5">
                        <img src={`${BACKEND_URL}/uploads/${project.img}`} className="w-64 rounded-md" />
                        <div className="flex flex-col items-center justify-center gap-4">
                          <MdModeEdit className="text-blue-500 cursor-pointer" size={24} />
                          <MdDelete className="text-red-500 cursor-pointer" size={24} />
                        </div>
                      </div>
                    </div>
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
