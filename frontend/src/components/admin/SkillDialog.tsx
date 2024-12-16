import { IoMdCloseCircle } from "react-icons/io";
import { dialogType, ISkillFormData, uploads } from "../../lib/types/types";
import { datauri } from "../../lib/utils/datauri";
import { useAddSkill, useEditSkill } from "../../hooks/SkillHooks";
import { useState } from "react";

interface ISkillDialogProps {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogType: dialogType;
  setFormData: React.Dispatch<React.SetStateAction<ISkillFormData>>;
  formData: ISkillFormData;
}

const SkillDialog: React.FC<ISkillDialogProps> = ({ setIsDialogOpen, dialogType, setFormData, formData }) => {
  const { mutateAsync: addSkill } = useAddSkill();
  const { mutateAsync: editSkill } = useEditSkill();
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleChangeDialog = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { name, value, files, type, checked } = e.target;

      if (type === "file") {
        if (files) {
          const uri = await datauri(files[0]);
          setFormData({ ...formData, [name]: uri });
          setImagePreview(uri);
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
            {(imagePreview || formData.img) && (
              <img src={imagePreview || `${uploads}/${formData.img}`} className="skill" />
            )}
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
    </div>
  );
};

export default SkillDialog;
