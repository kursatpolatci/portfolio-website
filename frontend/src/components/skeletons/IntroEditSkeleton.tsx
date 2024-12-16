import ImageSkeleton from "./ImageSkeleton"

const IntroEditSkeleton = () => {
    return (
        <div className="animate-pulse flex flex-col gap-4">
            <div className="avatar bg-[#eeeeee] dark:bg-dark-fifth flex items-center justify-center rounded-full">
                <ImageSkeleton />
            </div>
            <div className="w-full h-10 max-md:h-8 bg-[#eeeeee] dark:bg-dark-fifth rounded-sm" />
            <div className="w-full h-12 max-md:h-10 bg-[#eeeeee] dark:bg-dark-fifth rounded-sm" />
            <div className="w-full h-[72px] max-md:h-16 bg-[#eeeeee] dark:bg-dark-fifth rounded-sm" />
            <div className="flex gap-5">
                <div className="w-5/6 h-10 max-md:h-8 bg-[#eeeeee] dark:bg-dark-fifth rounded-sm" />
                <div className="w-1/6 h-10 max-md:h-8 bg-[#eeeeee] dark:bg-dark-fifth rounded-sm" />
            </div>
            <div className="w-full h-10 max-md:h-8 bg-[#eeeeee] dark:bg-dark-fifth rounded-sm" />
        </div>
    )
}

export default IntroEditSkeleton