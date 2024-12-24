import ImageSkeleton from './ImageSkeleton';

const IntroSkeleton = () => {
  return (
    <div className="animate-pulse">
      <ImageSkeleton avatar="intro-avatar" />
      <div className="flex flex-col gap-3 pt-6">
        <div className="bg-[#eeeeee] dark:bg-dark-fifth rounded-md h-[2rem] max-md:h-[28px] w-2/4" />
        <div className="bg-[#eeeeee] dark:bg-dark-fifth rounded-md h-[4.5rem] max-md:h-[100px] w-full" />
        <div className="bg-[#eeeeee] dark:bg-dark-fifth rounded-md h-[1.5rem] max-md:h-[16px] w-1/4" />
        <div className="bg-[#eeeeee] dark:bg-dark-fifth rounded-md h-[24px] w-1/5" />
      </div>
    </div>
  );
};

export default IntroSkeleton;
