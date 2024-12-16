import ImageSkeleton from "./ImageSkeleton";

const SkillsEditSkeleton = ({ count }: { count: number }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => {
                return (
                    <div key={index} className="flex flex-row p-3 items-center justify-start gap-4 relative animate-pulse">
                        <div className="skill bg-[#eeeeee] dark:bg-dark-fifth flex items-center justify-center">
                            <ImageSkeleton />
                        </div>
                        <div className="h-6 max-md:h-5 w-28 rounded-md bg-[#eeeeee] dark:bg-dark-fifth" />
                        <div className="flex flex-col justify-between absolute top-0 right-0 h-full py-2">
                            <div className="h-6 w-6 rounded-md bg-[#eeeeee] dark:bg-dark-fifth" />
                            <div className="h-6 w-6 rounded-md bg-[#eeeeee] dark:bg-dark-fifth" />
                        </div>
                    </div>
                )
            })}
        </>
    );
};

export default SkillsEditSkeleton;
