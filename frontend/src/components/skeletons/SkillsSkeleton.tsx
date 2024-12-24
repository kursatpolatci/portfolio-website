import ImageSkeleton from './ImageSkeleton';

const SkillSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <ImageSkeleton avatar="skill-avatar" />
      <div className="bg-[#eeeeee] dark:bg-dark-fifth rounded-md h-[1rem] w-2/3" />
    </div>
  );
};

const SkillsSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="animate-pulse">
      <div className="bg-[#eeeeee] dark:bg-dark-fifth rounded-md h-[2rem] w-32" />
      <div className="grid grid-cols-5 max-md:grid-cols-4 gap-12 px-4 py-6">
        {Array.from({ length: count }).map((_, index) => {
          return <SkillSkeleton key={index} />;
        })}
      </div>
    </div>
  );
};

export default SkillsSkeleton;
