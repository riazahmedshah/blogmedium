import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { FullBlogSkeleton } from './skeletons/full-blog-skeleton';
import { ErrorComponent } from './error-component';

interface FullBlogSectionProps {
  title: string;
  content: string;
  postImage: string | null;
  isLoading: boolean;
  isError: boolean;
}

export const FullBlogSection: React.FC<FullBlogSectionProps> = ({
  title,
  content,
  postImage,
  isLoading,
  isError,
}) => {
  if (isLoading) {
    return (
      <FullBlogSkeleton/>
    );
  }

  if (isError) {
    return (
      <ErrorComponent/>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card className="w-full overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800">
        {postImage && (
          <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
            <img
              src={postImage}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/800x400/cccccc/333333?text=Image+Not+Found`;
              }}
            />
          </div>
        )}
        <CardHeader className="p-6 sm:p-8">
          <CardTitle className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0 sm:p-8 sm:pt-0 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
