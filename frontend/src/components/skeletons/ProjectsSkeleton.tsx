import ImageSkeleton from "./ImageSkeleton";

const ProjectsSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="animate-pulse">
      <div className="h-[2rem] rounded-md bg-[#eeeeee] dark:bg-dark-fifth w-52" />
      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-12 max-md:gap-8 p-4">
        {Array.from({ length: count }).map((_, index) => {
          return (
            <div className="flex flex-col dark:bg-[#18181a] bg-[#fafafa] rounded-lg overflow-hidden" key={index}>
              <div className="w-full aspect-video flex items-center justify-center bg-[#eeeeee] dark:bg-dark-fifth">
                <ImageSkeleton />
              </div>
              <div className="flex flex-col gap-1 p-4">
                <div className="h-[28px] rounded-md bg-[#eeeeee] dark:bg-dark-fifth w-1/5" />
                <div className="h-[72px] rounded-md bg-[#eeeeee] dark:bg-dark-fifth w-full" />
                <div className="h-[20.78px] rounded-md bg-[#eeeeee] dark:bg-dark-fifth w-5/5" />
                <div className="flex gap-3">
                  <div className="h-[28px] rounded-md bg-[#eeeeee] dark:bg-dark-fifth w-10" />
                  <div className="h-[28px] rounded-md bg-[#eeeeee] dark:bg-dark-fifth w-10" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ProjectsSkeleton;
