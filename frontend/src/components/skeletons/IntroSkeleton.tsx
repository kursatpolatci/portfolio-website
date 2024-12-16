import ImageSkeleton from "./ImageSkeleton";

const IntroSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="avatar flex items-center justify-center bg-[#eeeeee] dark:bg-dark-fifth rounded-full">
        <ImageSkeleton />
      </div>
      <div className="flex flex-col gap-5 pt-5">
        <div className="h-[2rem] rounded-md bg-[#eeeeee] dark:bg-dark-fifth w-2/4"></div>
        <div className="h-[4.5rem] rounded-md bg-[#eeeeee] dark:bg-dark-fifth w-full"></div>
        <div className="h-[1.5rem] rounded-md bg-[#eeeeee] dark:bg-dark-fifth w-1/4"></div>
        <div className="h-[21px] rounded-md bg-[#eeeeee] dark:bg-dark-fifth w-1/5"></div>
      </div>
      <div className="w-full"></div>
    </div>
  );
};

export default IntroSkeleton;
