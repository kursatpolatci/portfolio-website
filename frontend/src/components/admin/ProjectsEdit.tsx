import { Link } from "react-router-dom";
import { useAddProject, useDeleteProject, useEditProject, useGetProjects } from "../../hooks/ProjectHooks";
import { BACKEND_URL, dialogType, IProject, IProjects } from "../../lib/types/types";
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
  const [formData, setFormData] = useState<IProject>({
    title: "",
    description: "",
    img: "",
    tags: [],
    link: "",
    category: "",
  });

  const handleClickDialog = (type: dialogType, item?: IProject) => {
    if (type === "add") {
      setFormData({
        title: "",
        description: "",
        img: "",
        tags: [],
        link: "",
        category: "",
      });
    } else if (type === "edit") {
      if (item) {
        setFormData({
          title: item.title,
          description: item.description,
          img: "",
          tags: item.tags,
          link: item.link,
          category: item.category,
          _id: item._id,
        });
      }
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
      console.log(res);
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
    <div className="py-12">
      <button
        className="dark:bg-dark-secondary bg-gray-300 px-3 py-1 rounded-sm"
        onClick={() => {
          handleClickDialog("add");
        }}
      >
        Add Project
      </button>
      {isDialogOpen && (
        <dialog open className="rounded-lg p-6 bg-white shadow-lg min-w-80 text-center z-10">
          <IoMdCloseCircle color="red" size={24} className=" absolute right-3 top-3 cursor-pointer" onClick={() => {
            setIsDialogOpen(false)
          }}/>
          <h2 className="text-lg font-bold mb-4">{dialogType === "add" ? "Add Project" : "Edit Project"}</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmitDialog}>
            {/* Title */}
            <div className="flex gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => {
                  handleChangeDialog(e);
                }}
              />
            </div>
            {/* Description */}
            <div className="flex gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => {
                  handleChangeDialog(e);
                }}
              />
            </div>
            {/* Image */}
            <div className="flex gap-2">
              <label htmlFor="img" className="font-medium text-sm">
                Image:
              </label>
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
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <label htmlFor="tags" className="font-medium text-sm">
                  Tags:
                </label>
                <div className="pt-2 flex flex-row flex-wrap gap-1">
                  {formData.tags.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="dark:text-dark-tertiary dark:bg-dark-fifth text-light-tertiary bg-[#F4F5F5] inline-block p-1 rounded-xl"
                      >
                        <p className="text-[0.7rem]">{item}</p>
                        <IoClose color="red" className="cursor-pointer" onClick={() => {
                          setFormData({...formData, tags: formData.tags.filter(i => i != item)})
                        }}/>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="new tag"
                  className=" p-2 border border-gray-300 w-2/3"
                  ref={addTagRef}
                />
                <button
                  className="w-1/3 dark:bg-gray-300 p-2 rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    if (addTagRef.current) {
                      setFormData({ ...formData, tags: [...formData.tags, addTagRef.current.value] });
                      addTagRef.current.value = "";
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            {/* Link */}
            <div className="flex gap-2">
              <label htmlFor="link" className="font-medium text-sm">
                Link:
              </label>
              <input
                id="link"
                name="link"
                value={formData.link}
                className="w-full p-2 border border-gray-300"
                onChange={(e) => {
                  handleChangeDialog(e);
                }}
              />
            </div>
            {/* Category */}
            <div className="flex gap-2">
              <label htmlFor="category" className="font-medium text-sm">
                Category:
              </label>
              <input
                id="category"
                name="category"
                value={formData.category}
                className="w-full p-2 border border-gray-300"
                onChange={(e) => {
                  handleChangeDialog(e);
                }}
              />
            </div>
            <button className="dark:bg-blue-500 text-dark-secondary rounded p-2" type="submit">
              {dialogType === "add" ? "Add New" : "Apply Changes"}
            </button>
          </form>
        </dialog>
      )}
      <div className="py-4 flex flex-col gap-5">
        {data?.projects.map((group: IProjects, index: number) => {
          return (
            <div key={index}>
              <h1 className="text-light-secondary dark:text-dark-secondary font-semibold text-2xl">{group.category}</h1>
              <div className="flex flex-col gap-6 px-4 py-3">
                {group.projects.map((project: IProject, index) => {
                  return (
                    <div key={index} className="flex flex-row-reverse justify-end gap-12">
                      <div>
                        <p className="dark:text-dark-tertiary">{project.title}</p>
                        <p className="dark:text-dark-tertiary">{project.description}</p>
                        <Link to={project.link} className="dark:text-dark-tertiary underline">
                          {project.link}
                        </Link>
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
