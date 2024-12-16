import ImageSkeleton from "./ImageSkeleton";

const SkillsSkeleton = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        return (
          <div className="flex flex-col gap-2 items-center justify-center animate-pulse" key={index}>
            <div className="skill bg-[#eeeeee] dark:bg-dark-fifth flex items-center justify-center">
              <ImageSkeleton />
            </div>
            <div className="h-[1rem] rounded-md bg-[#eeeeee] dark:bg-dark-fifth w-1/3" />
          </div>
        );
      })}
    </>
  );
};

export default SkillsSkeleton;
