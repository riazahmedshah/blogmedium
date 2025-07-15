import { useCurrentUser } from "@modules/auth/hooks/useCurrentUser";
import { Clock, User2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface BlogCardProps {
  image: string;
  title: string;
  category: string;
  authorName?: string;
  authorImage?: string;
  createdAt: Date | string;
}

export const BlogCard = ({ 
  category, 
  image, 
  title, 
  authorName = "Anonymous",
  authorImage,
  createdAt 
}: BlogCardProps) => {
  const user = useCurrentUser();
  
  return (
    <article className="max-w-4xl mx-auto group overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 py-4 px-2">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative h-48 sm:h-auto sm:w-1/3 min-w-[200px] overflow-hidden">
          <img
            src={image || '/default-blog-image.jpg'}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/default-blog-image.jpg';
            }}
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4 sm:p-6">
          {/* Category */}
          <div className="mb-2">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 uppercase rounded-full bg-blue-50">
              {category}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-2">
            {title}
          </h3>
          
          {/* Author and Date */}
          <div className="flex items-center mt-4">
            <div className="flex-shrink-0 mr-3">
              {authorImage ? (
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={authorImage}
                  alt={authorName}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User2 className="w-4 h-4 text-gray-500" />
                </div>
              )}
            </div>
            
            <div className="w-full text-sm text-gray-500 flex justify-between">
              <p className="font-medium text-gray-900">{authorName}</p>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                <span>
                  {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
          
          {/* Optional: Read time or other metadata */}
          {user && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Continue reading →
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};