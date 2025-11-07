import { Skeleton } from "@/components/ui/skeleton"

export function HomeSkeleton() {
    return (
        <div className='space-y-4'>
            {[...Array(1)].map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-8 rounded-2xl shadow-lg"
                >
                    {/* Left: Headline */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-4">
                            <Skeleton className="h-12 md:h-16 w-48 md:w-72" />
                            <Skeleton className="h-10 w-32 rounded-full" />
                        </div>
                    </div>
                    {/* Right: Description */}
                    <div className="flex-1 mt-8 md:mt-0">
                        <Skeleton className="h-24 w-full" />
                        <div className="flex gap-2 mt-4">
                            <Skeleton className="h-10 w-10 rounded-md" />
                            <Skeleton className="h-10 w-10 rounded-md" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
} 