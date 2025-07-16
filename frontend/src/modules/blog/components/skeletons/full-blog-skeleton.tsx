import { Card, CardContent, CardHeader } from "@ui/card";
import { Skeleton } from "@ui/skeleton";

export const FullBlogSkeleton = () => {
  return(
    <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="w-full rounded-lg shadow-lg">
          <CardHeader className="p-6">
            <Skeleton className="h-8 w-3/4 mb-2 bg-gray-200 rounded" />
            <Skeleton className="h-4 w-1/2 bg-gray-200 rounded" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <Skeleton className="w-full h-64 sm:h-80 md:h-96 mb-4 bg-gray-200 rounded-lg" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-200 rounded" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-200 rounded" />
            <Skeleton className="h-4 w-5/6 bg-gray-200 rounded" />
          </CardContent>
        </Card>
      </div>
  )
};
