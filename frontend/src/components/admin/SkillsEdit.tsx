import { useState } from "react";
import { useDeleteSkill, useGetSkills } from "../../hooks/SkillHooks";
import { dialogType, ISkillFormData, uploads } from "../../lib/types/types";
import { MdDelete, MdModeEdit } from "react-icons/md";
import SkillDialog from "./SkillDialog";
import SkillsEditSkeleton from "../skeletons/SkillsEditSkeleton";

const SkillsEdit = () => {
  const { data, isLoading } = useGetSkills();
  const { mutateAsync: deleteSkill } = useDeleteSkill();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<dialogType>("add");
  const [formData, setFormData] = useState<ISkillFormData>({ _id: "", name: "", img: "", colorInvert: false });

  const handleClickDialog = (type: dialogType, item?: ISkillFormData) => {
    if (type === "add") setFormData({ _id: "", name: "", img: "", colorInvert: false });
    else if (type === "edit" && item) setFormData(item);
    setDialogType(type);
    setIsDialogOpen((prev) => !prev);
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
    <div>
      <div className="flex justify-between">
        <h1>Skills</h1>
        <button
          onClick={() => {
            handleClickDialog("add");
          }}
          className="w-1/5"
        >
          Add Skill
        </button>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {isLoading && <SkillsEditSkeleton count={8}/>}
        {!isLoading &&
          data?.skills?.map((item: ISkillFormData, index: number) => {
            return (
              <div key={index} className="flex flex-row p-3 items-center justify-start gap-4 relative">
                <img
                  src={`${uploads}/${item.img}`}
                  alt={`photo`}
                  className={`skill ${item.colorInvert ? "dark:invert" : ""}`}
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
          <SkillDialog
            setFormData={setFormData}
            formData={formData}
            setIsDialogOpen={setIsDialogOpen}
            dialogType={dialogType}
          />
        )}
      </div>
    </div>
  );
};

export default SkillsEdit;
