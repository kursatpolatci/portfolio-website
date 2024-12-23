import ImageSkeleton from './ImageSkeleton';

const ProjectSkeleton = () => {
  return (
    <div className="flex flex-col cursor-pointer dark:hover:bg-[#18181a] hover:bg-[#fafafa] rounded-lg overflow-hidden transition-colors duration-300">
      <ImageSkeleton avatar="project-avatar" />
      <div className="flex flex-col gap-1 p-4">
        <div className="bg-[#eeeeee] dark:bg-dark-fifth rounded-md h-[28px] w-2/5" />
        <div className="bg-[#eeeeee] dark:bg-dark-fifth rounded-md h-[72px] w-full" />
        <div className="bg-[#eeeeee] dark:bg-dark-fifth rounded-md h-[24px] w-5/5" />
        <div className="flex gap-1">
          <div className="bg-[#eeeeee] dark:bg-dark-fifth rounded-md h-[28px] w-10" />
          <div className="bg-[#eeeeee] dark:bg-dark-fifth rounded-md h-[28px] w-10" />
        </div>
      </div>
    </div>
  );
};

const ProjectsSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="animate-pulse flex flex-col gap-3">
      <div>
        <div className="bg-[#eeeeee] dark:bg-dark-fifth rounded-md h-[2rem] w-52" />
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-12 max-md:gap-8 p-4">
          {Array.from({ length: count }).map((_, index) => {
            return <ProjectSkeleton key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSkeleton;
