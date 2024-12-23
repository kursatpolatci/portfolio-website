import { IoMdCloseCircle } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { dialogType } from '../../lib/types/definations';
import { datauri } from '../../lib/utils/datauri';
import { useAddProject, useEditProject } from '../../hooks/ProjectHooks';
import { useRef, useState } from 'react';
import { IProjectFormData } from '../../lib/types/formdata';
import { errorMessage } from '../../lib/utils/error';

interface IProjectDialogProps {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDialogOpen: boolean;
  dialogType: dialogType;
  setFormData: React.Dispatch<React.SetStateAction<IProjectFormData>>;
  formData: IProjectFormData;
}

const ProjectDialog: React.FC<IProjectDialogProps> = ({
  setIsDialogOpen,
  isDialogOpen,
  dialogType,
  setFormData,
  formData,
}) => {
  const { mutateAsync: editProject, isPending: isEditing } = useEditProject();
  const { mutateAsync: addProject, isPending: isAdding } = useAddProject();
  const [imagePreview, setImagePreview] = useState('');
  const addTagRef = useRef<HTMLInputElement>(null);

  const handleChangeDialog = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    try {
      const { name, value, type } = e.target;
      if (type === 'file' && e.target instanceof HTMLInputElement && e.target.files) {
        setFormData({ ...formData, image: e.target.files[0] });
        const uri = await datauri(e.target.files[0]);
        setImagePreview(uri);
      } else if (type === 'textarea' || type === 'text') {
        setFormData({ ...formData, [name]: value });
      }
    } catch (error: unknown) {
      errorMessage(error);
    }
  };
  const handleSubmitDialog = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const multiPartForm = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value != undefined) multiPartForm.append(key, value);
      });
      if (dialogType === 'add') await addProject(multiPartForm);
      else if (dialogType === 'edit') await editProject(multiPartForm);
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
            <h2>{dialogType === 'add' ? 'Add Project' : 'Edit Project'}</h2>
            <form onSubmit={handleSubmitDialog}>
              <div className="flex gap-2 items-center">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => handleChangeDialog(e)}
                />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleChangeDialog(e)}
                />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="image">Image:</label>
                <input type="file" id="image" name="image" className="w-full" onChange={(e) => handleChangeDialog(e)} />
                {imagePreview && <img src={imagePreview} className="dialog-avatar" />}
              </div>
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
                            onClick={() => setFormData({ ...formData, tags: formData.tags.filter((i) => i != item) })}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <input type="text" id="tags" name="tags" ref={addTagRef} />
                  <button
                    className="w-1/3 dark:bg-gray-300"
                    type="button"
                    onClick={() => {
                      if (addTagRef.current && addTagRef.current.value) {
                        setFormData({ ...formData, tags: [...formData.tags, addTagRef.current.value] });
                        addTagRef.current.value = '';
                      }
                    }}
                  >
                    Add Tag
                  </button>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="link">Link:</label>
                <input id="link" name="link" value={formData.link} onChange={(e) => handleChangeDialog(e)} />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="category">Category:</label>
                <input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={(e) => handleChangeDialog(e)}
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

export default ProjectDialog;
