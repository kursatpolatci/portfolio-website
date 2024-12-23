import ImageSkeleton from './ImageSkeleton';

const ProjectEditSkeleton = () => {
  return (
    <div className="flex max-md:flex-col rounded-mds-center gap-12 max-md:gap-3">
      <div className="flex max-md:flex-col w-1/3 max-md:w-full gap-2">
        <ImageSkeleton avatar="project-avatar" />
        <div className="flex flex-col max-md:flex-row items-center justify-center gap-2">
          <div className="w-6 aspect-square max-md:h-7 bg-[#eeeeee] dark:bg-dark-fifth rounded-md" />
          <div className="w-6 aspect-square max-md:h-7 bg-[#eeeeee] dark:bg-dark-fifth rounded-md" />
        </div>
      </div>
      <div className="flex flex-col w-2/3 max-md:w-full gap-1 max-md:gap-2">
        <div className="h-6 max-md:h-7 bg-[#eeeeee] dark:bg-dark-fifth rounded-md" />
        <div className="h-6 max-md:h-7 bg-[#eeeeee] dark:bg-dark-fifth rounded-md" />
        <div className="h-6 max-md:h-7 bg-[#eeeeee] dark:bg-dark-fifth rounded-md" />
        <div className="flex flex-row gap-1">
          <div className="h-6 max-md:h-7 w-1/5 bg-[#eeeeee] dark:bg-dark-fifth rounded-md" />
          <div className="h-6 max-md:h-7 w-1/5 bg-[#eeeeee] dark:bg-dark-fifth rounded-md" />
          <div className="h-6 max-md:h-7 w-1/5 bg-[#eeeeee] dark:bg-dark-fifth rounded-md" />
          <div className="h-6 max-md:h-7 w-1/5 bg-[#eeeeee] dark:bg-dark-fifth rounded-md" />
          <div className="h-6 max-md:h-7 w-1/5 bg-[#eeeeee] dark:bg-dark-fifth rounded-md" />
        </div>
      </div>
    </div>
  );
};

const ProjectsEditSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col gap-4">
        <div className="h-8 max-md:h-7 bg-[#eeeeee] dark:bg-dark-fifth rounded-md w-40" />
        <div className="flex gap-3">
          <div className="h-10 max-md:h-7 bg-[#eeeeee] dark:bg-dark-fifth rounded-md w-4/5" />
          <div className="h-10 max-md:h-7 bg-[#eeeeee] dark:bg-dark-fifth rounded-md w-1/5" />
        </div>
      </div>
      <div className="flex flex-col gap-6 p-4">
        <div>
          <div className="h-8 max-md:h-7 bg-[#eeeeee] dark:bg-dark-fifth rounded-md w-40" />
          <div className="flex flex-col gap-6 p-4 max-md:gap-16">
            {Array.from({ length: count }).map((_, index) => {
              return <ProjectEditSkeleton key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsEditSkeleton;
