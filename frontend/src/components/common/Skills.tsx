import { useGetSkills } from "../../hooks/SkillHooks";
import { BACKEND_URL, ISkillFormData } from "../../lib/types/types";

const Skills = () => {
  const { data } = useGetSkills();
  return (
    <div className="max-md:px-6">
      <h1>Skills</h1>
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-xxs:grid-cols-1 gap-y-4 p-4">
        {data?.skills.map((item: ISkillFormData, index: number) => {
          return (
            <div key={index} className="flex flex-row p-3 items-center justify-start gap-4 max-md:gap-7">
              <div>
                <img
                  src={`${BACKEND_URL}/uploads/${item.img}`}
                  alt={`photo`}
                  className={`w-11 max-md:w-10 object-cover ${item.colorInvert ? "dark:invert" : ""}`}
                />
              </div>
              <div>
                <p>{item.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
