
import { Skeleton } from "./ui/skeleton"

const BlogSkeleton = () => {
    return(
        <div className="max-w-4xl mx-auto px-4 my-14  space-y-6">
            <div className="flex items-center justify-center pb-4">
                <Skeleton className="h-10 w-[400px] rounded-md" />
                <Skeleton className="h-10 w-[100px] rounded-md" />
            </div>
            <p className="text-center py-2">Recent blogs...</p>
            <div className="flex items-center space-x-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                <Skeleton className="h-5 w-[500px] rounded-lg" />
                <Skeleton className="h-5 w-[350px] rounded-lg" />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                <Skeleton className="h-5 w-[500px] rounded-lg" />
                <Skeleton className="h-5 w-[350px] rounded-lg" />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                <Skeleton className="h-5 w-[500px] rounded-lg" />
                <Skeleton className="h-5 w-[350px] rounded-lg" />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                <Skeleton className="h-5 w-[500px] rounded-lg" />
                <Skeleton className="h-5 w-[350px] rounded-lg" />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                <Skeleton className="h-5 w-[500px] rounded-lg" />
                <Skeleton className="h-5 w-[350px] rounded-lg" />
                </div>
            </div>
        
        
      </div>
    )
}
  
export default BlogSkeleton;