import { useState } from "react";
import { useDeleteSkill, useEditSkill, useGetSkills } from "../../hooks/SkillHooks";
import { BACKEND_URL, ISkill } from "../../utils/types";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { datauri } from "../../utils/datauri";

const SkillsEdit = () => {
  const { data } = useGetSkills();
  const { mutateAsync: deleteSkill } = useDeleteSkill();
  const { mutateAsync: editSkill} = useEditSkill()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    img: "",
    colorInvert: false,
    _id: ""
  });

  const handleClickEdit = (item: ISkill) => {
    setFormData({
      name: item.name,
      img: "",
      colorInvert: item.colorInvert,
      _id: item._id
    });
    setIsEditDialogOpen((prev) => !prev);
  };
  const handleChangeEdit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { name, value, type, files, checked } = e.target;

      if (type === "file") {
        if (files) {
          const uri = await datauri(files[0]);
          setFormData({ ...formData, [name]: uri });
        }
      } else if (type === "checkbox") setFormData({ ...formData, [name]: checked });
      else setFormData({ ...formData, [name]: value });
    } catch (error) {
      console.error(`Error in handleChangeEdit: `, error);
    }
  };
  const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await editSkill(formData)
      setIsEditDialogOpen((prev) => !prev)
      console.log(res)
    } catch (error: unknown) {
      console.error(`Error in handleEditSubmit: `, error);
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
  console.log(formData)
  return (
    <div className="py-12">
      <div className="flex justify-between">
        <h1 className="dark:text-dark-secondary text-2xl">Skills</h1>
        <button className="dark:bg-dark-secondary bg-gray-300 px-3  rounded-sm">Add Skill</button>
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
                    handleClickEdit(item);
                  }}
                />
                <MdDelete
                  className="text-red-500 cursor-pointer"
                  size={24}
                  onClick={() => {
                    handleDeleteSkill(item._id);
                  }}
                />
              </div>
            </div>
          );
        })}
        {isEditDialogOpen && (
          <dialog open className="rounded-lg p-6 bg-white shadow-lg w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Edit Skill</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmitEdit}>
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
                  onChange={handleChangeEdit}
                />
              </div>
              {/* Skill Image */}
              <div className="flex">
                <label htmlFor="img" className="mr-2 text-sm font-medium">
                  Image:
                </label>
                <input type="file" id="img" name="img" className="w-full p-2" onChange={handleChangeEdit} />
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
                  onChange={handleChangeEdit}
                />
              </div>
              {/* Submit Button */}
              <button className="dark:bg-dark-tertiary rounded p-2" type="submit">
                Update Skill
              </button>
            </form>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default SkillsEdit;
