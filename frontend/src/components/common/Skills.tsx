import { useGetSkills } from "../../hooks/SkillHooks";
import { BACKEND_URL, ISkill } from "../../utils/types";

const Skills = () => {
  const { data } = useGetSkills();

  const skills = data?.skills;
  return (
    <div className="py-12">
      <h1 className="text-light-secondary dark:text-dark-secondary text-2xl mb-6">Skills</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
        {skills?.map((item: ISkill, index: number) => {
          return (
            <div key={index} className="border-dark-fifth flex flex-row p-3 items-center justify-start gap-4">
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
