import { Link } from "react-router-dom";
import { useAddProject, useDeleteProject, useEditProject, useGetProjects } from "../../hooks/ProjectHooks";
import { BACKEND_URL, dialogType, IProjectFormData, IProjects } from "../../lib/types/types";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useRef, useState } from "react";
import { datauri } from "../../lib/utils/datauri";
import { IoClose } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

const ProjectsEdit = () => {
  const { data } = useGetProjects();
  const { mutateAsync: deleteProject } = useDeleteProject();
  const { mutateAsync: editProject } = useEditProject();
  const { mutateAsync: addProject } = useAddProject();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<dialogType>("add");
  const addTagRef = useRef<HTMLInputElement>(null);
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
    if (type === "add") {
      setFormData({
        _id: "",
        title: "",
        description: "",
        img: "",
        tags: [],
        link: "",
        category: "",
      });
    } else if (type === "edit") {
      if (item) setFormData({ ...item, img: "" });
    }
    setDialogType(type);
    setIsDialogOpen((prev) => !prev);
  };
  const handleChangeDialog = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    try {
      const { name, value, type } = e.target;
      if (type === "file" && e.target instanceof HTMLInputElement && e.target.files) {
        const uri = await datauri(e.target.files[0]);
        setFormData({ ...formData, [name]: uri });
      } else if (type === "textarea" || type === "text") {
        setFormData({ ...formData, [name]: value });
      }
    } catch (error) {
      console.error(`Error in handleChangeDialog: `, error);
    }
  };
  const handleSubmitDialog = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = dialogType === "add" ? await addProject(formData) : await editProject(formData);
      console.log(`Result of handleSubmitDialog: `, res);
      setIsDialogOpen((prev) => !prev);
    } catch (error) {
      console.error(`Error in handleSubmitDialog: `, error);
    }
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
    <div className="max-md:px-6">
      <h1 className="pb-3">Projects</h1>
      <button
        onClick={() => {
          handleClickDialog("add");
        }}
      >
        Add Project
      </button>
      <div className="flex flex-col gap-6 py-6">
        {data?.projects.map((group: IProjects, index: number) => {
          return (
            <div key={index} className="p-4">
              <h1>{group.category}</h1>
              <div className="flex flex-col gap-6 px-4 py-3">
                {group.projects.map((project: IProjectFormData, index) => {
                  return (
                    <div
                      key={index}
                      className="flex max-md:flex-col items-center max-md:items-start gap-12 max-md:gap-3"
                    >
                      <div className="flex max-md:flex-col w-1/3 max-md:w-full gap-2 ">
                        <img
                          src={`${BACKEND_URL}/uploads/${project.img}`}
                          className="w-full h-auto max-md:h-auto rounded-md"
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
                      <div className="flex flex-col w-2/3 max-md:w-full max-md:items-center gap-1 max-md:gap-1 overflow-hidden">
                        <p>{project.title}</p>
                        <p>{project.description}</p>
                        <Link to={project.link}>
                          <span className="link">{project.link}</span>
                        </Link>
                        <div className="flex flex-row flex-wrap gap-1 py-1">
                          {project.tags?.map((item, index) => {
                            return (
                              <div key={index} className="tag">
                                <p className="text-[0.7rem]">{item}</p>
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
          <dialog open>
            <IoMdCloseCircle
              color="red"
              size={24}
              className=" absolute right-3 top-3 cursor-pointer"
              onClick={() => {
                setIsDialogOpen(false);
              }}
            />
            <h2>{dialogType === "add" ? "Add Project" : "Edit Project"}</h2>
            <form onSubmit={handleSubmitDialog}>
              {/* Title */}
              <div className="flex gap-2 items-center">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => {
                    handleChangeDialog(e);
                  }}
                />
              </div>
              {/* Description */}
              <div className="flex gap-2 items-center">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => {
                    handleChangeDialog(e);
                  }}
                />
              </div>
              {/* Image */}
              <div className="flex gap-2 items-center">
                <label htmlFor="img">Image:</label>
                <input
                  type="file"
                  id="img"
                  name="img"
                  className="w-full"
                  onChange={(e) => {
                    handleChangeDialog(e);
                  }}
                />
              </div>
              {/* Tags */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <label htmlFor="tags">Tags:</label>
                  <div className=" flex flex-row flex-wrap gap-1 overflow-hidden">
                    {formData.tags.map((item, index) => {
                      return (
                        <div key={index} className="dark:bg-dark-tertiary bg-[#F4F5F5] px-1 rounded-sm overflow-hidden">
                          <p className="text-[0.7rem] text-ellipsis overflow-hidden dark:text-dark-primary text-light-secondary">
                            {item}
                          </p>
                          <IoClose
                            color="red"
                            className="cursor-pointer"
                            onClick={() => {
                              setFormData({ ...formData, tags: formData.tags.filter((i) => i != item) });
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <input type="text" id="tags" name="tags" placeholder="new tag" ref={addTagRef} />
                  <button
                    className="w-1/3 dark:bg-gray-300 p-2 rounded"
                    type="button"
                    onClick={() => {
                      if (addTagRef.current && addTagRef.current.value) {
                        setFormData({ ...formData, tags: [...formData.tags, addTagRef.current.value] });
                        addTagRef.current.value = "";
                      }
                    }}
                  >
                    Add Tag
                  </button>
                </div>
              </div>
              {/* Link */}
              <div className="flex gap-2 items-center">
                <label htmlFor="link">Link:</label>
                <input
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={(e) => {
                    handleChangeDialog(e);
                  }}
                />
              </div>
              {/* Category */}
              <div className="flex gap-2 items-center">
                <label htmlFor="category">Category:</label>
                <input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={(e) => {
                    handleChangeDialog(e);
                  }}
                />
              </div>
              {/* Submit Button */}
              <button className="update">{dialogType === "add" ? "Add New" : "Apply Changes"}</button>
            </form>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default ProjectsEdit;
