import { useGetSkills } from "../../hooks/SkillHooks";
import { BACKEND_URL, ISkill } from "../../utils/types";
import { MdDelete, MdModeEdit } from "react-icons/md";

const SkillsEdit = () => {
  const { data } = useGetSkills();
  return (
    <div className="py-12">
      <div className="flex justify-between">
        <h1 className="dark:text-dark-secondary text-2xl">Skills</h1>
        <button className="dark:bg-dark-tertiary bg-gray-300 px-3  rounded-sm">Add Skill</button>
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
                <MdModeEdit className="text-blue-500 cursor-pointer" size={24} />
                <MdDelete className="text-red-500 cursor-pointer" size={24} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsEdit;
