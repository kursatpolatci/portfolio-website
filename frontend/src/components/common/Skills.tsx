import { useGetSkills } from '../../hooks/SkillHooks';
import { ISkill } from '../../lib/types/response';
import { SkillsSkeleton } from '../skeletons';

const SkillCard = ({ skill }: { skill: ISkill }) => {
  return (
    <div key={skill._id} className="flex flex-col gap-2 items-center justify-center">
      <img src={skill.image} className={`skill-avatar ${skill.colorInvert ? 'dark:invert' : ''}`} alt={skill._id} />
      <p className="text-center">{skill.name}</p>
    </div>
  );
};

const Skills = () => {
  const { data, isLoading } = useGetSkills();

  if (isLoading) return <SkillsSkeleton count={15} />;
  return (
    <div>
      <h1>Skills</h1>
      <div className="grid grid-cols-5 max-md:grid-cols-4 gap-12 px-4 py-6">
        {data?.skills.map((item) => {
          return <SkillCard skill={item} />;
        })}
      </div>
    </div>
  );
};

export default Skills;
