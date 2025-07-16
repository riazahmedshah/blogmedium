interface FullBlogSectionProps {
  title?: string; // Made optional
  content?: string; // Made optional
  postImage?: string | null; // Made optional and matches your data
}

export const FullBlogSection: React.FC<FullBlogSectionProps> = ({
  title = "Untitled Post", // Default value
  content = "<p>No content available</p>", // Default value
  postImage = null, // Default value
}) => {
  // Safe HTML content rendering
  const createMarkup = () => {
    try {
      return { __html: content };
    } catch (e) {
      return { __html: "<p>Error loading content</p>" };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="w-full overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800">
        {postImage && (
          <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
            <img
              src={postImage}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/800x400/cccccc/333333?text=${encodeURIComponent(title)}`;
              }}
            />
          </div>
        )}
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2">
            {title}
          </h1>
        </div>
        <div className="p-6 pt-0 sm:p-8 sm:pt-0 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={createMarkup()} />
          </div>
        </div>
      </div>
    </div>
  );
};