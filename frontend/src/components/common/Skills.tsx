import { useGetSkills } from "../../hooks/SkillHooks";
import { ISkillFormData, uploads } from "../../lib/types/types";
import SkillsSkeleton from "../skeletons/SkillsSkeleton";

const Skills = () => {
  const { data, isLoading } = useGetSkills();

  return (
    <div>
      <h1>Skills</h1>
      <div className="grid grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 gap-12 py-4">
        {isLoading && <SkillsSkeleton count={10} />}
        {!isLoading && data?.skills?.map((item: ISkillFormData, index: number) => {
          return (
            <div key={index} className="flex flex-col gap-2 items-center justify-center">
              <img
                src={`${uploads}/${item.img}`}
                alt={`skill`}
                className={`skill ${item.colorInvert ? "dark:invert" : ""}`}
              />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
