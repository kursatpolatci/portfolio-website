import { useState } from 'react';
import { useDeleteAllSkills, useDeleteSkill, useGetSkills } from '../../hooks/SkillHooks';
import { dialogType } from '../../lib/types/definations';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { ISkillFormData } from '../../lib/types/formdata';
import { errorMessage } from '../../lib/utils/error';
import { SkillsEditSkeleton } from '../skeletons';
import { SkillDialog } from './index';
import { ISkill } from '../../lib/types/response';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const SkillsEdit = () => {
  const { data, isLoading } = useGetSkills();
  const { mutateAsync: deleteSkill, isPending: isDeleting } = useDeleteSkill();
  const { mutateAsync: deleteAllSkills, isPending: isDeletingAll } = useDeleteAllSkills();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<dialogType>('add');
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState<ISkillFormData>({ _id: '', name: '', image: null, colorInvert: false });

  const handleClickDialog = (type: dialogType, item?: ISkill) => {
    if (type === 'add') setFormData({ _id: '', name: '', image: null, colorInvert: false });
    else if (type === 'edit' && item) {
      setFormData({ ...item, image: null });
      setImagePreview(item.image);
    }
    setDialogType(type);
    setIsDialogOpen((prev) => !prev);
  };
  const handleDeleteSkill = async (id: string) => {
    try {
      await deleteSkill(id);
    } catch (error: unknown) {
      errorMessage(error);
    }
  };
  const handleDeleteAllSkills = async () => {
    try {
      await deleteAllSkills();
    } catch (error: unknown) {
      errorMessage(error);
    }
  };
  if (isLoading) return <SkillsEditSkeleton count={6} />;
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1>Skills</h1>
        <div className="flex gap-3">
          <button className="w-4/5" onClick={() => handleClickDialog('add')}>
            Add Skill
          </button>
          <SkillDialog
            setFormData={setFormData}
            formData={formData}
            setIsDialogOpen={setIsDialogOpen}
            isDialogOpen={isDialogOpen}
            dialogType={dialogType}
            currentPhoto={imagePreview}
            setCurrentPhoto={setImagePreview}
          />
          <button className="w-1/5 delete" disabled={isDeletingAll} onClick={handleDeleteAllSkills}>
            {!isDeletingAll ? 'Delete All' : 'Loading...'}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {data?.skills.map((item) => {
          return (
            <div key={item._id} className="flex flex-row p-3 items-center justify-start gap-4 relative">
              <img src={item.image} className={`skill-avatar ${item.colorInvert ? 'dark:invert' : ''}`} />
              <p>{item.name}</p>
              <div className="flex flex-col justify-between absolute top-0 right-0 h-full py-2">
                <MdModeEdit
                  className="text-blue-500 cursor-pointer"
                  size={24}
                  onClick={() => handleClickDialog('edit', item)}
                />
                {!isDeleting ? (
                  <MdDelete
                    className="text-red-500 cursor-pointer"
                    size={24}
                    onClick={() => handleDeleteSkill(item._id)}
                  />
                ) : (
                  <AiOutlineLoading3Quarters size={24} className="text-red-500 animate-spin" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsEdit;
