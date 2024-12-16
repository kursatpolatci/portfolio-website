import { Link } from "react-router-dom";
import { useDeleteProject, useGetProjects } from "../../hooks/ProjectHooks";
import { dialogType, IProjectFormData, IProjects, uploads } from "../../lib/types/types";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useState } from "react";
import ProjectDialog from "./ProjectDialog";
import ProjectsEditSkeleton from "../skeletons/ProjectsEditSkeleton";

const ProjectsEdit = () => {
  const { data, isLoading } = useGetProjects();
  const { mutateAsync: deleteProject } = useDeleteProject();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<dialogType>("add");
  const [formData, setFormData] = useState<IProjectFormData>({
    _id: "",
    title: "",
    description: "",
    img: "",
    tags: [],
    link: "",
    category: "",
  });

  const handleClickDialog = (type: dialogType, item?: IProjectFormData) => {
    if (type === "add") setFormData({ _id: "", title: "", description: "", img: "", tags: [], link: "", category: "" });
    else if (type === "edit" && item) setFormData({ ...item, img: "" });
    setDialogType(type);
    setIsDialogOpen((prev) => !prev);
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const res = await deleteProject(id);
      console.log(`Result of handleDeleteProject: `, res);
    } catch (error) {
      console.error(`Error in handleDeleteProject: `, error);
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1>Projects</h1>
        <button
          onClick={() => {
            handleClickDialog("add");
          }}
          className="w-[20%] max-md:w-[35%]"
        >
          Add Project
        </button>
      </div>
      <div className="flex flex-col gap-6 p-4">
        {isLoading && <ProjectsEditSkeleton count={6} />}
        {!isLoading &&
          data?.projects.map((group: IProjects, index: number) => {
            return (
              <div key={index}>
                <h1>{group.category}</h1>
                <div className="flex flex-col gap-6 p-4 max-md:gap-16">
                  {group.projects.map((project: IProjectFormData, index) => {
                    return (
                      <div key={index} className="flex max-md:flex-col items-center gap-12 max-md:gap-3">
                        <div className="flex max-md:flex-col w-1/3 max-md:w-full gap-2">
                          <img
                            src={`${uploads}/${project.img}`}
                            className="w-full aspect-video object-cover max-md:h-auto rounded-md"
                          />
                          <div className="flex flex-col max-md:flex-row items-center justify-center gap-2">
                            <MdModeEdit
                              className="text-blue-500 cursor-pointer"
                              size={24}
                              onClick={() => {
                                handleClickDialog("edit", project);
                              }}
                            />
                            <MdDelete
                              className="text-red-500 cursor-pointer"
                              size={24}
                              onClick={() => {
                                handleDeleteProject(project._id!);
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col w-2/3 max-md:w-full gap-1 max-md:gap-2">
                          <p>{project.title}</p>
                          <p className="truncate">{project.description}</p>
                          <Link to={project.link}>
                            <p className="link truncate">{project.link}</p>
                          </Link>
                          <div className="flex flex-row gap-1">
                            {project.tags.map((item, index) => {
                              return (
                                <div key={index} className="tag">
                                  {item}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        {isDialogOpen && (
          <ProjectDialog
            setIsDialogOpen={setIsDialogOpen}
            formData={formData}
            setFormData={setFormData}
            dialogType={dialogType}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsEdit;
