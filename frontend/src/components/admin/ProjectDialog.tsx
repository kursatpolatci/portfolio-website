import { IoMdCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { dialogType, IProjectFormData } from "../../lib/types/types";
import { datauri } from "../../lib/utils/datauri";
import { useAddProject, useEditProject } from "../../hooks/ProjectHooks";
import { useRef } from "react";

interface IProjectDialogProps {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogType: dialogType;
  setFormData: React.Dispatch<React.SetStateAction<IProjectFormData>>;
  formData: IProjectFormData;
}

const ProjectDialog: React.FC<IProjectDialogProps> = ({ setIsDialogOpen, dialogType, setFormData, formData }) => {
  const { mutateAsync: editProject } = useEditProject();
  const { mutateAsync: addProject } = useAddProject();
  const addTagRef = useRef<HTMLInputElement>(null);

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
  return (
    <div className="top-0 left-0 h-screen absolute flex items-center justify-center">
      <dialog open className="max-w-3xl w-full fixed">
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
    </div>
  );
};

export default ProjectDialog;
