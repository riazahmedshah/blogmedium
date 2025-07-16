import React from 'react';

interface RecommendSectionProps {
  title: string;
  image: string | null;
}

export const RecommendSection: React.FC<RecommendSectionProps> = ({
  title,
  image,
}) => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="w-full overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800 p-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Recommended Reading
        </h3>
        {image && (
          <div className="relative w-full h-40 overflow-hidden rounded-md mb-3">
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover rounded-md"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/400x200/cccccc/333333?text=Image+Not+Found`;
              }}
            />
          </div>
        )}
        {!image && (
          <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-md mb-3">
            <span className="text-gray-500 dark:text-gray-400">No Image Available</span>
          </div>
        )}
        <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
          {title}
        </p>
      </div>
    </div>
  );
};
