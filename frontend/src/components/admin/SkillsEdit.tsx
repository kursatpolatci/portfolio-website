import { useState } from "react";
import { useAddSkill, useDeleteSkill, useEditSkill, useGetSkills } from "../../hooks/SkillHooks";
import { BACKEND_URL, dialogType, ISkillFormData } from "../../lib/types/types";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { datauri } from "../../lib/utils/datauri";
import { IoMdCloseCircle } from "react-icons/io";

const SkillsEdit = () => {
  const { data } = useGetSkills();
  const { mutateAsync: deleteSkill } = useDeleteSkill();
  const { mutateAsync: editSkill } = useEditSkill();
  const { mutateAsync: addSkill } = useAddSkill();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<dialogType>("add");
  const [formData, setFormData] = useState<ISkillFormData>({
    _id: "",
    name: "",
    img: "",
    colorInvert: false,
  });

  const handleClickDialog = (type: dialogType, item?: ISkillFormData) => {
    if (type === "add")
      setFormData({
        _id: "",
        name: "",
        img: "",
        colorInvert: false,
      });
    else if (type === "edit") {
      if (item) setFormData({ ...item, img: "" });
    }
    setDialogType(type);
    setIsDialogOpen((prev) => !prev);
  };
  const handleChangeDialog = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { name, value, files, type, checked } = e.target;

      if (type === "file") {
        if (files) {
          const uri = await datauri(files[0]);
          setFormData({ ...formData, [name]: uri });
        }
      } else if (type === "checkbox") setFormData({ ...formData, [name]: checked });
      else setFormData({ ...formData, [name]: value });
    } catch (error: unknown) {
      console.error(`Error in handleChangeDialog: `, error);
    }
  };
  const handleSubmitDialog = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = dialogType === "add" ? await addSkill(formData) : await editSkill(formData);
      console.log(`Result of handleSubmitDialog: `, res);
      setIsDialogOpen((prev) => !prev);
    } catch (error: unknown) {
      console.error(`Error in handleSubmitDialog: `, error);
    }
  };
  const handleDeleteSkill = async (id: string) => {
    try {
      const res = await deleteSkill(id);
      console.log(`Result of handleDeleteSkill: `, res);
    } catch (error: unknown) {
      console.error(`Error in handleDeleteSkill: `, error);
    }
  };
  return (
    <div className="max-md:px-6">
      <h1 className="pb-3">Skills</h1>
      <button
        onClick={() => {
          handleClickDialog("add");
        }}
      >
        Add Skill
      </button>
      <div className="flex flex-col gap-4 py-6 p-4">
        {data?.skills?.map((item: ISkillFormData, index: number) => {
          return (
            <div key={index} className="flex flex-row p-3 items-center justify-start gap-4 relative">
              <img
                src={`${BACKEND_URL}/uploads/${item.img}`}
                alt={`photo`}
                className={`w-12 max-md:w-11 object-contain ${item.colorInvert ? "dark:invert" : ""}`}
              />
              <p>{item.name}</p>
              <div className="flex flex-col justify-between absolute top-0 right-0 h-full py-2">
                <MdModeEdit
                  className="text-blue-500 cursor-pointer"
                  size={24}
                  onClick={() => {
                    handleClickDialog("edit", item);
                  }}
                />
                <MdDelete
                  className="text-red-500 cursor-pointer"
                  size={24}
                  onClick={() => {
                    handleDeleteSkill(item._id!);
                  }}
                />
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
            <h2>{dialogType === "add" ? "Add Skill" : "Edit Skill"}</h2>
            <form onSubmit={handleSubmitDialog}>
              {/* Skill Name */}
              <div className="flex gap-2 items-center">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Skill name"
                  value={formData.name}
                  onChange={handleChangeDialog}
                />
              </div>
              {/* Skill Image */}
              <div className="flex gap-2 items-center">
                <label htmlFor="img">Image:</label>
                <input type="file" id="img" name="img" onChange={handleChangeDialog} />
              </div>
              {/* Color Invert */}
              <div className="flex gap-2 items-center">
                <label htmlFor="colorInvert">Color Invert:</label>
                <input
                  type="checkbox"
                  id="colorInvert"
                  name="colorInvert"
                  checked={formData.colorInvert}
                  onChange={handleChangeDialog}
                  className="w-auto"
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

export default SkillsEdit;
