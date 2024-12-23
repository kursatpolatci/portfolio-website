import ImageSkeleton from './ImageSkeleton';

const SkillEditSkeleton = () => {
  return (
    <div className="flex flex-row p-3 rounded-md items-center justify-start gap-4 relative">
      <ImageSkeleton avatar="skill-edit-avatar" />
      <div className="h-6 max-md:h-5 w-28 rounded-md bg-[#eeeeee] dark:bg-dark-fifth" />
      <div className="flex flex-col justify-between absolute top-0 right-0 h-full py-2">
        <div className="h-6 w-6 rounded-md bg-[#eeeeee] dark:bg-dark-fifth" />
        <div className="h-6 w-6 rounded-md bg-[#eeeeee] dark:bg-dark-fifth" />
      </div>
    </div>
  );
};
const SkillsEditSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col gap-4">
        <div className="h-8 max-md:h-7 bg-[#eeeeee] dark:bg-dark-fifth rounded-md w-40" />
        <div className="flex gap-3">
          <div className="h-10 max-md:h-7 bg-[#eeeeee] dark:bg-dark-fifth rounded-md w-4/5" />
          <div className="h-10 max-md:h-7 bg-[#eeeeee] dark:bg-dark-fifth rounded-md w-1/5" />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {Array.from({ length: count }).map((_, index) => {
          return <SkillEditSkeleton key={index} />;
        })}
      </div>
    </div>
  );
};

export default SkillsEditSkeleton;
