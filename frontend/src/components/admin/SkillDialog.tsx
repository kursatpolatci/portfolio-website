import { IoMdCloseCircle } from 'react-icons/io';
import { dialogType } from '../../lib/types/definations';
import { datauri } from '../../lib/utils/datauri';
import { useAddSkill, useEditSkill } from '../../hooks/SkillHooks';
import { useState } from 'react';
import { ISkillFormData } from '../../lib/types/formdata';
import { errorMessage } from '../../lib/utils/error';

interface ISkillDialogProps {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDialogOpen: boolean;
  dialogType: dialogType;
  setFormData: React.Dispatch<React.SetStateAction<ISkillFormData>>;
  formData: ISkillFormData;
}

const SkillDialog: React.FC<ISkillDialogProps> = ({
  setIsDialogOpen,
  isDialogOpen,
  dialogType,
  setFormData,
  formData,
}) => {
  const { mutateAsync: addSkill, isPending: isAdding } = useAddSkill();
  const { mutateAsync: editSkill, isPending: isEditing } = useEditSkill();
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleChangeDialog = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { name, value, files, type, checked } = e.target;
      if (type === 'file') {
        if (files) {
          setFormData({ ...formData, image: files[0] });
          const uri = await datauri(files[0]);
          setImagePreview(uri);
        }
      } else if (type === 'checkbox') setFormData({ ...formData, [name]: checked });
      else setFormData({ ...formData, [name]: value });
    } catch (error: unknown) {
      errorMessage(error);
    }
  };
  const handleSubmitDialog = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const multiPartForm = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value != null) multiPartForm.append(key, value);
      });
      if (dialogType === 'add') await addSkill(multiPartForm);
      else if (dialogType === 'edit') await editSkill(multiPartForm);
      setIsDialogOpen((prev) => !prev);
      setImagePreview('');
    } catch (error: unknown) {
      errorMessage(error);
    }
  };
  return (
    <>
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
          <dialog open className="max-w-3xl w-full relative">
            <IoMdCloseCircle
              color="red"
              size={24}
              className=" absolute right-3 top-3 cursor-pointer"
              onClick={() => {
                setIsDialogOpen(false);
                setImagePreview('');
              }}
            />
            <h2>{dialogType === 'add' ? 'Add Skill' : 'Edit Skill'}</h2>
            <form onSubmit={handleSubmitDialog}>
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
              <div className="flex gap-2 items-center">
                <label htmlFor="image">Image:</label>
                <input type="file" id="image" name="image" onChange={handleChangeDialog} />
                {imagePreview && <img src={imagePreview} className="dialog-avatar" />}
              </div>
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
              <button disabled={isAdding || isEditing} className="update">
                {isAdding || isEditing ? 'Loading...' : dialogType === 'add' ? 'Add New' : 'Apply Changes'}
              </button>
            </form>
          </dialog>
        </div>
      )}
    </>
  );
};

export default SkillDialog;
