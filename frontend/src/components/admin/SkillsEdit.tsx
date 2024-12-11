import { useState } from "react";
import { useAddSkill, useDeleteSkill, useEditSkill, useGetSkills } from "../../hooks/SkillHooks";
import { BACKEND_URL, dialogType, ISkill } from "../../lib/types/types";
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
  const [formData, setFormData] = useState<ISkill>({
    name: "",
    img: "",
    colorInvert: false,
    _id: "",
  });

  const handleClickDialog = (type: dialogType, item?: ISkill) => {
    if (type === "add")
      setFormData({
        name: "",
        img: "",
        colorInvert: false,
      });
    else if (type === "edit") {
      if (item)
        setFormData({
          name: item.name,
          img: "",
          colorInvert: item.colorInvert,
          _id: item._id,
        });
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
      console.log(res);
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
    <div className="py-12">
      <div className="flex justify-between">
        <h1 className="dark:text-dark-secondary text-2xl">Skills</h1>
        <button
          className="dark:bg-dark-secondary bg-gray-300 px-3  rounded-sm"
          onClick={() => {
            handleClickDialog("add");
          }}
        >
          Add Skill
        </button>
      </div>
      <div className="flex flex-col gap-4 py-4">
        {data?.skills?.map((item: ISkill, index: number) => {
          return (
            <div key={index} className="border-dark-fifth flex flex-row p-3 items-center justify-start gap-4 relative">
              <div>
                <img
                  src={`${BACKEND_URL}/uploads/${item.img}`}
                  alt={`photo`}
                  className={`w-12 h-12 object-contain ${item.colorInvert ? "dark:invert" : ""}`}
                />
              </div>
              <div>
                <p className="text-light-secondary dark:text-dark-tertiary">{item.name}</p>
              </div>
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
          <dialog open className="rounded-lg p-6 bg-white shadow-lg w-80 text-center">
            <IoMdCloseCircle
              color="red"
              size={24}
              className=" absolute right-3 top-3 cursor-pointer"
              onClick={() => {
                setIsDialogOpen(false);
              }}
            />
            <h2 className="text-lg font-bold mb-4">{dialogType === "add" ? "Add Skill" : "Edit Skill"}</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmitDialog}>
              {/* Skill Name */}
              <div className="flex">
                <label htmlFor="name" className="mr-2 text-sm font-medium">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChangeDialog}
                />
              </div>
              {/* Skill Image */}
              <div className="flex">
                <label htmlFor="img" className="mr-2 text-sm font-medium">
                  Image:
                </label>
                <input type="file" id="img" name="img" className="w-full p-2" onChange={handleChangeDialog} />
              </div>
              {/* Color Invert */}
              <div className="flex items-center">
                <label htmlFor="colorInvert" className="mr-2 text-sm font-medium">
                  Color Invert:
                </label>
                <input
                  type="checkbox"
                  id="colorInvert"
                  name="colorInvert"
                  checked={formData.colorInvert}
                  onChange={handleChangeDialog}
                />
              </div>
              {/* Submit Button */}
              <button className="dark:bg-blue-500 text-dark-secondary rounded p-2" type="submit">
                {dialogType === "add" ? "Add New" : "Apply Changes"}
              </button>
            </form>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default SkillsEdit;
