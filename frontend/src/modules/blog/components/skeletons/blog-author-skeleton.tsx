import { Card } from "@ui/card"
import { Skeleton } from "@ui/skeleton"

export const AuthorBlogSkeleton = () => {
  return(
    <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Card className="flex items-center space-x-4 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
          <Skeleton className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
            <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </Card>
      </div>
  )
}